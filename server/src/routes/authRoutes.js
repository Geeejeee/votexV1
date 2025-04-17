const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {validate} = require('../utils/validate');
const { registerSchema, loginSchema } = require('../validator/authValidator');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema),authController.login);

module.exports = router;
