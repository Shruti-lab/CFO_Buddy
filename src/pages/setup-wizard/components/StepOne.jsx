import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StepOne = ({ data, onUpdate, onNext }) => {
  const [cashPosition, setCashPosition] = useState(data?.cashPosition || '');
  const [error, setError] = useState('');

  const handleCashPositionChange = (e) => {
    const value = e?.target?.value;
    setCashPosition(value);
    setError('');
    onUpdate({ cashPosition: value });
  };

  const handleNext = () => {
    if (!cashPosition || parseFloat(cashPosition) < 0) {
      setError('Please enter a valid cash position amount');
      return;
    }
    onNext();
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="DollarSign" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          What's your current cash position?
        </h2>
        <p className="text-muted-foreground">
          This is the total amount of cash your business has right now. Don't worry about being exact - 
          we can always update this later.
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <Input
          label="Current Cash Position"
          type="number"
          placeholder="25000"
          value={cashPosition}
          onChange={handleCashPositionChange}
          error={error}
          description="Enter the total cash available in your business accounts"
          className="mb-4"
        />

        {cashPosition && (
          <div className="bg-secondary/50 border border-secondary rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                Your current cash position: {formatCurrency(cashPosition)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              This will be used to calculate your cash runway and financial health score
            </p>
          </div>
        )}
      </div>

      <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-foreground mb-1">Why do we need this?</h3>
            <p className="text-sm text-muted-foreground">
              Your cash position helps us calculate how long your business can operate with current expenses. 
              This is the foundation for all your financial insights and runway calculations.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" disabled>
          Previous
        </Button>
        <Button onClick={handleNext} iconName="ArrowRight" iconPosition="right">
          Continue to Fixed Costs
        </Button>
      </div>
    </div>
  );
};

export default StepOne;