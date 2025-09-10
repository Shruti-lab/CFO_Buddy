import React, { useState, useEffect } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import { supabase } from '../../../utils/supabase/client';

const CashFlowChart = ({ selectedRange }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCashFlowData() {
      try {
        setIsLoading(true);
        
        // Query based on selected range
        let query = supabase
          .from('cash_flow_forecast')
          .select('*')
          .order('date', { ascending: true });
          
        // Apply filter based on selectedRange
        if (selectedRange === '7d') {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          query = query.gte('date', sevenDaysAgo.toISOString().split('T')[0]);
        } else if (selectedRange === '30d') {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          query = query.gte('date', thirtyDaysAgo.toISOString().split('T')[0]);
        } else if (selectedRange === '90d') {
          const ninetyDaysAgo = new Date();
          ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
          query = query.gte('date', ninetyDaysAgo.toISOString().split('T')[0]);
        }
        
        const { data: cashFlowData, error: queryError } = await query;
        
        if (queryError) throw queryError;
        
        // Format data for chart
        const formattedData = cashFlowData.map(item => ({
          date: item.date,
          cashFlow: item.net_cash_flow,
          runway: item.runway_days
        }));
        
        setData(formattedData);
      } catch (err) {
        console.error('Error fetching cash flow data:', err);
        setError(err.message);
        
        // Fallback to mock data if needed
        setData([
          { date: '2025-08-01', cashFlow: 150000, runway: 90 },
          { date: '2025-08-15', cashFlow: 155000, runway: 92 },
          { date: '2025-09-01', cashFlow: 162000, runway: 95 }
        ]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCashFlowData();
  }, [selectedRange]);
  
  if (isLoading) return (
    <div className="bg-card rounded-lg border border-border p-6 flex justify-center items-center h-80">
      <p className="text-muted-foreground">Loading cash flow data...</p>
    </div>
  );
  
  if (error) return (
    <div className="bg-card rounded-lg border border-border p-6 flex justify-center items-center h-80">
      <p className="text-red-500">Error loading data: {error}</p>
    </div>
  );
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(value);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (selectedRange === '7d' || selectedRange === '30d') {
      return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return date?.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">
            {formatDate(label)}
          </p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-popover-foreground">
                {formatCurrency(entry?.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Calculate trend
  const currentValue = data?.[data?.length - 1]?.cashFlow || 0;
  const previousValue = data?.[data?.length - 2]?.cashFlow || 0;
  const trend = currentValue - previousValue;
  const trendPercentage = previousValue !== 0 ? ((trend / Math.abs(previousValue)) * 100) : 0;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Cash Flow Trend
          </h3>
          <p className="text-sm text-muted-foreground">
            Track your runway progression over time
          </p>
        </div>
        
        {/* Trend Indicator */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
            trend >= 0 
              ? 'bg-green-100 text-green-700' :'bg-red-100 text-red-700'
          }`}>
            <Icon 
              name={trend >= 0 ? 'TrendingUp' : 'TrendingDown'} 
              size={16} 
            />
            <span>{Math.abs(trendPercentage)?.toFixed(1)}%</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="cashFlowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="cashFlow"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#cashFlowGradient)"
              name="Cash Flow"
            />
            <Line
              type="monotone"
              dataKey="runway"
              stroke="var(--color-accent)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Runway Days"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Chart Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-sm text-muted-foreground">Cash Flow</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-accent rounded-full"></div>
          <span className="text-sm text-muted-foreground">Runway Days</span>
        </div>
      </div>
    </div>
  );
};

export default CashFlowChart;