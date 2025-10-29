import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const chatWithHuggingFace = async (req, res) => {
  const { message, history = [] } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided.' });

  try {
    // Build conversation history for DialoGPT
    const conversation = history
      .filter(msg => msg.sender === 'user' || msg.sender === 'bot')
      .map(msg => msg.text)
      .join(' ');

    const inputText = conversation ? `${conversation} ${message}` : message;

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      {
        inputs: inputText,
        parameters: {
          max_length: 100,
          do_sample: true,
          temperature: 0.7
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Hugging Face returns an array of generated texts
    const generatedText = response.data?.[0]?.generated_text || '';
    // Extract the bot's response by removing the input text
    const reply = generatedText.replace(inputText, '').trim() || 'Sorry, I couldn\'t generate a response.';

    res.json({ reply });
  } catch (error) {
    console.error('Hugging Face error:', error?.response?.data || error.message || error);
    res.status(500).json({ error: 'Failed to get response from Hugging Face.' });
  }
};
