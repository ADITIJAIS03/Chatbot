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
    </div>
  );
}

export default App;
