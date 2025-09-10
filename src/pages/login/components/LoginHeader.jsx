import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-12">
      {/* Logo */}
      <Link to="/dashboard" className="inline-flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
          <Icon name="DollarSign" size={28} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-foreground">CFO Buddy</h1>
          <p className="text-sm text-muted-foreground">Your Financial Co-Pilot</p>
        </div>
      </Link>

      {/* Tagline */}
      <div className="max-w-md mx-auto">
        <h2 className="text-lg font-medium text-foreground mb-2">
          Take Control of Your Cash Flow
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Simple, stress-free financial insights that help you understand your runway and make confident business decisions.
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;