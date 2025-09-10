import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    email: 'john@example.com',
    password: 'password123'
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData?.email);
        navigate('/dashboard');
      } else {
        // Failed login
        setErrors({
          general: 'Invalid email or password. Please try again.'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your CFO Buddy account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors?.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
              <Icon name="AlertCircle" size={20} className="text-red-600 flex-shrink-0" />
              <p className="text-red-700 text-sm">{errors?.general}</p>
            </div>
          )}

          {/* Email Field */}
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          {/* Password Field */}
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot your password?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            iconName={isLoading ? undefined : "LogIn"}
            iconPosition="left"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            New to our platform?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 bg-secondary/50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Demo Account:</p>
              <p>Email: {mockCredentials?.email}</p>
              <p>Password: {mockCredentials?.password}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;