
// src/App.jsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off('chat message');
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('chat message', input);
      setInput('');
    }
  };

  return (
    <div style={styles.container}>
      <h2>React Chat</h2>
      <ul style={styles.messages}>
        {messages.map((msg, idx) => (
          <li key={idx} style={styles.message}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage} style={styles.form}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type something..."
        />
        <button style={styles.button} type="submit">Send</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    fontFamily: 'Arial',
  },
  messages: {
    listStyle: 'none',
    padding: 0,
    height: '300px',
    overflowY: 'scroll',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  message: {
    padding: '8px',
    borderBottom: '1px solid #eee',
  },
  form: {
    display: 'flex',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
  }
};

export default App;
