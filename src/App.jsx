import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MessageSquare, Activity, Map, Home, Menu } from 'lucide-react';
import { useState } from 'react';
import Welcome from './components/Welcome';
import Chatbot from './components/Chatbot';
import Dashboard from './components/Dashboard';
import AmbulanceMap from './components/AmbulanceMap';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (location.pathname === '/') return null;

  return (
    <nav style={{ background: 'var(--primary)', color: 'white', padding: '1rem', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Activity size={24} />
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Ruralcare Map AI</span>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', color: 'white' }}>
          <Menu size={24} />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4">
          <NavLink to="/chat" icon={<MessageSquare size={18} />} label="Symptom Chat" />
          <NavLink to="/tracking" icon={<Map size={18} />} label="Ambulance" />
          <NavLink to="/dashboard" icon={<Activity size={18} />} label="Dashboard" />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-2 mt-4 pb-2">
          <NavLink to="/chat" icon={<MessageSquare size={18} />} label="Symptom Chat" onClick={() => setIsMenuOpen(false)} />
          <NavLink to="/tracking" icon={<Map size={18} />} label="Ambulance" onClick={() => setIsMenuOpen(false)} />
          <NavLink to="/dashboard" icon={<Activity size={18} />} label="Dashboard" onClick={() => setIsMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-2"
    style={{
      color: 'white',
      textDecoration: 'none',
      padding: '0.5rem 1rem',
      borderRadius: 'var(--radius)',
      background: 'rgba(255,255,255,0.1)'
    }}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

function App() {
  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/chat" element={<Chatbot />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tracking" element={<AmbulanceMap />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
