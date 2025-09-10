import React from 'react';
import Icon from '../../../components/AppIcon';

const InvoiceHeader = ({ totalPending, overdueCount, onAddInvoice }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 card-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Invoice Management</h1>
              <p className="text-sm text-muted-foreground">Track and manage your invoices</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">${totalPending?.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-error">{overdueCount}</div>
              <div className="text-xs text-muted-foreground">Overdue</div>
            </div>
          </div>

          <button
            onClick={onAddInvoice}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-smooth flex items-center space-x-2"
          >
            <Icon name="Plus" size={18} />
            <span>Add Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;