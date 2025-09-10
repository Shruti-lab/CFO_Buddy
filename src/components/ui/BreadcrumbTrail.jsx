import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = () => {
  const location = useLocation();
  
  // Route mapping for breadcrumb labels and icons
  const routeMap = {
    '/dashboard': {
      label: 'Dashboard',
      icon: 'BarChart3'
    },
    '/invoice-management': {
      label: 'Invoice Management',
      icon: 'FileText'
    },
    '/financial-reports': {
      label: 'Financial Reports',
      icon: 'TrendingUp'
    },
    '/profile': {
      label: 'Profile Settings',
      icon: 'User'
    },
    '/business-settings': {
      label: 'Business Settings',
      icon: 'Building2'
    },
    '/help': {
      label: 'Help & Support',
      icon: 'HelpCircle'
    }
  };

  // Don't show breadcrumbs on auth pages or setup wizard
  const hiddenRoutes = ['/login', '/register', '/setup-wizard'];
  if (hiddenRoutes?.includes(location?.pathname)) {
    return null;
  }

  const currentRoute = routeMap?.[location?.pathname];
  
  // Don't render if route not found
  if (!currentRoute) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <Link
        to="/dashboard"
        className="flex items-center space-x-1 hover:text-foreground transition-smooth"
      >
        <Icon name="Home" size={16} />
        <span>Home</span>
      </Link>
      {location?.pathname !== '/dashboard' && (
        <>
          <Icon name="ChevronRight" size={16} className="text-border" />
          <div className="flex items-center space-x-1 text-foreground">
            <Icon name={currentRoute?.icon} size={16} />
            <span className="font-medium">{currentRoute?.label}</span>
          </div>
        </>
      )}
    </nav>
  );
};

export default BreadcrumbTrail;