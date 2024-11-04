import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

const ThemeToggle = ({ isSidebarOpen }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 rounded-full
        transition-all duration-300 ease-in-out
        ${!isSidebarOpen 
          ? 'fixed top-4 right-4 z-50' // Position when sidebar is closed: top right corner
          : '' // No fixed position when sidebar is open as it will be positioned by the parent
        }
        ${isDark 
          ? 'bg-slate-800 text-yellow-500 hover:bg-slate-700' 
          : 'bg-white text-slate-800 hover:bg-slate-100 shadow-md'
        }
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;