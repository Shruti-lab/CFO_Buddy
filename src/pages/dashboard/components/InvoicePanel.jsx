import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InvoicePanel = ({ invoices, onQuickAdd }) => {
  const [activeTab, setActiveTab] = useState('pending');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })?.format(new Date(date));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'overdue':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getDaysOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const filteredInvoices = invoices?.filter(invoice => {
    if (activeTab === 'all') return true;
    return invoice?.status === activeTab;
  });

  const tabs = [
    { id: 'pending', label: 'Pending', count: invoices?.filter(inv => inv?.status === 'pending')?.length },
    { id: 'overdue', label: 'Overdue', count: invoices?.filter(inv => inv?.status === 'overdue')?.length },
    { id: 'paid', label: 'Recent Paid', count: invoices?.filter(inv => inv?.status === 'paid')?.length },
    { id: 'all', label: 'All', count: invoices?.length }
  ];

  return (
    <div className="bg-card rounded-lg card-shadow">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Invoice Management</h2>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={onQuickAdd}
            className="hidden sm:flex"
          >
            Add Invoice
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
                activeTab === tab?.id
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="hidden sm:inline">{tab?.label}</span>
              <span className="sm:hidden">{tab?.label?.split(' ')?.[0]}</span>
              <span className="ml-1 text-xs bg-muted-foreground/20 px-1.5 py-0.5 rounded-full">
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Invoice List */}
      <div className="p-6">
        {filteredInvoices?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="FileText" size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No {activeTab} invoices found</p>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              onClick={onQuickAdd}
              className="mt-4"
            >
              Create First Invoice
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Client</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Due Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices?.map((invoice) => (
                      <tr key={invoice?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-foreground">{invoice?.clientName}</p>
                            <p className="text-sm text-muted-foreground">#{invoice?.invoiceNumber}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-semibold text-foreground">{formatCurrency(invoice?.amount)}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-foreground">{formatDate(invoice?.dueDate)}</p>
                          {invoice?.status === 'overdue' && (
                            <p className="text-xs text-red-600">
                              {getDaysOverdue(invoice?.dueDate)} days overdue
                            </p>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice?.status)}`}>
                            {invoice?.status?.charAt(0)?.toUpperCase() + invoice?.status?.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm" iconName="Eye">
                              View
                            </Button>
                            {invoice?.status !== 'paid' && (
                              <Button variant="ghost" size="sm" iconName="Send">
                                Send
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredInvoices?.map((invoice) => (
                <div key={invoice?.id} className="bg-muted rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-foreground">{invoice?.clientName}</p>
                      <p className="text-sm text-muted-foreground">#{invoice?.invoiceNumber}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice?.status)}`}>
                      {invoice?.status?.charAt(0)?.toUpperCase() + invoice?.status?.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-semibold text-foreground">{formatCurrency(invoice?.amount)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="text-foreground">{formatDate(invoice?.dueDate)}</p>
                      {invoice?.status === 'overdue' && (
                        <p className="text-xs text-red-600">
                          {getDaysOverdue(invoice?.dueDate)} days overdue
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" iconName="Eye" fullWidth>
                      View
                    </Button>
                    {invoice?.status !== 'paid' && (
                      <Button variant="outline" size="sm" iconName="Send" fullWidth>
                        Send
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicePanel;