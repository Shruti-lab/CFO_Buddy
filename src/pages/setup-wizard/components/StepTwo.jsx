import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StepTwo = ({ data, onUpdate, onNext, onPrevious }) => {
  const [expenses, setExpenses] = useState(data?.fixedCosts || {
    rent: '',
    salaries: '',
    utilities: '',
    software: '',
    insurance: '',
    other: ''
  });
  const [error, setError] = useState('');

  const expenseCategories = [
    { key: 'rent', label: 'Rent & Facilities', icon: 'Building2', placeholder: '2500' },
    { key: 'salaries', label: 'Salaries & Wages', icon: 'Users', placeholder: '8000' },
    { key: 'utilities', label: 'Utilities', icon: 'Zap', placeholder: '300' },
    { key: 'software', label: 'Software & Tools', icon: 'Monitor', placeholder: '500' },
    { key: 'insurance', label: 'Insurance', icon: 'Shield', placeholder: '400' },
    { key: 'other', label: 'Other Fixed Costs', icon: 'MoreHorizontal', placeholder: '200' }
  ];

  const handleExpenseChange = (key, value) => {
    const updatedExpenses = { ...expenses, [key]: value };
    setExpenses(updatedExpenses);
    setError('');
    onUpdate({ fixedCosts: updatedExpenses });
  };

  const calculateTotal = () => {
    return Object.values(expenses)?.reduce((total, value) => {
      return total + (parseFloat(value) || 0);
    }, 0);
  };

  const handleNext = () => {
    const total = calculateTotal();
    if (total <= 0) {
      setError('Please enter at least one fixed cost amount');
      return;
    }
    onNext();
  };

  const formatCurrency = (value) => {
    if (!value) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Calculator" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          What are your monthly fixed costs?
        </h2>
        <p className="text-muted-foreground">
          These are expenses that stay roughly the same each month. Don't worry about being perfect - 
          estimates work fine and you can adjust them later.
        </p>
      </div>
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {expenseCategories?.map((category) => (
            <Input
              key={category?.key}
              label={category?.label}
              type="number"
              placeholder={category?.placeholder}
              value={expenses?.[category?.key]}
              onChange={(e) => handleExpenseChange(category?.key, e?.target?.value)}
              description={`Monthly ${category?.label?.toLowerCase()}`}
            />
          ))}
        </div>

        {error && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm text-error">{error}</span>
            </div>
          </div>
        )}

        {calculateTotal() > 0 && (
          <div className="bg-secondary/50 border border-secondary rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Calculator" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Total Monthly Fixed Costs:
                </span>
              </div>
              <span className="text-lg font-semibold text-primary">
                {formatCurrency(calculateTotal())}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              This helps us calculate your monthly burn rate and cash runway
            </p>
          </div>
        )}
      </div>
      <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-foreground mb-1">What counts as fixed costs?</h3>
            <p className="text-sm text-muted-foreground">
              Fixed costs are expenses that don't change much month to month - like rent, salaries, 
              insurance, and software subscriptions. Variable costs like materials or commissions 
              can be added later.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious} iconName="ArrowLeft" iconPosition="left">
          Previous
        </Button>
        <Button onClick={handleNext} iconName="ArrowRight" iconPosition="right">
          Continue to Income
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;