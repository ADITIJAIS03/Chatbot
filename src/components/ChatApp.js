import React, { useState } from 'react';
import axios from 'axios';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Function to send a message
  const handleSendMessage = async () => {
    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    const response = await fetchChatResponse(input);
    const botMessage = { sender: 'bot', text: response };

    setMessages([...messages, userMessage, botMessage]);
    setInput(''); // Clear input after sending
  };

  // Function to fetch response from chatbot API
  const fetchChatResponse = async (input) => {
    const apiUrl = 'https://tough-symbols-speak.loca.lt/'; // Replace with your local API URL

    try {
      const response = await axios.post(apiUrl, { prompt: input }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Assuming the API returns the response in the 'message' field
      return response.data.message || 'No response from chatbot';
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      return 'Error: Could not fetch response from chatbot';
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
        placeholder="Ask something..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;
