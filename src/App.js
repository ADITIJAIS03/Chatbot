import React, { useState } from 'react';
import MainTable from './components/MainTable';
import Analytics from './components/Analytics';
import ChatApp from './components/ChatApp';

function App() {
  const [selectedYear, setSelectedYear] = useState(null);

  const handleRowClick = (year) => {
    setSelectedYear(year); // This updates the selected year when a row is clicked
  };

  return (
    <div className="App">
      <h1>ML Engineer Salary Data</h1>
      <MainTable onRowClick={handleRowClick} />
      <Analytics selectedYear={selectedYear} />
      <ChatApp />
    </div>
  );
}

export default App;
