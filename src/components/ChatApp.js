import React, { useState } from 'react';
import axios from 'axios';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    const response = await fetchLLMResponse(input);
    const botMessage = { sender: 'bot', text: response };

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  const fetchLLMResponse = async (input) => {
    const apiKey = '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';
    const apiUrl = 'https://chat.groq.com/?_gl=1*2vtjur*_gcl_au*MzAyODY4NDc0LjE3MjY4MTg5MjY.*_ga*MTYzMTAzNDE2NC4xNzI2ODE4OTI3*_ga_4TD0X2GEZG*MTcyNjgxODkyNi4xLjEuMTcyNjgxODkyNi42MC4wLjA.'; // Use Groq's actual API URL for chat

    try {
      const response = await axios.post(
        apiUrl,
        {
          prompt: input, // User input is sent as a prompt
          max_tokens: 1000,  // Limit the response length
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Assuming Groq's API returns the text response in the "message" field
      return response.data.message || 'No response from the model';
    } catch (error) {
      console.error('Error fetching LLM response:', error);
      return 'Error: Could not fetch LLM response';
    }
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something about the data..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;