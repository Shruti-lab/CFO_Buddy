import React from 'react';
import Icon from '../../../components/AppIcon';

const BusinessHealthScorecard = ({ data }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(value);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value?.toFixed(1)}%`;
  };

  const getHealthColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getHealthIcon = (score) => {
    if (score >= 80) return 'CheckCircle';
    if (score >= 60) return 'AlertCircle';
    return 'XCircle';
  };

  const getHealthLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Attention';
  };

  const scorecardData = {
    overallHealth: 75,
    cashPosition: 125000,
    cashPositionChange: 8.5,
    burnRate: 15000,
    burnRateChange: -5.2,
    runway: 95,
    runwayChange: 12.3,
    collectionRate: 87,
    collectionRateChange: 3.1,
    weeklyIncome: 28000,
    weeklyIncomeChange: 15.7,
    weeklyExpenses: 18500,
    weeklyExpensesChange: -2.8
  };

  const MetricCard = ({ title, value, change, icon, format = 'currency', suffix = '' }) => {
    const isPositive = change >= 0;
    const isGoodChange = (title?.includes('Expenses') || title?.includes('Burn')) ? change <= 0 : change >= 0;
    
    return (
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon name={icon} size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
          </div>
          <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
            isGoodChange ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
          }`}>
            <Icon 
              name={isPositive ? 'TrendingUp' : 'TrendingDown'} 
              size={12} 
            />
            <span>{formatPercentage(Math.abs(change))}</span>
          </div>
        </div>
        <div className="text-xl font-semibold text-foreground">
          {format === 'currency' ? formatCurrency(value) : `${value}${suffix}`}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Business Health Scorecard
          </h3>
          <p className="text-sm text-muted-foreground">
            Weekly summary and key performance indicators
          </p>
        </div>
        
        {/* Overall Health Score */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Overall Health</div>
            <div className="text-lg font-semibold text-foreground">
              {scorecardData?.overallHealth}/100
            </div>
          </div>
          <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getHealthColor(scorecardData?.overallHealth)}`}>
            <Icon 
              name={getHealthIcon(scorecardData?.overallHealth)} 
              size={24} 
            />
          </div>
        </div>
      </div>
      {/* Health Status Banner */}
      <div className={`rounded-lg p-4 mb-6 ${getHealthColor(scorecardData?.overallHealth)}`}>
        <div className="flex items-center gap-3">
          <Icon name={getHealthIcon(scorecardData?.overallHealth)} size={20} />
          <div>
            <div className="font-medium">
              Your business health is {getHealthLabel(scorecardData?.overallHealth)}
            </div>
            <div className="text-sm opacity-80 mt-1">
              {scorecardData?.overallHealth >= 80 
                ? "Great job! Your cash flow and runway are in excellent shape."
                : scorecardData?.overallHealth >= 60
                ? "You're doing well, but there's room for improvement in some areas."
                : "Some areas need attention. Focus on improving cash flow and reducing expenses."
              }
            </div>
          </div>
        </div>
      </div>
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <MetricCard
          title="Cash Position"
          value={scorecardData?.cashPosition}
          change={scorecardData?.cashPositionChange}
          icon="DollarSign"
          format="currency"
        />
        <MetricCard
          title="Monthly Burn Rate"
          value={scorecardData?.burnRate}
          change={scorecardData?.burnRateChange}
          icon="TrendingDown"
          format="currency"
        />
        <MetricCard
          title="Runway Days"
          value={scorecardData?.runway}
          change={scorecardData?.runwayChange}
          icon="Calendar"
          format="number"
          suffix=" days"
        />
        <MetricCard
          title="Collection Rate"
          value={scorecardData?.collectionRate}
          change={scorecardData?.collectionRateChange}
          icon="Target"
          format="number"
          suffix="%"
        />
        <MetricCard
          title="Weekly Income"
          value={scorecardData?.weeklyIncome}
          change={scorecardData?.weeklyIncomeChange}
          icon="ArrowUp"
          format="currency"
        />
        <MetricCard
          title="Weekly Expenses"
          value={scorecardData?.weeklyExpenses}
          change={scorecardData?.weeklyExpensesChange}
          icon="ArrowDown"
          format="currency"
        />
      </div>
      {/* Weekly Summary */}
      <div className="border-t border-border pt-6">
        <h4 className="text-md font-semibold text-foreground mb-4">
          This Week's Summary
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cash Flow Summary */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="TrendingUp" size={16} className="text-primary" />
              <span className="font-medium text-foreground">Cash Flow</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Money In:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(scorecardData?.weeklyIncome)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Money Out:</span>
                <span className="font-medium text-red-600">
                  {formatCurrency(scorecardData?.weeklyExpenses)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="font-medium text-foreground">Net Flow:</span>
                <span className="font-semibold text-primary">
                  {formatCurrency(scorecardData?.weeklyIncome - scorecardData?.weeklyExpenses)}
                </span>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Lightbulb" size={16} className="text-accent" />
              <span className="font-medium text-foreground">Key Insights</span>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Icon name="CheckCircle" size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Income increased by 15.7% this week</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="CheckCircle" size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Expenses decreased by 2.8%</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="AlertCircle" size={14} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                <span>3 invoices are overdue by 90+ days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHealthScorecard;