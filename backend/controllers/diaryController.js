const Diary = require('../models/Diary');

exports.createDiary = async (req, res) => {
  try {
    const { date, title, mood, content } = req.body;

    const entry = new Diary({
      userId: req.userId,
      date,
      title,
      mood,
      content
    });

    await entry.save();
    res.status(201).json({ message: 'Diary entry created', entry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getDiary = async (req, res) => {
  try {
    const entries = await Diary.find({ userId: req.userId }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateDiary = async (req, res) => {
  try {
    const { date, title, mood, content } = req.body;

    const entry = await Diary.findOne({ _id: req.params.id, userId: req.userId });
    if (!entry) {
      return res.status(404).json({ message: 'Not found' });
    }

    const updated = await Diary.findByIdAndUpdate(
      req.params.id,
      { date, title, mood, content, updatedDate: new Date() },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteDiary = async (req, res) => {
  try {
    const entry = await Diary.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!entry) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
