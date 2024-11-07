import { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import ChatInput from '../components/ChatInput';
import UploadSection from '../components/UploadSection';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../components/ThemeContext';
import './NewChatPage.css'


const NewChat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 800);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
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
    <div className={`flex h-screen ${isDark ? 'bg-dark' : 'bg-light'}`}>
      <div className={"hamburger"} onClick={()=>setIsMobileSidebarOpen(!isMobileSidebarOpen)}>
            ☰
          </div>
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        isMobileOpen={isMobileSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
        <ThemeToggle isSidebarOpen={false}/>

      {/* Main Content */}
      <main 
        className="main"
      >
        
        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {/* <UploadSection /> */}
        </div>

        {/* Chat Input */}
        <ChatInput />
      </main>
    </div>
  );
};

export default NewChat;