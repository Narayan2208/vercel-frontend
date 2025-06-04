
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import Layout from '@/components/Layout';

const AuthPage: React.FC = () => {
  const [view, setView] = useState<'login' | 'register'>('login');
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      // Redirect to the appropriate dashboard based on role
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
  }, [user, isLoading, navigate]);

  const toggleView = () => {
    setView(view === 'login' ? 'register' : 'login');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-background rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center mb-1">
                {view === 'login' ? 'Welcome back' : 'Create an account'}
              </h2>
              <p className="text-muted-foreground text-center mb-6">
                {view === 'login' 
                  ? 'Sign in to your account to continue' 
                  : 'Join MySakti to find your dream job'}
              </p>

              <motion.div
                key={view}
                initial={{ opacity: 0, x: view === 'login' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: view === 'login' ? 20 : -20 }}
                transition={{ duration: 0.2 }}
              >
                {view === 'login' ? <LoginForm /> : <RegisterForm />}
              </motion.div>

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
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
