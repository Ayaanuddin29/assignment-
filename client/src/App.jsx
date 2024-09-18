import React from 'react';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import HealthDashboard from './component/HealthDashboard';
import AddHealthRecord from './component/AddHealthRecord';
import './App.css'; // Optional: Add some custom styling if needed
import { Header } from './component/Header';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
          <Route exact path="/" element={<HealthDashboard />}/>
          <Route path="/add-record" element={<AddHealthRecord/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;