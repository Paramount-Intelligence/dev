import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import InternForm from './components/InternForm';
import './App.css';

function App() {
  const [view, setView] = useState('dashboard');
  const [editingIntern, setEditingIntern] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (intern) => {
    setEditingIntern(intern);
    setView('form');
  };

  const handleAdd = () => {
    setEditingIntern(null);
    setView('form');
  };

  const handleSave = () => {
    setView('dashboard');
    setEditingIntern(null);
    setRefreshKey((k) => k + 1);
  };

  const handleCancel = () => {
    setView('dashboard');
    setEditingIntern(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <span className="header-logo">🎯</span>
          <h1>Intern Tracker</h1>
        </div>
        {view === 'dashboard' && (
          <button className="btn btn-primary" onClick={handleAdd}>
            + Add Intern
          </button>
        )}
      </header>
      <main className="app-main">
        {view === 'dashboard' ? (
          <Dashboard
            key={refreshKey}
            onEdit={handleEdit}
            onRefresh={() => setRefreshKey((k) => k + 1)}
          />
        ) : (
          <InternForm
            intern={editingIntern}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </main>
    </div>
  );
}

export default App;