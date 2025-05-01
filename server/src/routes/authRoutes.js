const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {validate} = require('../utils/validate');
const { registerSchema, mobileLoginSchema, webLoginSchema } = require('../validator/authValidator');
const loginLimiter = require('../utils/rateLimiter');

router.post('/register', validate(registerSchema), authController.register);

router.post('/web-login', loginLimiter,validate(webLoginSchema),authController.webLogin);
router.post('/mobile-login', loginLimiter,validate(mobileLoginSchema),authController.mobileLogin);

router.get('/get-college', authController.getColleges); // <-- added
router.get('/get-department/:collegeId', authController.getDepartments); // <-- added

module.exports = router;
