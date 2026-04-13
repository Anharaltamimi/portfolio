import React from 'react';
import './index.css';
import Hero from './components/Hero';
import MainContent from './components/MainContent';

function App() {
  return (
    <div className="container">
      {/* قمنا بحذف سطر Debug من هنا */}
      <Hero />
      <MainContent />
      
      
    </div>
  );
}

export default App;