import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StepFour = ({ data, onUpdate, onNext, onPrevious }) => {
  const [invoices, setInvoices] = useState(data?.pendingInvoices || []);
  const [newInvoice, setNewInvoice] = useState({
    clientName: '',
    amount: '',
    dueDate: '',
    description: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState('');

  const handleAddInvoice = () => {
    if (!newInvoice?.clientName || !newInvoice?.amount || !newInvoice?.dueDate) {
      setError('Please fill in client name, amount, and due date');
      return;
    }

    const invoice = {
      id: Date.now(),
      ...newInvoice,
      amount: parseFloat(newInvoice?.amount),
      status: 'pending',
      createdAt: new Date()?.toISOString()
    };

    const updatedInvoices = [...invoices, invoice];
    setInvoices(updatedInvoices);
    onUpdate({ pendingInvoices: updatedInvoices });
    
    setNewInvoice({ clientName: '', amount: '', dueDate: '', description: '' });
    setShowAddForm(false);
    setError('');
  };

  const handleRemoveInvoice = (id) => {
    const updatedInvoices = invoices?.filter(inv => inv?.id !== id);
    setInvoices(updatedInvoices);
    onUpdate({ pendingInvoices: updatedInvoices });
  };

  const handleSkip = () => {
    onNext();
  };

  const handleFinish = () => {
    onNext();
  };

  const calculateTotal = () => {
    return invoices?.reduce((total, invoice) => total + invoice?.amount, 0);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="FileText" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Add your pending invoices
        </h2>
        <p className="text-muted-foreground">
          Import invoices that haven't been paid yet. This helps us calculate your expected cash flow 
          and identify overdue payments. You can skip this step and add invoices later.
        </p>
      </div>
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        {/* Add Invoice Button */}
        {!showAddForm && (
          <div className="text-center py-8">
            <Button 
              onClick={() => setShowAddForm(true)}
              iconName="Plus"
              iconPosition="left"
              variant="outline"
              className="mb-4"
            >
              Add Pending Invoice
            </Button>
            <p className="text-sm text-muted-foreground">
              Or you can skip this step and add invoices later from your dashboard
            </p>
          </div>
        )}

        {/* Add Invoice Form */}
        {showAddForm && (
          <div className="border border-border rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Add New Invoice</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Client Name"
                type="text"
                placeholder="Acme Corporation"
                value={newInvoice?.clientName}
                onChange={(e) => setNewInvoice({...newInvoice, clientName: e?.target?.value})}
                required
              />
              <Input
                label="Amount"
                type="number"
                placeholder="2500"
                value={newInvoice?.amount}
                onChange={(e) => setNewInvoice({...newInvoice, amount: e?.target?.value})}
                required
              />
              <Input
                label="Due Date"
                type="date"
                value={newInvoice?.dueDate}
                onChange={(e) => setNewInvoice({...newInvoice, dueDate: e?.target?.value})}
                required
              />
              <Input
                label="Description (Optional)"
                type="text"
                placeholder="Website development project"
                value={newInvoice?.description}
                onChange={(e) => setNewInvoice({...newInvoice, description: e?.target?.value})}
              />
            </div>
            
            {error && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-error" />
                  <span className="text-sm text-error">{error}</span>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <Button onClick={handleAddInvoice} iconName="Plus" iconPosition="left">
                Add Invoice
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddForm(false);
                  setError('');
                  setNewInvoice({ clientName: '', amount: '', dueDate: '', description: '' });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Invoice List */}
        {invoices?.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Pending Invoices</h3>
            <div className="space-y-3 mb-4">
              {invoices?.map((invoice) => {
                const daysUntilDue = getDaysUntilDue(invoice?.dueDate);
                const isOverdue = daysUntilDue < 0;
                const isDueSoon = daysUntilDue <= 7 && daysUntilDue >= 0;
                
                return (
                  <div key={invoice?.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-foreground">{invoice?.clientName}</h4>
                          {isOverdue && (
                            <span className="px-2 py-1 bg-error/10 text-error text-xs rounded-full">
                              Overdue
                            </span>
                          )}
                          {isDueSoon && !isOverdue && (
                            <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
                              Due Soon
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(invoice?.amount)} • Due {formatDate(invoice?.dueDate)}
                          {invoice?.description && ` • ${invoice?.description}`}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveInvoice(invoice?.id)}
                        iconName="Trash2"
                        className="text-error hover:text-error"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-secondary/50 border border-secondary rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Total Pending: {invoices?.length} invoice{invoices?.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <span className="text-lg font-semibold text-primary">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-foreground mb-1">Why track pending invoices?</h3>
            <p className="text-sm text-muted-foreground">
              Pending invoices are money you're owed but haven't received yet. Tracking them helps 
              us give you accurate cash flow predictions and alert you to overdue payments that 
              might need follow-up.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious} iconName="ArrowLeft" iconPosition="left">
          Previous
        </Button>
        <div className="flex space-x-2">
          <Button variant="ghost" onClick={handleSkip}>
            Skip for Now
          </Button>
          <Button onClick={handleFinish} iconName="Check" iconPosition="right">
            Complete Setup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepFour;