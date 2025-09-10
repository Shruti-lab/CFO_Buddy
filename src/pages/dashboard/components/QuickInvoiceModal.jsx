import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickInvoiceModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    amount: '',
    dueDate: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.clientName?.trim()) {
      newErrors.clientName = 'Client name is required';
    }

    if (!formData?.amount?.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(parseFloat(formData?.amount)) || parseFloat(formData?.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData?.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today?.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const invoiceData = {
        ...formData,
        amount: parseFloat(formData?.amount),
        invoiceNumber: `INV-${Date.now()}`,
        status: 'pending',
        createdDate: new Date()?.toISOString()
      };

      await onSubmit(invoiceData);
      
      // Reset form
      setFormData({
        clientName: '',
        amount: '',
        dueDate: '',
        description: ''
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error creating invoice:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        clientName: '',
        amount: '',
        dueDate: '',
        description: ''
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-250 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 z-300 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Quick Add Invoice</h2>
              <p className="text-sm text-muted-foreground">Create a new invoice quickly</p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth disabled:opacity-50"
              aria-label="Close modal"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <Input
              label="Client Name"
              type="text"
              name="clientName"
              placeholder="Enter client name"
              value={formData?.clientName}
              onChange={handleInputChange}
              error={errors?.clientName}
              required
              disabled={isSubmitting}
            />

            <Input
              label="Invoice Amount"
              type="number"
              name="amount"
              placeholder="0.00"
              value={formData?.amount}
              onChange={handleInputChange}
              error={errors?.amount}
              required
              disabled={isSubmitting}
              min="0.01"
              step="0.01"
            />

            <Input
              label="Due Date"
              type="date"
              name="dueDate"
              value={formData?.dueDate}
              onChange={handleInputChange}
              error={errors?.dueDate}
              required
              disabled={isSubmitting}
              min={new Date()?.toISOString()?.split('T')?.[0]}
            />

            <Input
              label="Description (Optional)"
              type="text"
              name="description"
              placeholder="Brief description of work or services"
              value={formData?.description}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                loading={isSubmitting}
                iconName="Plus"
                iconPosition="left"
                fullWidth
              >
                Create Invoice
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default QuickInvoiceModal;