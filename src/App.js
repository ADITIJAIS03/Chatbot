import React, { useState } from 'react'; 
import MainTable from './components/MainTable';
import Analytics from './components/Analytics';
import ChatApp from './components/ChatApp';

function App() {
  const [selectedYear, setSelectedYear] = useState(null);

  // Function to handle row click and set the selected year for analytics
  const handleRowClick = (year) => {
    setSelectedYear(year);
  };

  // Function to redirect to chatbot URL
  const redirectToChatbot = () => {
    window.location.href = "https://tough-symbols-speak.loca.lt/";
  };

  return (
    <div className="App">
      <h1>ML Engineer Salary Data</h1>

      {/* Table component for showing ML engineer salary data */}
      <MainTable onRowClick={handleRowClick} />

      {/* Analytics component that shows a graph based on the selected year */}
      <Analytics selectedYear={selectedYear} />

      {/* Chatbot integration */}
      <h2>Chatbot</h2>
      <ChatApp />

      {/* Button to redirect to chatbot URL */}
      <button onClick={redirectToChatbot} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
        Go to Full Chatbot
      </button>
    </div>
  );
}

export default App;
