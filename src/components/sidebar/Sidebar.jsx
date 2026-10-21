import './Sidebar.scss';
import {
  LayoutDashboard, Users, Box, ShoppingCart, Truck,
  ChartNoAxesColumnIncreasing, Bell, HeartPulse, ScrollText,
  Settings, UserRound, LogOut, Sun, Moon, X,
} from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../coontext/darkModeContext.jsx';

const navItems = [
  { section: 'Main' },
  { label: 'Dashboard',     icon: LayoutDashboard,               to: '/' },
  { section: 'Lists' },
  { label: 'Users',         icon: Users,                          to: '/users' },
  { label: 'Products',      icon: Box,                            to: '/products' },
  { label: 'Orders',        icon: ShoppingCart,                   to: '/orders' },
  { label: 'Deliveries',    icon: Truck,                          to: '/deliveries' },
  { section: 'Useful' },
  { label: 'Stats',         icon: ChartNoAxesColumnIncreasing,    to: '/stats' },
  { label: 'Notifications', icon: Bell,                           to: '/notifications' },
  { section: 'Services' },
  { label: 'System Health', icon: HeartPulse,                     to: '/system-health' },
  { label: 'Logs',          icon: ScrollText,                     to: '/logs' },
  { label: 'Settings',      icon: Settings,                       to: '/settings' },
  { section: 'User' },
  { label: 'Profile',       icon: UserRound,                      to: '/profile' },
  { label: 'Logout',        icon: LogOut,                         to: '/logout' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { darkMode, dispatch } = useContext(DarkModeContext);

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="top">
          <Link to="/" className="logo-link" onClick={onClose}>
            <span className="logo">seya</span>
          </Link>
          <button className="close-btn" onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <hr />

        <div className="center">
          <ul>
            {navItems.map((item, i) => {
              if (item.section) {
                return <p className="title" key={i}>{item.section}</p>;
              }
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                  onClick={onClose}
                >
                  <li>
                    <Icon className="icon" size={18} />
                    <span>{item.label}</span>
                  </li>
                </NavLink>
              );
            })}
          </ul>
        </div>

        <div className="bottom">
          <button
            className="theme-btn"
            onClick={() => dispatch({ type: 'TOGGLE' })}
            aria-label="Toggle theme"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
