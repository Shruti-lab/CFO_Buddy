import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CompletionModal = ({ isOpen, setupData }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoToDashboard = () => {
    // In a real app, this would save the setup data to the backend
    localStorage.setItem('cfobuddy_setup_complete', 'true');
    localStorage.setItem('cfobuddy_setup_data', JSON.stringify(setupData));
    navigate('/dashboard');
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

  const calculateMonthlyBurn = () => {
    if (!setupData?.fixedCosts) return 0;
    return Object.values(setupData?.fixedCosts)?.reduce((total, value) => {
      return total + (parseFloat(value) || 0);
    }, 0);
  };

  const calculateRunway = () => {
    const cashPosition = parseFloat(setupData?.cashPosition) || 0;
    const monthlyBurn = calculateMonthlyBurn();
    if (monthlyBurn === 0) return 0;
    return Math.floor(cashPosition / monthlyBurn);
  };

  return (
    <div className="fixed inset-0 z-500 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            🎉 Setup Complete!
          </h2>
          <p className="text-muted-foreground">
            Great job! Your financial dashboard is ready. Here's what we've calculated for you:
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-secondary/50 border border-secondary rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Cash Position</span>
              <span className="text-lg font-semibold text-primary">
                {formatCurrency(setupData?.cashPosition)}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Monthly Burn Rate</span>
              <span className="text-lg font-semibold text-error">
                -{formatCurrency(calculateMonthlyBurn())}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Cash Runway</span>
              <span className="text-lg font-semibold text-warning">
                {calculateRunway()} months
              </span>
            </div>
          </div>

          {setupData?.pendingInvoices && setupData?.pendingInvoices?.length > 0 && (
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Pending Invoices
                </span>
                <span className="text-sm text-muted-foreground">
                  {setupData?.pendingInvoices?.length} invoice{setupData?.pendingInvoices?.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">What's next?</h3>
              <p className="text-sm text-muted-foreground">
                Your dashboard will show your financial health, track invoice payments, 
                and alert you to important cash flow changes. You can always update 
                these settings later.
              </p>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleGoToDashboard}
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default CompletionModal;