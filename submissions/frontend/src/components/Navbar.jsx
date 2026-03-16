import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <div className="navbar-logo">I</div>
        <div className="navbar-title">
          Intern<span>Flow</span>
        </div>
      </NavLink>
      <div className="navbar-nav">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          📋 Dashboard
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          ➕ Add Intern
        </NavLink>
      </div>
    </nav>
  );
}
