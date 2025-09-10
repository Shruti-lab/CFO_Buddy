import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InvoiceAgingReport = ({ data }) => {
  const [viewType, setViewType] = useState('bar'); // 'bar' or 'pie'

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(value);
  };

  const agingData = [
    { category: 'Current (0-30 days)', amount: 45000, count: 12, color: '#38A169' },
    { category: '31-60 days', amount: 28000, count: 8, color: '#D69E2E' },
    { category: '61-90 days', amount: 15000, count: 5, color: '#DD6B20' },
    { category: '90+ days', amount: 8000, count: 3, color: '#E53E3E' }
  ];

  const totalAmount = agingData?.reduce((sum, item) => sum + item?.amount, 0);
  const totalCount = agingData?.reduce((sum, item) => sum + item?.count, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">
            {label}
          </p>
          <div className="space-y-1">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium text-popover-foreground">
                {formatCurrency(data?.amount)}
              </span>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-muted-foreground">Invoices:</span>
              <span className="font-medium text-popover-foreground">
                {data?.count}
              </span>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-muted-foreground">Percentage:</span>
              <span className="font-medium text-popover-foreground">
                {((data?.amount / totalAmount) * 100)?.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">
            {data?.category}
          </p>
          <div className="space-y-1">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium text-popover-foreground">
                {formatCurrency(data?.amount)}
              </span>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-muted-foreground">Percentage:</span>
              <span className="font-medium text-popover-foreground">
                {((data?.amount / totalAmount) * 100)?.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Invoice Aging Report
          </h3>
          <p className="text-sm text-muted-foreground">
            Breakdown of pending invoices by age
          </p>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewType === 'bar' ? 'default' : 'outline'}
            size="sm"
            iconName="BarChart3"
            onClick={() => setViewType('bar')}
          >
            Bar Chart
          </Button>
          <Button
            variant={viewType === 'pie' ? 'default' : 'outline'}
            size="sm"
            iconName="PieChart"
            onClick={() => setViewType('pie')}
          >
            Pie Chart
          </Button>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {agingData?.map((item, index) => (
          <div key={index} className="bg-muted rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item?.color }}
              />
              <span className="text-xs font-medium text-muted-foreground">
                {item?.category?.split(' ')?.[0]}
              </span>
            </div>
            <div className="text-lg font-semibold text-foreground mb-1">
              {formatCurrency(item?.amount)}
            </div>
            <div className="text-sm text-muted-foreground">
              {item?.count} invoice{item?.count !== 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>
      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {viewType === 'bar' ? (
            <BarChart data={agingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="category" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tickFormatter={formatCurrency}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="amount" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={agingData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="amount"
                label={({ category, amount }) => 
                  `${category?.split(' ')?.[0]}: ${formatCurrency(amount)}`
                }
                labelLine={false}
              >
                {agingData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Summary Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-6 border-t border-border">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-sm text-muted-foreground">Total Outstanding:</span>
            <div className="text-lg font-semibold text-foreground">
              {formatCurrency(totalAmount)}
            </div>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Total Invoices:</span>
            <div className="text-lg font-semibold text-foreground">
              {totalCount}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Icon name="AlertTriangle" size={16} className="text-warning" />
          <span className="text-muted-foreground">
            {agingData?.[3]?.count} invoice{agingData?.[3]?.count !== 1 ? 's' : ''} overdue 90+ days
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceAgingReport;