import { useState } from 'react';
import { X, Menu, LogOut, Settings, Plus } from 'lucide-react';
import ProfileButton from './ProfileButton';
import { useTheme } from './ThemeContext';

const Sidebar = ({ isOpen, onClose, toggleSidebar, children }) => {
  const { isDark } = useTheme();

  return (
    <div className="flex min-h-screen">
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          transition-opacity duration-300`} 
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 h-screen
          ${isOpen ? 'w-64' : 'w-0 md:w-16'} 
          ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}
          ${!isDark && 'border-r border-slate-200'}
          transition-all duration-300 ease-in-out
          flex flex-col shrink-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <img src="../assets/logo1.png" alt="Logo" className={`h-8 ${isOpen ? 'block' : 'hidden md:block'}`} />
          {isOpen && (
            <button 
              onClick={onClose}
              className={`p-2 rounded-full
                ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Main Sidebar Content */}
        <div className={`flex-1 overflow-y-auto ${isOpen ? 'block' : 'hidden md:block'}`}>
          <button className={`w-full px-4 py-2 flex items-center gap-2 
            ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
            <Plus className="h-5 w-5" />
            {isOpen && <span>New Chat</span>}
          </button>

          <div className="px-4 py-2">
            {isOpen && <h3 className={`text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Recent Chats
            </h3>}
            <div className="mt-2 space-y-1">
              {/* Chat items would go here */}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <nav className="space-y-2">
            <ProfileButton isOpen={isOpen} />
            <button className={`w-full p-2 flex items-center gap-2 rounded-lg 
              ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
              <Settings className="h-5 w-5" />
              {isOpen && <span>Settings</span>}
            </button>
            <button className={`w-full p-2 flex items-center gap-2 rounded-lg 
              ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
              <LogOut className="h-5 w-5" />
              {isOpen && <span>Upgrade</span>}
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;