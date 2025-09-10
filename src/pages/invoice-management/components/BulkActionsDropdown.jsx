import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const BulkActionsDropdown = ({ selectedCount, onBulkAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const actions = [
    {
      id: 'markPaid',
      label: 'Mark as Paid',
      icon: 'Check',
      description: `Mark ${selectedCount} invoice${selectedCount !== 1 ? 's' : ''} as paid`
    },
    {
      id: 'sendReminders',
      label: 'Send Reminders',
      icon: 'Send',
      description: `Send payment reminders for ${selectedCount} invoice${selectedCount !== 1 ? 's' : ''}`
    },
    {
      type: 'divider'
    },
    {
      id: 'export',
      label: 'Export Selected',
      icon: 'Download',
      description: `Export ${selectedCount} selected invoice${selectedCount !== 1 ? 's' : ''}`
    },
    {
      id: 'delete',
      label: 'Delete Selected',
      icon: 'Trash2',
      description: `Delete ${selectedCount} selected invoice${selectedCount !== 1 ? 's' : ''}`,
      destructive: true
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

  const handleActionClick = (actionId) => {
    onBulkAction(actionId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-muted transition-smooth"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Bulk Actions</span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg z-200">
          <div className="py-2">
            {actions?.map((action, index) => {
              if (action?.type === 'divider') {
                return <div key={index} className="my-1 border-t border-border" />;
              }

              return (
                <button
                  key={action?.id}
                  onClick={() => handleActionClick(action?.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-smooth text-left ${
                    action?.destructive ? 'text-error hover:bg-error/10' : 'text-popover-foreground'
                  }`}
                  title={action?.description}
                >
                  <Icon name={action?.icon} size={16} />
                  <div>
                    <div className="font-medium">{action?.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {action?.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActionsDropdown;