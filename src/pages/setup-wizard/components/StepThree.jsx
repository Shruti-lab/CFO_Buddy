import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StepThree = ({ data, onUpdate, onNext, onPrevious }) => {
  const [incomeData, setIncomeData] = useState(data?.expectedIncome || {
    monthlyRevenue: '',
    timeline: 'monthly',
    confidence: 'medium',
    notes: ''
  });
  const [error, setError] = useState('');

  const timelineOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const confidenceOptions = [
    { value: 'high', label: 'High - Very predictable', description: 'Recurring revenue, contracts' },
    { value: 'medium', label: 'Medium - Somewhat predictable', description: 'Regular clients, seasonal patterns' },
    { value: 'low', label: 'Low - Unpredictable', description: 'Project-based, new business' }
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...incomeData, [field]: value };
    setIncomeData(updatedData);
    setError('');
    onUpdate({ expectedIncome: updatedData });
  };

  const handleNext = () => {
    if (!incomeData?.monthlyRevenue || parseFloat(incomeData?.monthlyRevenue) <= 0) {
      setError('Please enter your expected monthly revenue');
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

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      case 'low': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="TrendingUp" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          What income do you expect?
        </h2>
        <p className="text-muted-foreground">
          Help us understand your revenue patterns so we can give you better cash flow insights. 
          Your best estimate is perfectly fine - we can adjust as things change.
        </p>
      </div>
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="space-y-4">
          <Input
            label="Expected Monthly Revenue"
            type="number"
            placeholder="15000"
            value={incomeData?.monthlyRevenue}
            onChange={(e) => handleInputChange('monthlyRevenue', e?.target?.value)}
            error={error}
            description="Your best estimate of monthly income"
          />

          <Select
            label="Revenue Timeline"
            options={timelineOptions}
            value={incomeData?.timeline}
            onChange={(value) => handleInputChange('timeline', value)}
            description="How often do you typically receive payments?"
          />

          <Select
            label="Confidence Level"
            options={confidenceOptions}
            value={incomeData?.confidence}
            onChange={(value) => handleInputChange('confidence', value)}
            description="How predictable is your revenue?"
          />

          <Input
            label="Additional Notes (Optional)"
            type="text"
            placeholder="Seasonal business, new contracts starting..."
            value={incomeData?.notes}
            onChange={(e) => handleInputChange('notes', e?.target?.value)}
            description="Any details that might affect your income forecast"
          />
        </div>

        {incomeData?.monthlyRevenue && (
          <div className="bg-secondary/50 border border-secondary rounded-lg p-4 mt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Expected Monthly Revenue:
                </span>
              </div>
              <span className="text-lg font-semibold text-primary">
                {formatCurrency(incomeData?.monthlyRevenue)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">Confidence Level:</span>
              <span className={`text-xs font-medium ${getConfidenceColor(incomeData?.confidence)}`}>
                {confidenceOptions?.find(opt => opt?.value === incomeData?.confidence)?.label}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-foreground mb-1">Why do we need income forecasts?</h3>
            <p className="text-sm text-muted-foreground">
              Understanding your expected income helps us calculate your net cash flow and predict 
              when you might need additional funding. Don't worry about being exact - we'll help 
              you refine these numbers over time.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious} iconName="ArrowLeft" iconPosition="left">
          Previous
        </Button>
        <Button onClick={handleNext} iconName="ArrowRight" iconPosition="right">
          Continue to Invoices
        </Button>
      </div>
    </div>
  );
};

export default StepThree;