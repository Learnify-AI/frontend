import { X, Menu, LogOut, Settings, Plus } from 'lucide-react';
import ProfileButton from './ProfileButton';
import { useTheme } from './ThemeContext';
import automationImage from "../assets/automation.jpeg";
import './Sidebar.css';

const Sidebar = ({ isOpen, isMobileOpen, onClose, onMobileClose, toggleSidebar, children }) => {
  const { isDark } = useTheme();

  return (
    <div className="sidebar-container">
      {/* Mobile Overlay */}
      <aside
        className={`mobile-sidebar ${isMobileOpen ? 'sidebar-open' : 'sidebar-closed'} ${
          isDark ? 'sidebar-dark' : 'sidebar-light'
        }`}
      >
        {/* Header */}
        <div className="sidebar-header">
          <img src="" className={`logo ${isMobileOpen ? 'block-md' : 'hidden-md'}`} />
          {isMobileOpen && (
            <button 
              onClick={onMobileClose}
              className={`btn-close ${isDark ? 'btn-close-dark' : ''}`}
            >
              <X className="icon" />
            </button>
          )}
        </div>

        {/* Main Sidebar Content */}
        <div className={`sidebar-content ${isMobileOpen ? 'block-md' : 'hidden-md'}`}>
            <button className={`btn-new-chat ${isDark ? 'btn-new-chat-dark' : ''}`}>
          <div className="new-chat">
            <img src={automationImage} alt="Logo" className={`logo ${isMobileOpen ? 'block-md' : 'hidden-md'}`} />

            {isMobileOpen && <span>New Chat</span>}
          </div>
            <div className="icon-new-chat">
              <Plus className="icon" />
            </div>
          </button>

          <div className="recent-chats">
            {isOpen && <h3 className={`recent-chats-title ${isDark ? 'recent-chats-title-dark' : ''}`}>Recent Chats</h3>}
            <div className={`chat-items ${isDark ? 'chat-items-dark' : ''}`}>
              {/* Chat items would go here */}
              <ul>
                <li>Biology text book</li>
                <li>Biology text book</li>
                <li>Biology text book</li>
                <li>Biology text book</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`sidebar-footer ${isDark ? 'sidebar-footer-dark' : ''}`}>
          <nav className="footer-nav">
            <ProfileButton isOpen={isMobileOpen} />
            {/* <button className={`btn-settings ${isDark ? 'btn-settings-dark' : ''}`}>
              <Settings className="icon" />
              {isOpen && <span>Settings</span>}
            </button>
            <button className={`btn-upgrade ${isDark ? 'btn-upgrade-dark' : ''}`}>
              <LogOut className="icon" />
              {isOpen && <span>Upgrade</span>}
            </button> */}
          </nav>
        </div>
      </aside>
      
      <div 
        className={`sidebar-overlay ${isOpen ? 'visible' : 'hidden'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'} ${
          isDark ? 'sidebar-dark' : 'sidebar-light'
        }`}
      >
        {/* Header */}
        <div className="sidebar-header">
          <img src="" className={`logo ${isOpen ? 'block-md' : 'hidden-md'}`} />
          {isOpen && (
            <button 
              onClick={onClose}
              className={`btn-close ${isDark ? 'btn-close-dark' : ''}`}
            >
              <X className="icon" />
            </button>
          )}
        </div>

        {/* Main Sidebar Content */}
        <div className={`sidebar-content ${isOpen ? 'block-md' : 'hidden-md'}`}>
            <button className={`btn-new-chat ${isDark ? 'btn-new-chat-dark' : ''}`}>
          <div className="new-chat">
            <img src={automationImage} alt="Logo" className={`logo ${isOpen ? 'block-md' : 'hidden-md'}`} />

            {isOpen && <span>New Chat</span>}
          </div>
            <div className="icon-new-chat">
              <Plus className="icon" />
            </div>
          </button>

          <div className="recent-chats">
            {isOpen && <h3 className={`recent-chats-title ${isDark ? 'recent-chats-title-dark' : ''}`}>Recent Chats</h3>}
            <div className={`chat-items ${isDark ? 'chat-items-dark' : ''}`}>
              {/* Chat items would go here */}
              <ul>
                <li>Biology text book</li>
                <li>Biology text book</li>
                <li>Biology text book</li>
                <li>Biology text book</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`sidebar-footer ${isDark ? 'sidebar-footer-dark' : ''}`}>
          <nav className="footer-nav">
            <ProfileButton isOpen={isOpen} />
            {/* <button className={`btn-settings ${isDark ? 'btn-settings-dark' : ''}`}>
              <Settings className="icon" />
              {isOpen && <span>Settings</span>}
            </button>
            <button className={`btn-upgrade ${isDark ? 'btn-upgrade-dark' : ''}`}>
              <LogOut className="icon" />
              {isOpen && <span>Upgrade</span>}
            </button> */}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
