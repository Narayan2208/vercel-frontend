
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'login' }) => {
  const [view, setView] = useState<'login' | 'register'>(initialView);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Close modal and redirect if user logs in
    if (user) {
      onClose();
      if (user.role === 'employer') {
        navigate('/employer/dashboard');
      } else if (user.role === 'jobseeker') {
        navigate('/seeker/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, onClose, navigate]);

  const toggleView = () => {
    setView(view === 'login' ? 'register' : 'login');
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 10 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 30 
            }}
            className="bg-background rounded-2xl w-full max-w-md shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-accent/10 transition-colors"
              >
                <X size={18} />
              </button>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-center mb-1">
                  {view === 'login' ? 'Welcome back' : 'Create an account'}
                </h2>
                <p className="text-muted-foreground text-center mb-6">
                  {view === 'login' 
                    ? 'Sign in to your account to continue' 
                    : 'Join CareerScape to find your dream job'}
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={view}
                    initial={{ opacity: 0, x: view === 'login' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: view === 'login' ? 20 : -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {view === 'login' ? <LoginForm /> : <RegisterForm />}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {view === 'login' ? "Don't have an account?" : "Already have an account?"}
                    <button 
                      onClick={toggleView} 
                      className="ml-1 text-primary hover:text-primary/90 font-medium transition-colors"
                    >
                      {view === 'login' ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
