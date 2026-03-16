import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddIntern from './pages/AddIntern';
import EditIntern from './pages/EditIntern';
import './index.css';

export default function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddIntern />} />
            <Route path="/edit/:id" element={<EditIntern />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
