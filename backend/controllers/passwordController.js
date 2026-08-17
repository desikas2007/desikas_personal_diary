const Password = require('../models/Password');
const { encrypt, decrypt } = require('../middleware/encryption');

exports.createPassword = async (req, res) => {
  try {
    const { website, url, username, password, category, notes } = req.body;

    const encryptedPassword = encrypt(password);

    const passwordEntry = new Password({
      userId: req.userId,
      website,
      url,
      username,
      encryptedPassword,
      category,
      notes,
      passwordHistory: [{ password: encryptedPassword, date: new Date() }]
    });

    await passwordEntry.save();
    res.status(201).json({ message: 'Password saved', password: passwordEntry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.userId }).sort({ updatedAt: -1 });

    const decrypted = passwords.map(p => ({
      ...p.toObject(),
      password: decrypt(p.encryptedPassword),
      passwordHistory: p.passwordHistory.map(h => ({
        ...h,
        password: decrypt(h.password)
      }))
    }));

    res.json(decrypted);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPassword = async (req, res) => {
  try {
    const password = await Password.findOne({ _id: req.params.id, userId: req.userId });
    if (!password) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({
      ...password.toObject(),
      password: decrypt(password.encryptedPassword),
      passwordHistory: password.passwordHistory.map(h => ({
        ...h,
        password: decrypt(h.password)
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { website, url, username, password, category, notes } = req.body;

    const existing = await Password.findOne({ _id: req.params.id, userId: req.userId });
    if (!existing) {
      return res.status(404).json({ message: 'Not found' });
    }

    const updates = { website, url, username, category, notes, lastUpdated: new Date() };

    if (password && password !== decrypt(existing.encryptedPassword)) {
      updates.encryptedPassword = encrypt(password);
      existing.passwordHistory.push({ password: existing.encryptedPassword, date: new Date() });
      updates.passwordHistory = existing.passwordHistory;
    }

    const updated = await Password.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deletePassword = async (req, res) => {
  try {
    const password = await Password.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!password) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
