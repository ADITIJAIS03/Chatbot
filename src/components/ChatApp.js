import React, { useState } from 'react';
import axios from 'axios';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Function to handle sending a message
  const handleSendMessage = async () => {
    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Fetch bot response from the custom chatbot URL
    const response = await fetchLLMResponse(input);
    const botMessage = { sender: 'bot', text: response };

    // Update the state with both user and bot messages
    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    setInput('');  // Clear the input field after sending the message
  };

  // Function to fetch LLM response from the custom chatbot API
  const fetchLLMResponse = async (input) => {
    const apiUrl = 'https://tough-symbols-speak.loca.lt/'; // Custom chatbot URL

    try {
      const response = await axios.post(
        apiUrl,
        {
          query: input,  // Send user input as the 'query' field
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Assuming the response contains an 'answer' field with the bot's response
      return response.data.answer || 'No response from the chatbot';
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      return 'Error: Could not fetch chatbot response';
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
