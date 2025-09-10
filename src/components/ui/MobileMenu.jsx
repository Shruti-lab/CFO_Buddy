import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileMenu = ({ isOpen, onClose, navigationItems, currentPath }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActiveRoute = (path) => {
    return currentPath === path;
  };

  const handleLinkClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-250 bg-black bg-opacity-50 md:hidden"
        onClick={onClose}
      />
      {/* Mobile Menu Panel */}
      <div className="fixed top-0 left-0 z-300 h-full w-80 max-w-sm bg-card shadow-lg slide-in md:hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="DollarSign" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">CFO Buddy</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              aria-label="Close menu"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-6">
            <nav className="space-y-2 px-4">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-smooth ${
                    isActiveRoute(item?.path)
                      ? 'text-primary bg-secondary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <div>
                    <div>{item?.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item?.description}
                    </div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground text-center">
              © 2025 CFO Buddy. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;