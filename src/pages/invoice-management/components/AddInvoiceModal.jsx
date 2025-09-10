import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AddInvoiceModal = ({ isOpen, onClose, onSave, editingInvoice }) => {
  const [formData, setFormData] = useState({
    client: '',
    amount: '',
    dueDate: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editingInvoice) {
        setFormData({
          client: editingInvoice?.client,
          amount: editingInvoice?.amount?.toString(),
          dueDate: editingInvoice?.dueDate,
          description: editingInvoice?.description || ''
        });
      } else {
        setFormData({
          client: '',
          amount: '',
          dueDate: '',
          description: ''
        });
      }
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, editingInvoice]);

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.client?.trim()) {
      newErrors.client = 'Client name is required';
    }

    if (!formData?.amount || parseFloat(formData?.amount) <= 0) {
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
        id: editingInvoice?.id || Date.now(),
        status: editingInvoice?.status || 'pending',
        createdAt: editingInvoice?.createdAt || new Date()?.toISOString()
      };

      await onSave(invoiceData);
      onClose();
    } catch (error) {
      console.error('Error saving invoice:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-400 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 z-500 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">
              {editingInvoice ? 'Edit Invoice' : 'Add New Invoice'}
            </h2>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth disabled:opacity-50"
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
              placeholder="Enter client name"
              value={formData?.client}
              onChange={(e) => handleInputChange('client', e?.target?.value)}
              error={errors?.client}
              required
              disabled={isSubmitting}
            />

            <Input
              label="Amount"
              type="number"
              placeholder="0.00"
              value={formData?.amount}
              onChange={(e) => handleInputChange('amount', e?.target?.value)}
              error={errors?.amount}
              required
              min="0"
              step="0.01"
              disabled={isSubmitting}
            />

            <Input
              label="Due Date"
              type="date"
              value={formData?.dueDate}
              onChange={(e) => handleInputChange('dueDate', e?.target?.value)}
              error={errors?.dueDate}
              required
              disabled={isSubmitting}
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description (Optional)
              </label>
              <textarea
                placeholder="Enter invoice description or notes..."
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                disabled={isSubmitting}
                rows={3}
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                iconName="Save"
                iconPosition="left"
              >
                {editingInvoice ? 'Update Invoice' : 'Create Invoice'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddInvoiceModal;