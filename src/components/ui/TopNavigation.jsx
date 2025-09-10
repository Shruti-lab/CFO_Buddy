import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import UserAccountDropdown from './UserAccountDropdown';
import MobileMenu from './MobileMenu';

const TopNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'BarChart3',
      description: 'Financial overview and cash flow insights'
    },
    {
      label: 'Invoices',
      path: '/invoice-management',
      icon: 'FileText',
      description: 'Manage and track invoice payments'
    },
    {
      label: 'Reports',
      path: '/financial-reports',
      icon: 'TrendingUp',
      description: 'Financial analysis and business reports'
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-100 bg-card border-b border-border nav-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="DollarSign" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground">CFO Buddy</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    isActiveRoute(item?.path)
                      ? 'text-primary bg-secondary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  title={item?.description}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Quick Access to Login (for testing/development) */}
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
                title="Go to Login Page"
              >
                <Icon name="LogIn" size={16} />
                <span>Login</span>
              </Link>

              {/* User Account Dropdown */}
              <UserAccountDropdown />

              {/* Mobile Menu Button */}
              <button
                onClick={handleMobileMenuToggle}
                className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                aria-label="Toggle mobile menu"
              >
                <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        navigationItems={navigationItems}
        currentPath={location?.pathname}
      />
      {/* Spacer for fixed navigation */}
      <div className="h-16"></div>
    </>
  );
};

export default TopNavigation;