import { User } from 'lucide-react';
import { useTheme } from './ThemeContext';

const ProfileButton = ({ isOpen }) => {
  const { isDark } = useTheme();

  return (
    <button 
      className={`w-full p-2 flex items-center gap-2 rounded-lg 
        ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} 
        group relative`}
      aria-label="Profile Settings"
    >
      {/* Profile Icon/Avatar */}
      {/* <div className="relative">
        <div className={`h-6 w-6 rounded-full flex items-center justify-center
          ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <User className={`h-4 w-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
        </div>
        <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border-2 border-slate-900" />
      </div> */}

      {/* Profile Info - Only shown when sidebar is open */}
      {isOpen && (
        <div className="flex-1 flex items-center justify-between min-w-0">
          <div className="truncate">
            <p className="text-sm font-medium">John Doe</p>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} truncate`}>
              john.doe@example.com
            </p>
          </div>
        </div>
      )}

      {/* Hover tooltip - Only shown when sidebar is collapsed */}
      {/* {!isOpen && (
        <div className={`absolute left-full ml-2 invisible group-hover:visible 
          ${isDark ? 'bg-slate-800' : 'bg-white border border-slate-200'} 
          text-sm py-1 px-2 rounded whitespace-nowrap z-50`}>
          Profile Settings
        </div>
      )} */}
    </button>
  );
};

export default ProfileButton;