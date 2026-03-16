import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import InternList from './components/InternList';
import InternForm from './components/InternForm';
import { Plus } from 'lucide-react';

function App() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <header>
        <div>
          <h1>InternHub</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }}>Manage your intern workflow natively</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/add')}>
          <Plus size={18} /> Add Intern
        </button>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<InternList />} />
          <Route path="/add" element={<InternForm />} />
          <Route path="/edit/:id" element={<InternForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
