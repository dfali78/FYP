import express from 'express';
import { chatWithHuggingFace } from '../controllers/chatbotController.js';

const router = express.Router();

router.post('/', chatWithHuggingFace);

export default router;
