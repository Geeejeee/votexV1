const express = require('express');
const router = express.Router();
const { makePosition, getPositions, delPosition } = require('../controllers/positionController.js'); 
const { verifyToken, requireAdmin } = require('../utils/authMiddleware');
const validate = require('../utils/validate');
const { positionSchema } = require('../validator/positionValidator');


router.post('/create-position', verifyToken, requireAdmin, validate(positionSchema), makePosition);
router.get('/get-position', verifyToken, requireAdmin, getPositions);
router.delete('/delete-position/:id', verifyToken, requireAdmin, delPosition);

module.exports = router;
