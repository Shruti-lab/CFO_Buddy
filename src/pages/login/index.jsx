import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import BackgroundPattern from './components/BackgroundPattern';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Pattern */}
      <BackgroundPattern />
      
      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <LoginHeader />
            
            {/* Login Form Section */}
            <div className="flex justify-center mb-16">
              <LoginForm />
            </div>
            
            {/* Trust Signals Section */}
            <TrustSignals />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;