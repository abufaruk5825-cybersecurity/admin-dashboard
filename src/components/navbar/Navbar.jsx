import './Navbar.scss';
import { Search, Globe, Sun, Moon, Maximize2, Bell, MessageSquare, AlignJustify } from 'lucide-react';
import { useContext } from 'react';
import { DarkModeContext } from '../../coontext/darkModeContext.jsx';
import { getUnreadCount } from '../../data/store';

const Navbar = ({ onMenuOpen }) => {
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const unread = getUnreadCount();

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <button className="menu-btn" onClick={onMenuOpen} aria-label="Open menu">
            <AlignJustify size={20}/>
          </button>
          <div className="search">
            <input type="text" placeholder="Search…"/>
            <Search size={16} className="search-icon"/>
          </div>
        </div>

        <div className="items">
          <div className="item">
            <Globe size={20} className="icon"/>
            <span className="lang">EN</span>
          </div>

          <div className="item theme-toggle" onClick={() => dispatch({ type:'TOGGLE' })} title={darkMode?'Light mode':'Dark mode'}>
            {darkMode ? <Sun size={20} className="icon sun"/> : <Moon size={20} className="icon moon"/>}
          </div>

          <div className="item">
            <Maximize2 size={20} className="icon"/>
          </div>

          <div className="item">
            <Bell size={20} className="icon"/>
            {unread > 0 && <span className="counter">{unread}</span>}
          </div>

          <div className="item">
            <MessageSquare size={20} className="icon"/>
            <span className="counter">2</span>
          </div>

          <div className="item">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="Profile"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
