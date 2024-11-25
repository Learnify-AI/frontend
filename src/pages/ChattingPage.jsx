// ChattingPage.jsx
import { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ChatInput from '../components/ChatInput';
import { useTheme } from '../components/ThemeContext';
import ChatDisplay from '../components/ChatDisplay';
import { db } from '../firebase'; // Firebase Firestore instance
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import './NewChatPage.css';
import './ChattingPage.css';

const Chatting = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { isDark } = useTheme();
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);

  // Listen for authentication state changes to get the userId
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!userId || !id) return;

    const chatDoc = doc(db, 'users', userId, 'chatSessions', id);
    const chatSnap = await getDoc(chatDoc);

    if (chatSnap.exists()) {
      setMessages(chatSnap.data().messages || []);
    } else if (state?.initialMessage) {
      const initialMessages = [
        { id: 1, text: state.initialMessage, user: 'User 2' },
        { id: 2, text: 'Welcome to the chat', user: 'User 1' },
      ];
      await setDoc(chatDoc, { messages: initialMessages });
      setMessages(initialMessages);
    }
  }, [id, state, userId]);

  // Add a message to the chat
  const addMessage = useCallback(
    async (text, user) => {
      const newMessage = { id: messages.length + 1, text, user };
      const chatDoc = doc(db, 'chats', id);

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      await updateDoc(chatDoc, { messages: arrayUnion(newMessage) });
    },
    [id, messages]
  );

  // Fetch user chats and messages on mount or when userId changes
  useEffect(() => {
    if (userId) {
      fetchMessages();
    }
  }, [fetchMessages, userId]);

  return (
    
      <main className="main">
        <div className="chatting-container">
          <ChatDisplay messages={messages} />
          <div className={`input-box ${isDark ? 'dark' : 'light'}`}>
            <ChatInput addMessage={addMessage} isChatting={true} />
          </div>
        </div>
      </main>
  );
};

export default Chatting;
