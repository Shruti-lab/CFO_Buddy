import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import TopNavigation from '../../components/ui/TopNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import CashRunwayGauge from './components/CashRunwayGauge';
import InvoicePanel from './components/InvoicePanel';
import BusinessHealthSummary from './components/BusinessHealthSummary';
import QuickInvoiceModal from './components/QuickInvoiceModal';
import FloatingActionButton from './components/FloatingActionButton';

const Dashboard = () => {
  const [isQuickInvoiceOpen, setIsQuickInvoiceOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    currentCash: 0,
    burnRate: 0,
    daysRemaining: 0,
    healthStatus: 'healthy'
  });

  // Mock data initialization
  useEffect(() => {
    const mockInvoices = [
      {
        id: 1,
        clientName: "Acme Corporation",
        invoiceNumber: "INV-2025-001",
        amount: 15000,
        dueDate: "2025-01-15",
        status: "pending",
        createdDate: "2024-12-20"
      },
      {
        id: 2,
        clientName: "TechStart Solutions",
        invoiceNumber: "INV-2025-002",
        amount: 8500,
        dueDate: "2024-12-28",
        status: "overdue",
        createdDate: "2024-11-28"
      },
      {
        id: 3,
        clientName: "Global Industries",
        invoiceNumber: "INV-2025-003",
        amount: 22000,
        dueDate: "2025-01-20",
        status: "pending",
        createdDate: "2024-12-25"
      },
      {
        id: 4,
        clientName: "Digital Marketing Pro",
        invoiceNumber: "INV-2024-089",
        amount: 5500,
        dueDate: "2024-12-15",
        status: "paid",
        createdDate: "2024-11-15"
      },
      {
        id: 5,
        clientName: "StartupHub Inc",
        invoiceNumber: "INV-2024-090",
        amount: 12000,
        dueDate: "2024-12-20",
        status: "paid",
        createdDate: "2024-11-20"
      },
      {
        id: 6,
        clientName: "Enterprise Solutions",
        invoiceNumber: "INV-2025-004",
        amount: 18500,
        dueDate: "2024-12-30",
        status: "overdue",
        createdDate: "2024-11-30"
      }
    ];

    const mockDashboardData = {
      currentCash: 125000,
      burnRate: 18500,
      daysRemaining: 67,
      healthStatus: 'warning'
    };

    setInvoices(mockInvoices);
    setDashboardData(mockDashboardData);
  }, []);

  const handleQuickInvoiceSubmit = async (invoiceData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newInvoice = {
      ...invoiceData,
      id: Date.now(),
      createdDate: new Date()?.toISOString()
    };

    setInvoices(prev => [newInvoice, ...prev]);
  };

  const weeklyData = {
    cashIn: 35000,
    cashOut: 28500,
    netFlow: 6500,
    outstanding: 42000
  };

  const trends = {
    cashInTrend: 12.5,
    cashOutTrend: -8.2,
    netFlowTrend: 24.8,
    outstandingTrend: -5.1
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - CFO Buddy</title>
        <meta name="description" content="Financial dashboard providing cash flow insights, invoice management, and business health monitoring for small businesses." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <TopNavigation />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbTrail />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's your financial overview for today, {new Date()?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Top Section - Cash Runway */}
          <div className="mb-8">
            <CashRunwayGauge
              daysRemaining={dashboardData?.daysRemaining}
              currentCash={dashboardData?.currentCash}
              burnRate={dashboardData?.burnRate}
              healthStatus={dashboardData?.healthStatus}
            />
          </div>

          {/* Middle Section - Invoice Management */}
          <div className="mb-8">
            <InvoicePanel
              invoices={invoices}
              onQuickAdd={() => setIsQuickInvoiceOpen(true)}
            />
          </div>

          {/* Bottom Section - Business Health Summary */}
          <div className="mb-8">
            <BusinessHealthSummary
              weeklyData={weeklyData}
              trends={trends}
            />
          </div>
        </main>

        {/* Quick Invoice Modal */}
        <QuickInvoiceModal
          isOpen={isQuickInvoiceOpen}
          onClose={() => setIsQuickInvoiceOpen(false)}
          onSubmit={handleQuickInvoiceSubmit}
        />

        {/* Floating Action Button (Mobile) */}
        <FloatingActionButton
          onClick={() => setIsQuickInvoiceOpen(true)}
        />
      </div>
    </>
  );
};

export default Dashboard;