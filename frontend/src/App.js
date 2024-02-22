import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Profile from './pages/Account';
import Register from './pages/Register';
import QuoteHistory from './pages/QuoteHistory';
import FuelQuote from './pages/FuelQuote';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <Profile />
    //   </header>
    // </div>
     <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<QuoteHistory />} />
        <Route path="/quote" element={<FuelQuote />} />
      </Routes>
    </Router>
  );
}

export default App;
