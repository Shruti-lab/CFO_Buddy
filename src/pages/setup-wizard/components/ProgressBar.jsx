import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, label: 'Cash Position', icon: 'DollarSign' },
    { id: 2, label: 'Fixed Costs', icon: 'Calculator' },
    { id: 3, label: 'Expected Income', icon: 'TrendingUp' },
    { id: 4, label: 'Pending Invoices', icon: 'FileText' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-primary text-primary-foreground border-primary';
      case 'active':
        return 'bg-accent text-accent-foreground border-accent';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (stepId) => {
    return stepId < currentStep ? 'bg-primary' : 'bg-border';
  };

  return (
    <div className="w-full bg-card border-b border-border p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-foreground">Welcome to CFO Buddy</h1>
          <p className="text-muted-foreground">Let's set up your financial dashboard in 4 simple steps</p>
        </div>
        
        {/* Progress Bar */}
        <div className="relative">
          <div className="flex items-center justify-between">
            {steps?.map((step, index) => {
              const status = getStepStatus(step?.id);
              return (
                <div key={step?.id} className="flex flex-col items-center relative z-10">
                  {/* Step Circle */}
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${getStepClasses(status)}`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <Icon name={step?.icon} size={20} />
                    )}
                  </div>
                  {/* Step Label */}
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${status === 'active' ? 'text-foreground' : 'text-muted-foreground'}`}>
                      Step {step?.id}
                    </div>
                    <div className={`text-xs ${status === 'active' ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step?.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Connector Lines */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-border -z-10">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Progress Percentage */}
        <div className="mt-4 text-center">
          <div className="text-sm text-muted-foreground">
            Progress: {Math.round((currentStep / totalSteps) * 100)}% complete
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;