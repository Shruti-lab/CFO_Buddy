import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const BusinessHealthSummary = ({ weeklyData, trends }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const formatPercentage = (value) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value?.toFixed(1)}%`;
  };

  const getTrendColor = (value) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrendIcon = (value) => {
    if (value > 0) return 'TrendingUp';
    if (value < 0) return 'TrendingDown';
    return 'Minus';
  };

  const summaryCards = [
    {
      title: 'Cash In',
      amount: weeklyData?.cashIn,
      trend: trends?.cashInTrend,
      icon: 'ArrowDownLeft',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    {
      title: 'Cash Out',
      amount: weeklyData?.cashOut,
      trend: trends?.cashOutTrend,
      icon: 'ArrowUpRight',
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100'
    },
    {
      title: 'Net Flow',
      amount: weeklyData?.netFlow,
      trend: trends?.netFlowTrend,
      icon: 'Activity',
      iconColor: weeklyData?.netFlow >= 0 ? 'text-green-600' : 'text-red-600',
      iconBg: weeklyData?.netFlow >= 0 ? 'bg-green-100' : 'bg-red-100'
    },
    {
      title: 'Outstanding',
      amount: weeklyData?.outstanding,
      trend: trends?.outstandingTrend,
      icon: 'Clock',
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100'
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Weekly Business Health</h2>
          <p className="text-sm text-muted-foreground">
            Summary for week ending {new Date()?.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="ghost" size="sm" iconName="Mail">
            Email
          </Button>
        </div>
      </div>
      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryCards?.map((card, index) => (
          <div key={index} className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card?.iconBg}`}>
                <Icon name={card?.icon} size={20} className={card?.iconColor} />
              </div>
              <div className={`flex items-center space-x-1 ${getTrendColor(card?.trend)}`}>
                <Icon name={getTrendIcon(card?.trend)} size={16} />
                <span className="text-sm font-medium">{formatPercentage(card?.trend)}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{card?.title}</p>
              <p className="text-lg font-semibold text-foreground">{formatCurrency(card?.amount)}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Key Insights */}
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Key Insights</h3>
        <div className="space-y-3">
          {weeklyData?.netFlow > 0 ? (
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="CheckCircle" size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Positive Cash Flow</p>
                <p className="text-sm text-green-700">
                  Great job! You generated {formatCurrency(weeklyData?.netFlow)} in positive cash flow this week.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="AlertTriangle" size={16} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-800">Negative Cash Flow</p>
                <p className="text-sm text-yellow-700">
                  You spent {formatCurrency(Math.abs(weeklyData?.netFlow))} more than you earned this week. Consider following up on outstanding invoices.
                </p>
              </div>
            </div>
          )}

          {weeklyData?.outstanding > 0 && (
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Info" size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">Outstanding Invoices</p>
                <p className="text-sm text-blue-700">
                  You have {formatCurrency(weeklyData?.outstanding)} in outstanding invoices. Consider sending payment reminders.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Target" size={16} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Weekly Goal</p>
              <p className="text-sm text-gray-700">
                Based on your monthly targets, aim for {formatCurrency(25000)} in weekly revenue to stay on track.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHealthSummary;