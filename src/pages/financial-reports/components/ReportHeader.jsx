import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ReportHeader = ({ onDateRangeChange, onExport, selectedRange }) => {
  const [isExporting, setIsExporting] = useState(false);

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '1y', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      await onExport(format);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title and Description */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Financial Reports
          </h1>
          <p className="text-muted-foreground">
            Comprehensive business health analysis and exportable summaries
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Date Range Selector */}
          <div className="min-w-48">
            <Select
              placeholder="Select date range"
              options={dateRangeOptions}
              value={selectedRange}
              onChange={onDateRangeChange}
            />
          </div>

          {/* Export Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="FileText"
              iconPosition="left"
              loading={isExporting}
              onClick={() => handleExport('pdf')}
              className="whitespace-nowrap"
            >
              Export PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              loading={isExporting}
              onClick={() => handleExport('csv')}
              className="whitespace-nowrap"
            >
              Export CSV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;