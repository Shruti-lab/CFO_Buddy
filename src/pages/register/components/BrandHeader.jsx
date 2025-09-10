import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BrandHeader = () => {
  return (
    <div className="text-center mb-8">
      <Link to="/dashboard" className="inline-flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <Icon name="DollarSign" size={28} color="white" />
        </div>
        <span className="text-2xl font-bold text-foreground">CFO Buddy</span>
      </Link>
      
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Create Your Account
      </h1>
      
      <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
        Take control of your business finances with confidence. Join thousands of small business owners who've simplified their cash flow management.
      </p>
    </div>
  );
};

export default BrandHeader;