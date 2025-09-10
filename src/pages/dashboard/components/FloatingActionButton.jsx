import React from 'react';
import Icon from '../../../components/AppIcon';

const FloatingActionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-100 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 md:hidden"
      aria-label="Add new invoice"
    >
      <Icon name="Plus" size={24} />
    </button>
  );
};

export default FloatingActionButton;