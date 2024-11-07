import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import NewChat from './pages/NewChatPage';
import Chatting from './pages/ChattingPage';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/new" element={<NewChat />} />
          <Route path="/chat" element={<Chatting />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
