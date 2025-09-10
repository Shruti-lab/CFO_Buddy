import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import InvoiceStatusBadge from './InvoiceStatusBadge';
import BulkActionsDropdown from './BulkActionsDropdown';

const InvoiceTable = ({ invoices, selectedInvoices, onSelectInvoice, onSelectAll, onEditInvoice, onMarkPaid, onSendReminder, onBulkAction }) => {
  const [sortField, setSortField] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const isAllSelected = selectedInvoices?.length === invoices?.length && invoices?.length > 0;
  const isSomeSelected = selectedInvoices?.length > 0 && selectedInvoices?.length < invoices?.length;

  return (
    <div className="bg-card border border-border rounded-lg card-shadow overflow-hidden">
      {/* Bulk Actions Bar */}
      {selectedInvoices?.length > 0 && (
        <div className="bg-secondary/50 border-b border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedInvoices?.length} invoice{selectedInvoices?.length !== 1 ? 's' : ''} selected
            </span>
            <BulkActionsDropdown
              selectedCount={selectedInvoices?.length}
              onBulkAction={onBulkAction}
            />
          </div>
        </div>
      )}
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isSomeSelected;
                  }}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('client')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <span>Client</span>
                  <Icon name={getSortIcon('client')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('amount')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <span>Amount</span>
                  <Icon name={getSortIcon('amount')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('dueDate')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <span>Due Date</span>
                  <Icon name={getSortIcon('dueDate')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
              </th>
              <th className="text-right p-4">
                <span className="text-sm font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices?.map((invoice) => {
              const isOverdue = invoice?.status === 'overdue';
              const daysOverdue = isOverdue ? getDaysOverdue(invoice?.dueDate) : 0;
              
              return (
                <tr
                  key={invoice?.id}
                  className={`border-b border-border hover:bg-muted/30 transition-smooth ${
                    isOverdue ? 'bg-error/5' : ''
                  }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedInvoices?.includes(invoice?.id)}
                      onChange={(e) => onSelectInvoice(invoice?.id, e?.target?.checked)}
                      className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-foreground">{invoice?.client}</div>
                      {invoice?.description && (
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {invoice?.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-foreground">
                      {formatCurrency(invoice?.amount)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="text-foreground">{formatDate(invoice?.dueDate)}</div>
                      {isOverdue && (
                        <div className="text-xs text-error font-medium">
                          {daysOverdue} day{daysOverdue !== 1 ? 's' : ''} overdue
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <InvoiceStatusBadge status={invoice?.status} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onEditInvoice(invoice)}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
                        title="Edit invoice"
                      >
                        <Icon name="Edit" size={16} />
                      </button>
                      {invoice?.status !== 'paid' && (
                        <>
                          <button
                            onClick={() => onMarkPaid(invoice?.id)}
                            className="p-2 text-muted-foreground hover:text-success hover:bg-success/10 rounded-lg transition-smooth"
                            title="Mark as paid"
                          >
                            <Icon name="Check" size={16} />
                          </button>
                          <button
                            onClick={() => onSendReminder(invoice?.id)}
                            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-smooth"
                            title="Send reminder"
                          >
                            <Icon name="Send" size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden">
        {invoices?.map((invoice) => {
          const isOverdue = invoice?.status === 'overdue';
          const daysOverdue = isOverdue ? getDaysOverdue(invoice?.dueDate) : 0;
          
          return (
            <div
              key={invoice?.id}
              className={`p-4 border-b border-border ${isOverdue ? 'bg-error/5' : ''}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedInvoices?.includes(invoice?.id)}
                    onChange={(e) => onSelectInvoice(invoice?.id, e?.target?.checked)}
                    className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <div>
                    <div className="font-medium text-foreground">{invoice?.client}</div>
                    <div className="text-lg font-semibold text-foreground">
                      {formatCurrency(invoice?.amount)}
                    </div>
                  </div>
                </div>
                <InvoiceStatusBadge status={invoice?.status} />
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Due Date:</span>
                  <div className="text-right">
                    <div className="text-foreground">{formatDate(invoice?.dueDate)}</div>
                    {isOverdue && (
                      <div className="text-xs text-error font-medium">
                        {daysOverdue} day{daysOverdue !== 1 ? 's' : ''} overdue
                      </div>
                    )}
                  </div>
                </div>
                {invoice?.description && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Description:</span>
                    <div className="text-foreground mt-1">{invoice?.description}</div>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => onEditInvoice(invoice)}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
                  title="Edit invoice"
                >
                  <Icon name="Edit" size={16} />
                </button>
                {invoice?.status !== 'paid' && (
                  <>
                    <button
                      onClick={() => onMarkPaid(invoice?.id)}
                      className="p-2 text-muted-foreground hover:text-success hover:bg-success/10 rounded-lg transition-smooth"
                      title="Mark as paid"
                    >
                      <Icon name="Check" size={16} />
                    </button>
                    <button
                      onClick={() => onSendReminder(invoice?.id)}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-smooth"
                      title="Send reminder"
                    >
                      <Icon name="Send" size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {invoices?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No invoices found</h3>
          <p className="text-muted-foreground">
            Create your first invoice to start tracking payments
          </p>
        </div>
      )}
    </div>
  );
};

export default InvoiceTable;