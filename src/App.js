import React from 'react';
import MainTable from './components/MainTable';
import Analytics from './components/Analytics';
import ChatApp from './components/ChatApp';

function App() {
  return (
    <div className="App">
      <h1>ML Engineer Salary Data</h1>
      <MainTable />
      <Analytics />
      <ChatApp />
    </div>
  );
}

export default App;
