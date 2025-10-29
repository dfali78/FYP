import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const chatWithOpenAI = async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) return res.status(400).json({ error: 'No message provided.' });

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
        max_tokens: 100
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const reply = response.data.choices?.[0]?.message?.content || '';
    res.json({ reply });
  } catch (error) {
    console.error('OpenAI error:', error?.response?.data || error.message || error);
    res.status(500).json({ error: 'Failed to get response from OpenAI.' });
  }
};
