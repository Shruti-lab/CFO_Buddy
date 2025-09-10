import React from 'react';
import Icon from '../../../components/AppIcon';

const InvoiceStatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'paid':
        return {
          label: 'Paid',
          icon: 'CheckCircle',
          className: 'bg-success/10 text-success border-success/20'
        };
      case 'pending':
        return {
          label: 'Pending',
          icon: 'Clock',
          className: 'bg-warning/10 text-warning border-warning/20'
        };
      case 'overdue':
        return {
          label: 'Overdue',
          icon: 'AlertCircle',
          className: 'bg-error/10 text-error border-error/20'
        };
      default:
        return {
          label: 'Unknown',
          icon: 'HelpCircle',
          className: 'bg-muted text-muted-foreground border-border'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${config?.className}`}>
      <Icon name={config?.icon} size={12} />
      <span>{config?.label}</span>
    </span>
  );
};

export default InvoiceStatusBadge;