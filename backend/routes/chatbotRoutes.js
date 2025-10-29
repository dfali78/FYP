import express from 'express';
import { chatWithOpenAI } from '../controllers/chatbotController.js';

const router = express.Router();

router.post('/', chatWithOpenAI);

export default router;
