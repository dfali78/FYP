import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    // Optimistically add the user's message to UI and prepare history to send
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      // Send last N messages as history so the server can build context
      const res = await fetch(`${apiBase}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: newMessages, maxHistory: 6 })
      });
      const data = await res.json();
      // Append bot reply
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

  // Persist messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chat_history', JSON.stringify(messages));
    } catch (e) {
      // ignore storage errors
    }
  }, [messages]);

  // Load persisted messages on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('chat_history');
      if (saved) setMessages(JSON.parse(saved));
    } catch (e) {
      // ignore
    }
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <>
      {/* Floating icon when closed */}
      {!isOpen && (
        <button
          aria-label="Open chat"
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            right: 24,
            bottom: 24,
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20
          }}
        >
          💬
        </button>
      )}

      {isOpen && (
        <div style={{ border: '1px solid #ccc', borderRadius: 8, width: 350, padding: 12, position: 'fixed', bottom: 24, right: 24, background: '#fff', zIndex: 1000 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>AI Chatbot</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { setMessages([]); localStorage.removeItem('chat_history'); }} title="Clear chat" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>🧹</button>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>✖️</button>
            </div>
          </div>

          <div ref={listRef} style={{ height: 220, overflowY: 'auto', marginBottom: 8, background: '#f9f9f9', padding: 8, borderRadius: 4 }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '6px 0' }}>
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
      )}
    </>
  );
};

export default Chatbot;
