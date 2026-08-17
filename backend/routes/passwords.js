const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/', passwordController.createPassword);
router.get('/', passwordController.getPasswords);
router.get('/:id', passwordController.getPassword);
router.put('/:id', passwordController.updatePassword);
router.delete('/:id', passwordController.deletePassword);

module.exports = router;
