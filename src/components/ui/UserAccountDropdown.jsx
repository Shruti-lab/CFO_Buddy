import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const UserAccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Mock user data - in real app this would come from auth context
  const currentUser = {
    name: 'John Smith',
    email: 'john@example.com',
    avatar: null,
    initials: 'JS'
  };

  const menuItems = [
    {
      label: 'Profile Settings',
      icon: 'User',
      path: '/profile',
      description: 'Manage your account settings'
    },
    {
      label: 'Business Settings',
      icon: 'Building2',
      path: '/business-settings',
      description: 'Configure business information'
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      path: '/help',
      description: 'Get help and support'
    },
    {
      type: 'divider'
    },
    {
      label: 'Sign Out',
      icon: 'LogOut',
      action: 'logout',
      description: 'Sign out of your account'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if (item?.action === 'logout') {
      // Handle logout logic here
      console.log('Logging out...');
      // Clear any authentication tokens/state here
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userEmail');
      sessionStorage.clear();
      // Redirect to login page
      navigate('/login');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={handleToggle}
        className="flex items-center space-x-2 p-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
          {currentUser?.initials}
        </div>
        <span className="hidden sm:block">{currentUser?.name}</span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg z-200 animate-fade-in">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {currentUser?.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-popover-foreground truncate">
                  {currentUser?.name}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {currentUser?.email}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems?.map((item, index) => {
              if (item?.type === 'divider') {
                return <div key={index} className="my-1 border-t border-border" />;
              }

              if (item?.path) {
                return (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    title={item?.description}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </Link>
                );
              }

              return (
                <button
                  key={item?.label}
                  onClick={() => handleItemClick(item)}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth text-left"
                  title={item?.description}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccountDropdown;