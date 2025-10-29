import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiBase}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { sender: 'bot', text: 'Error: Could not get response.' }]);
    }
    setInput('');
    setLoading(false);
  };

  const listRef = useRef(null);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, width: 350, padding: 16, position: 'fixed', bottom: 24, right: 24, background: '#fff', zIndex: 1000 }}>
      <h3>AI Chatbot</h3>
      <div ref={listRef} style={{ height: 200, overflowY: 'auto', marginBottom: 8, background: '#f9f9f9', padding: 8, borderRadius: 4 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '4px 0' }}>
            <span style={{ background: msg.sender === 'user' ? '#d1e7dd' : '#e2e3e5', padding: '6px 12px', borderRadius: 12, display: 'inline-block' }}>{msg.text}</span>
          </div>
        ))}
        {loading && <div style={{ textAlign: 'left' }}><span>Bot is typing...</span></div>}
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()} style={{ padding: '8px 16px', borderRadius: 4, background: '#007bff', color: '#fff', border: 'none' }}>Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
