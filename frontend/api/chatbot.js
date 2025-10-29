// Vercel Serverless Function to proxy chatbot requests to Hugging Face (Free Alternative)
// Place this file under frontend/api/chatbot.js and deploy to Vercel.
// Make sure to set HUGGINGFACE_API_KEY in the Vercel project environment variables.

export default async function handler(req, res) {
  // Health-check for quick uptime verification
  if (req.method === 'GET') {
    console.log('Chatbot function health check');
    return res.status(200).json({ status: 'ok' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, history = [] } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: 'No message provided' });
    }

    const hfKey = process.env.HUGGINGFACE_API_KEY;
    if (!hfKey) {
      console.error('HUGGINGFACE_API_KEY not configured in environment');
      return res.status(500).json({ error: 'Hugging Face API key not configured' });
    }

    // Build conversation history for DialoGPT
    const conversation = history
      .filter(msg => msg.sender === 'user' || msg.sender === 'bot')
      .map(msg => msg.text)
      .join(' ');

    const inputText = conversation ? `${conversation} ${message}` : message;

    console.log('Chatbot request received', { messagePreview: String(message).slice(0, 120), historyLength: history.length });

    const payload = {
      inputs: inputText,
      parameters: {
        max_length: 100,
        do_sample: true,
        temperature: 0.7
      }
    };

    const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${hfKey}`
      },
      body: JSON.stringify({
        inputs: {
          past_user_inputs: history.filter(msg => msg.sender === 'user').map(msg => msg.text),
          generated_responses: history.filter(msg => msg.sender === 'bot').map(msg => msg.text),
          text: message
        },
        parameters: {
          max_length: 100,
          do_sample: true,
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Hugging Face returned error:', response.status, errText);
      return res.status(502).json({ error: 'Hugging Face API error', details: errText });
    }

    const data = await response.json();
    // Hugging Face returns an array of generated texts
    const generatedText = data?.[0]?.generated_text || '';
    // Extract the bot's response by removing the input text
    const reply = generatedText.replace(inputText, '').trim() || 'Sorry, I couldn\'t generate a response.';

    console.log('Chatbot reply length', reply.length);
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chatbot function error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
