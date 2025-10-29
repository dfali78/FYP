// Vercel Serverless Function to proxy chatbot requests to OpenAI
// Place this file under frontend/api/chatbot.js and deploy to Vercel.
// Make sure to set OPENAI_API_KEY in the Vercel project environment variables.

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
    const { message, history, maxHistory = 6 } = req.body || {};

    if (!message && (!Array.isArray(history) || history.length === 0)) {
      return res.status(400).json({ error: 'No message provided' });
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      console.error('OPENAI_API_KEY not configured in environment');
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Prepare messages: include a system prompt, then a slice of the conversation history, then the user's current message
    const systemMsg = { role: 'system', content: 'You are a helpful assistant.' };
    const historyMessages = Array.isArray(history)
      ? history.slice(-maxHistory).map((m) => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }))
      : [];

    const messages = [systemMsg, ...historyMessages, { role: 'user', content: message }];

    console.log('Chatbot request received', { messagePreview: String(message).slice(0, 120), historyLength: historyMessages.length });

    const payload = {
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 250
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenAI returned error:', response.status, errText);
      return res.status(502).json({ error: 'OpenAI API error', details: errText });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';
    console.log('Chatbot reply length', reply.length);
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chatbot function error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
