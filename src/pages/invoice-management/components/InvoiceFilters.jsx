import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const InvoiceFilters = ({ filters, onFiltersChange, onSearch, onExport }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'amount', label: 'Amount' },
    { value: 'client', label: 'Client Name' },
    { value: 'created', label: 'Date Created' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-card border border-border rounded-lg mb-6 card-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search invoices by client, amount, or description..."
              value={filters?.search || ''}
              onChange={(e) => onSearch(e?.target?.value)}
              className="w-full"
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
            >
              <Icon name="Filter" size={16} />
              <span>Filters</span>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>

            <button
              onClick={onExport}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
            >
              <Icon name="Download" size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 bg-muted/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status || 'all'}
              onChange={(value) => handleFilterChange('status', value)}
            />

            <Select
              label="Sort By"
              options={sortOptions}
              value={filters?.sortBy || 'dueDate'}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />

            <Input
              label="From Date"
              type="date"
              value={filters?.fromDate || ''}
              onChange={(e) => handleFilterChange('fromDate', e?.target?.value)}
            />

            <Input
              label="To Date"
              type="date"
              value={filters?.toDate || ''}
              onChange={(e) => handleFilterChange('toDate', e?.target?.value)}
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => onFiltersChange({ status: 'all', sortBy: 'dueDate', fromDate: '', toDate: '', search: '' })}
              className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceFilters;