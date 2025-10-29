const express = require('express');
const router = express.Router();
const { chatWithOpenAI } = require('../controllers/chatbotController');

router.post('/', chatWithOpenAI);

module.exports = router;
