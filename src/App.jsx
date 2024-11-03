import { useState, useEffect } from 'react';
import Sidebar from './components/sidebar';
import ChatInput from './components/ChatInput';
import UploadSection from './components/UploadSection';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider, useTheme } from './components/ThemeContext';


const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const { isDark } = useTheme();
  
  // Handle scroll-based sidebar open
  useEffect(() => {
    const handleScroll = () => {
      if (!isSidebarOpen && window.innerWidth >= 768) {
        const mouseX = window.mousemoveX || 0;
        if (mouseX <= 50) { // When mouse is within 50px of left edge
          setIsSidebarOpen(true);
        }
      }
    };

    const handleMouseMove = (e) => {
      window.mousemoveX = e.clientX;
      if (!isSidebarOpen && window.innerWidth >= 768) {
        if (e.clientX <= 50) { // When mouse is within 50px of left edge
          setIsSidebarOpen(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isSidebarOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`flex h-screen ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <main 
        className="flex-1 flex flex-col relative transition-all duration-300 ease-in-out"
        style={{
          width: `calc(100% - ${isSidebarOpen ? '16rem' : '0rem'})`,
          marginLeft: isSidebarOpen ? '16rem' : '0',
        }}
      >
        
        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <UploadSection />
        </div>

        {/* Chat Input */}
        <ChatInput />
      </main>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;