import React from 'react';
import Icon from '../../../components/AppIcon';

const CashRunwayGauge = ({ daysRemaining, currentCash, burnRate, healthStatus }) => {
  const getHealthColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getHealthBgColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100';
      case 'warning':
        return 'bg-yellow-100';
      case 'critical':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProgressWidth = () => {
    if (daysRemaining >= 90) return '100%';
    if (daysRemaining >= 60) return '75%';
    if (daysRemaining >= 30) return '50%';
    if (daysRemaining >= 15) return '25%';
    return '10%';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Cash Runway</h2>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(healthStatus)} ${getHealthBgColor(healthStatus)}`}>
          {healthStatus === 'healthy' && 'Healthy'}
          {healthStatus === 'warning' && 'Monitor'}
          {healthStatus === 'critical' && 'Critical'}
        </div>
      </div>

      {/* Main Gauge Display */}
      <div className="text-center mb-6">
        <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(daysRemaining / 120) * 314} 314`}
              className={getHealthColor(healthStatus)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{daysRemaining}</span>
            <span className="text-sm text-muted-foreground">days</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          Based on current burn rate, you have approximately {daysRemaining} days of runway remaining
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Runway Progress</span>
          <span>{daysRemaining} days</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(healthStatus)}`}
            style={{ width: getProgressWidth() }}
          ></div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="DollarSign" size={20} color="white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Cash</p>
            <p className="text-lg font-semibold text-foreground">{formatCurrency(currentCash)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
            <Icon name="TrendingDown" size={20} color="white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Monthly Burn</p>
            <p className="text-lg font-semibold text-foreground">{formatCurrency(burnRate)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashRunwayGauge;