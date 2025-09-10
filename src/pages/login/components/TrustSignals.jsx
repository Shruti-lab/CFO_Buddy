import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Privacy First',
      description: 'We never share your financial information'
    },
    {
      icon: 'CheckCircle',
      title: 'Trusted by 10,000+ Businesses',
      description: 'Join thousands of small business owners'
    }
  ];

  return (
    <div className="mt-16">
      {/* Security Badge */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
          <Icon name="Shield" size={16} />
          <span className="text-sm font-medium">SSL Secured</span>
        </div>
      </div>
      {/* Trust Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name={feature?.icon} size={24} className="text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-2 text-sm">
              {feature?.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Copyright */}
      <div className="text-center mt-12 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} CFO Buddy. All rights reserved. | 
          <button className="ml-1 hover:text-foreground transition-colors">
            Privacy Policy
          </button> | 
          <button className="ml-1 hover:text-foreground transition-colors">
            Terms of Service
          </button>
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;