import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ReportFilters = ({ onFiltersChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    clientFilter: activeFilters?.clientFilter || '',
    metricType: activeFilters?.metricType || 'all',
    customDateFrom: activeFilters?.customDateFrom || '',
    customDateTo: activeFilters?.customDateTo || '',
    invoiceStatus: activeFilters?.invoiceStatus || 'all',
    amountRange: activeFilters?.amountRange || 'all'
  });

  const clientOptions = [
    { value: '', label: 'All Clients' },
    { value: 'acme-corp', label: 'Acme Corporation' },
    { value: 'tech-solutions', label: 'Tech Solutions Inc.' },
    { value: 'design-studio', label: 'Creative Design Studio' },
    { value: 'consulting-group', label: 'Business Consulting Group' },
    { value: 'retail-chain', label: 'Retail Chain LLC' }
  ];

  const metricTypeOptions = [
    { value: 'all', label: 'All Metrics' },
    { value: 'cash-flow', label: 'Cash Flow Only' },
    { value: 'invoices', label: 'Invoice Metrics' },
    { value: 'expenses', label: 'Expense Metrics' },
    { value: 'revenue', label: 'Revenue Metrics' }
  ];

  const invoiceStatusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const amountRangeOptions = [
    { value: 'all', label: 'All Amounts' },
    { value: '0-1000', label: '$0 - $1,000' },
    { value: '1000-5000', label: '$1,000 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000+', label: '$10,000+' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      clientFilter: '',
      metricType: 'all',
      customDateFrom: '',
      customDateTo: '',
      invoiceStatus: 'all',
      amountRange: 'all'
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value !== '' && value !== 'all'
  );

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <span className="font-medium text-foreground">Filters</span>
          {hasActiveFilters && (
            <div className="flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs">
              <Icon name="Check" size={12} />
              <span>Active</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={handleReset}
            >
              Reset
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide' : 'Show'} Filters
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Client Filter */}
            <Select
              label="Client"
              options={clientOptions}
              value={filters?.clientFilter}
              onChange={(value) => handleFilterChange('clientFilter', value)}
              placeholder="Select client"
            />

            {/* Metric Type */}
            <Select
              label="Metric Type"
              options={metricTypeOptions}
              value={filters?.metricType}
              onChange={(value) => handleFilterChange('metricType', value)}
            />

            {/* Invoice Status */}
            <Select
              label="Invoice Status"
              options={invoiceStatusOptions}
              value={filters?.invoiceStatus}
              onChange={(value) => handleFilterChange('invoiceStatus', value)}
            />

            {/* Amount Range */}
            <Select
              label="Amount Range"
              options={amountRangeOptions}
              value={filters?.amountRange}
              onChange={(value) => handleFilterChange('amountRange', value)}
            />

            {/* Custom Date From */}
            <Input
              label="From Date"
              type="date"
              value={filters?.customDateFrom}
              onChange={(e) => handleFilterChange('customDateFrom', e?.target?.value)}
            />

            {/* Custom Date To */}
            <Input
              label="To Date"
              type="date"
              value={filters?.customDateTo}
              onChange={(e) => handleFilterChange('customDateTo', e?.target?.value)}
            />
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground mr-2">Quick filters:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('invoiceStatus', 'overdue')}
            >
              Overdue Only
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('amountRange', '10000+')}
            >
              High Value
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo?.setDate(thirtyDaysAgo?.getDate() - 30);
                handleFilterChange('customDateFrom', thirtyDaysAgo?.toISOString()?.split('T')?.[0]);
              }}
            >
              Last 30 Days
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportFilters;