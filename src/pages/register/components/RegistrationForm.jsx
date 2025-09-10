import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validatePassword = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[0-9]/?.test(password)) strength++;
    if (/[^A-Za-z0-9]/?.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
      case 3:
        return 'Medium';
      case 4:
      case 5:
        return 'Strong';
      default:
        return '';
    }
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
      case 3:
        return 'bg-yellow-500';
      case 4:
      case 5:
        return 'bg-green-500';
      default:
        return 'bg-gray-200';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      setPasswordStrength(validatePassword(value));
    }

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

    if (!formData?.businessName?.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData?.ownerName?.trim()) {
      newErrors.ownerName = 'Owner name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
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

    try {
      // Mock registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data in localStorage for demo purposes
      localStorage.setItem('cfo_buddy_user', JSON.stringify({
        businessName: formData?.businessName,
        ownerName: formData?.ownerName,
        email: formData?.email,
        registeredAt: new Date()?.toISOString()
      }));

      // Navigate to setup wizard
      navigate('/setup-wizard');
    } catch (error) {
      setErrors({
        submit: 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Business Name"
        type="text"
        name="businessName"
        placeholder="e.g., Smith's Consulting LLC"
        value={formData?.businessName}
        onChange={handleInputChange}
        error={errors?.businessName}
        required
        className="mb-4"
      />
      <Input
        label="Owner Name"
        type="text"
        name="ownerName"
        placeholder="e.g., John Smith"
        value={formData?.ownerName}
        onChange={handleInputChange}
        error={errors?.ownerName}
        required
        className="mb-4"
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="john@smithconsulting.com"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        description="We'll use this to send you important financial updates"
        required
        className="mb-4"
      />
      <div className="space-y-2">
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          className="mb-2"
        />
        
        {formData?.password && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground">
                {getPasswordStrengthText(passwordStrength)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Use 8+ characters with uppercase, lowercase, numbers, and symbols
            </p>
          </div>
        )}
      </div>
      {errors?.submit && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-red-600" />
            <p className="text-sm text-red-600">{errors?.submit}</p>
          </div>
        </div>
      )}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="ArrowRight"
        iconPosition="right"
        className="mt-6"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;