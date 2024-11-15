import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogo from "../assets/google-icon.svg";
import BrandLogo from "../assets/logo_icon_purple.png";
import { Eye, EyeOff } from 'lucide-react';
import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [invalidAttempts, setInvalidAttempts] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // This is a new user - create account automatically
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          await sendEmailVerification(userCredential.user);
          navigate('/verify-email', { state: { email } });
        } catch (createError) {
          setError(createError.message.replace('Firebase: ', ''));
        }
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password');
        setInvalidAttempts(prev => prev + 1);
      } else {
        setError(error.message.replace('Firebase: ', ''));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      if (!result.user.emailVerified) {
        navigate('/verify-email', { state: { email: result.user.email } });
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.message.replace('Firebase: ', ''));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        {/* Logo and Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <img 
              src={BrandLogo}
              alt="Brand Logo"
              className="w-[50px] h-[50px]"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-serif tracking-tight">
              Your ideas,
              <br />
              amplified
            </h1>
            <p className="text-gray-600 text-sm">
              Privacy-first AI that helps you create in confidence.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          {/* Google Sign In Button */}
          <button 
            onClick={handleGoogleSignIn} 
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 p-3 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img 
              src={GoogleLogo}
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span className="text-gray-700">Continue with Google</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          {/* Email and Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your personal or work email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
                disabled={isLoading}
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter your password"
                className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#a955f7] text-white p-3 rounded-md hover:bg-[rgba(169,85,247,0.65)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Please wait...' : 'Continue'}
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className={`text-center ${invalidAttempts > 2 ? 'text-red-500' : ''}`}>
            <a href="/forgot-password" className={`text-sm hover:underline ${invalidAttempts > 2 ? 'text-red-500' : 'text-[#a955f7]'}`}>
              Forgot Password?
            </a>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500 mt-4">
          By continuing, you agree to Anthropic's{' '}
          <a href="#" className="underline hover:text-gray-700">
            Consumer Terms
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-gray-700">
            Usage Policy
          </a>
          , and acknowledge their{' '}
          <a href="#" className="underline hover:text-gray-700">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginPage;