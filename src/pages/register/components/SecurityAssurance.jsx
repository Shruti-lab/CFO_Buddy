import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityAssurance = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: '256-bit SSL encryption protects your data'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'We never share your financial information'
    },
    {
      icon: 'CheckCircle',
      title: 'GDPR Compliant',
      description: 'Your data rights are fully protected'
    }
  ];

  return (
    <div className="bg-secondary/50 p-6 rounded-lg border border-border">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="ShieldCheck" size={20} className="text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Your Data is Safe</h3>
      </div>
      <div className="space-y-3">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Icon name={feature?.icon} size={16} className="text-primary mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground">{feature?.title}</div>
              <div className="text-xs text-muted-foreground">{feature?.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityAssurance;