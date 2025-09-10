import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import TopNavigation from '../../components/ui/TopNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import ReportHeader from './components/ReportHeader';
import CashFlowChart from './components/CashFlowChart';
import InvoiceAgingReport from './components/InvoiceAgingReport';
import BusinessHealthScorecard from './components/BusinessHealthScorecard';
import ReportFilters from './components/ReportFilters';

const FinancialReports = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [reportFilters, setReportFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock cash flow data
  const generateCashFlowData = (range) => {
    const data = [];
    const today = new Date();
    let days = 30;
    
    switch (range) {
      case '7d': days = 7; break;
      case '30d': days = 30; break;
      case '90d': days = 90; break;
      case '6m': days = 180; break;
      case '1y': days = 365; break;
      default: days = 30;
    }

    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date?.setDate(date?.getDate() - i);
      
      const baseFlow = 50000 + Math.sin(i / 10) * 20000;
      const randomVariation = (Math.random() - 0.5) * 10000;
      const cashFlow = Math.max(0, baseFlow + randomVariation);
      
      const runway = Math.max(30, 120 - (i / days) * 30 + Math.sin(i / 5) * 15);
      
      data?.push({
        date: date?.toISOString()?.split('T')?.[0],
        cashFlow: Math.round(cashFlow),
        runway: Math.round(runway)
      });
    }
    
    return data;
  };

  const [cashFlowData, setCashFlowData] = useState(() => generateCashFlowData('30d'));

  // Mock invoice aging data
  const invoiceAgingData = {
    current: { amount: 45000, count: 12 },
    thirtyDays: { amount: 28000, count: 8 },
    sixtyDays: { amount: 15000, count: 5 },
    ninetyPlus: { amount: 8000, count: 3 }
  };

  // Mock business health data
  const businessHealthData = {
    overallScore: 75,
    cashPosition: 125000,
    burnRate: 15000,
    runway: 95,
    weeklyIncome: 28000,
    weeklyExpenses: 18500
  };

  useEffect(() => {
    setCashFlowData(generateCashFlowData(selectedDateRange));
  }, [selectedDateRange]);

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
  };

  const handleExport = async (format) => {
    setIsLoading(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (format === 'pdf') {
      console.log('Exporting PDF report...');
      // In real app: generate PDF with charts and data
    } else if (format === 'csv') {
      console.log('Exporting CSV data...');
      // In real app: generate CSV with raw data
    }
    
    setIsLoading(false);
  };

  const handleFiltersChange = (newFilters) => {
    setReportFilters(newFilters);
    console.log('Filters updated:', newFilters);
    // In real app: refetch data based on filters
  };

  return (
    <>
      <Helmet>
        <title>Financial Reports - CFO Buddy</title>
        <meta name="description" content="Comprehensive business health analysis and exportable financial summaries" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <TopNavigation />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbTrail />
          
          {/* Report Header */}
          <ReportHeader
            onDateRangeChange={handleDateRangeChange}
            onExport={handleExport}
            selectedRange={selectedDateRange}
          />

          {/* Report Filters */}
          <ReportFilters
            onFiltersChange={handleFiltersChange}
            activeFilters={reportFilters}
          />

          {/* Main Content */}
          <div className="space-y-8">
            {/* Cash Flow Trend Section */}
            <section>
              <CashFlowChart
                selectedRange={selectedDateRange}
              />
            </section>

            {/* Invoice Aging Section */}
            <section>
              <InvoiceAgingReport
                data={invoiceAgingData}
              />
            </section>

            {/* Business Health Section */}
            <section>
              <BusinessHealthScorecard
                data={businessHealthData}
              />
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Reports generated on {new Date()?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} CFO Buddy. All rights reserved.
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default FinancialReports;