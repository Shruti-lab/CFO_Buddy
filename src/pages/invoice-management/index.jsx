import React, { useState, useEffect, useMemo } from 'react';
import TopNavigation from '../../components/ui/TopNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import InvoiceHeader from './components/InvoiceHeader';
import InvoiceFilters from './components/InvoiceFilters';
import InvoiceTable from './components/InvoiceTable';
import AddInvoiceModal from './components/AddInvoiceModal';

const InvoiceManagement = () => {
  // Mock invoice data
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      client: "Acme Corporation",
      amount: 5250.00,
      dueDate: "2025-01-15",
      status: "overdue",
      description: "Website redesign project - Phase 1",
      createdAt: "2024-12-01T10:00:00Z"
    },
    {
      id: 2,
      client: "TechStart Solutions",
      amount: 3200.00,
      dueDate: "2025-01-20",
      status: "pending",
      description: "Mobile app development consultation",
      createdAt: "2024-12-15T14:30:00Z"
    },
    {
      id: 3,
      client: "Global Industries",
      amount: 8750.00,
      dueDate: "2025-01-25",
      status: "pending",
      description: "Enterprise software integration",
      createdAt: "2024-12-20T09:15:00Z"
    },
    {
      id: 4,
      client: "Creative Agency",
      amount: 2100.00,
      dueDate: "2024-12-28",
      status: "paid",
      description: "Brand identity design package",
      createdAt: "2024-11-30T16:45:00Z"
    },
    {
      id: 5,
      client: "StartupXYZ",
      amount: 4500.00,
      dueDate: "2025-02-01",
      status: "pending",
      description: "MVP development and testing",
      createdAt: "2025-01-02T11:20:00Z"
    },
    {
      id: 6,
      client: "RetailCorp",
      amount: 1850.00,
      dueDate: "2024-12-30",
      status: "overdue",
      description: "E-commerce platform optimization",
      createdAt: "2024-11-25T13:10:00Z"
    }
  ]);

  const [filters, setFilters] = useState({
    status: 'all',
    sortBy: 'dueDate',
    fromDate: '',
    toDate: '',
    search: ''
  });

  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  // Auto-update overdue status
  useEffect(() => {
    const updateOverdueStatus = () => {
      const today = new Date();
      today?.setHours(0, 0, 0, 0);

      setInvoices(prevInvoices => 
        prevInvoices?.map(invoice => {
          if (invoice?.status === 'pending') {
            const dueDate = new Date(invoice.dueDate);
            dueDate?.setHours(0, 0, 0, 0);
            
            if (dueDate < today) {
              return { ...invoice, status: 'overdue' };
            }
          }
          return invoice;
        })
      );
    };

    updateOverdueStatus();
    const interval = setInterval(updateOverdueStatus, 24 * 60 * 60 * 1000); // Check daily

    return () => clearInterval(interval);
  }, []);

  // Filter and sort invoices
  const filteredInvoices = useMemo(() => {
    let filtered = [...invoices];

    // Apply status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(invoice => invoice?.status === filters?.status);
    }

    // Apply date range filter
    if (filters?.fromDate) {
      filtered = filtered?.filter(invoice => 
        new Date(invoice.dueDate) >= new Date(filters.fromDate)
      );
    }
    if (filters?.toDate) {
      filtered = filtered?.filter(invoice => 
        new Date(invoice.dueDate) <= new Date(filters.toDate)
      );
    }

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(invoice =>
        invoice?.client?.toLowerCase()?.includes(searchTerm) ||
        invoice?.amount?.toString()?.includes(searchTerm) ||
        (invoice?.description && invoice?.description?.toLowerCase()?.includes(searchTerm))
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'client':
          return a?.client?.localeCompare(b?.client);
        case 'amount':
          return b?.amount - a?.amount;
        case 'dueDate':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    return filtered;
  }, [invoices, filters]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const pending = invoices?.filter(inv => inv?.status === 'pending');
    const overdue = invoices?.filter(inv => inv?.status === 'overdue');
    
    const totalPending = [...pending, ...overdue]?.reduce((sum, inv) => sum + inv?.amount, 0);
    const overdueCount = overdue?.length;

    return { totalPending, overdueCount };
  }, [invoices]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleSelectInvoice = (invoiceId, isSelected) => {
    setSelectedInvoices(prev => 
      isSelected 
        ? [...prev, invoiceId]
        : prev?.filter(id => id !== invoiceId)
    );
  };

  const handleSelectAll = (isSelected) => {
    setSelectedInvoices(isSelected ? filteredInvoices?.map(inv => inv?.id) : []);
  };

  const handleAddInvoice = () => {
    setEditingInvoice(null);
    setIsAddModalOpen(true);
  };

  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice);
    setIsAddModalOpen(true);
  };

  const handleSaveInvoice = async (invoiceData) => {
    if (editingInvoice) {
      // Update existing invoice
      setInvoices(prev => 
        prev?.map(inv => 
          inv?.id === editingInvoice?.id ? { ...inv, ...invoiceData } : inv
        )
      );
    } else {
      // Add new invoice
      setInvoices(prev => [...prev, invoiceData]);
    }
  };

  const handleMarkPaid = (invoiceId) => {
    setInvoices(prev => 
      prev?.map(inv => 
        inv?.id === invoiceId ? { ...inv, status: 'paid' } : inv
      )
    );
    
    // Show success notification (in real app)
    console.log('Invoice marked as paid');
  };

  const handleSendReminder = (invoiceId) => {
    const invoice = invoices?.find(inv => inv?.id === invoiceId);
    if (invoice) {
      console.log(`Sending reminder for invoice to ${invoice?.client}`);
      // In real app: integrate with email service
    }
  };

  const handleBulkAction = (actionId) => {
    switch (actionId) {
      case 'markPaid':
        setInvoices(prev => 
          prev?.map(inv => 
            selectedInvoices?.includes(inv?.id) ? { ...inv, status: 'paid' } : inv
          )
        );
        setSelectedInvoices([]);
        console.log('Bulk marked as paid');
        break;
      
      case 'sendReminders':
        const selectedInvoiceData = invoices?.filter(inv => selectedInvoices?.includes(inv?.id));
        selectedInvoiceData?.forEach(invoice => {
          console.log(`Sending reminder to ${invoice?.client}`);
        });
        console.log('Bulk reminders sent');
        break;
      
      case 'export':
        console.log('Exporting selected invoices');
        break;
      
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedInvoices?.length} invoice${selectedInvoices?.length !== 1 ? 's' : ''}?`)) {
          setInvoices(prev => prev?.filter(inv => !selectedInvoices?.includes(inv?.id)));
          setSelectedInvoices([]);
          console.log('Bulk deleted');
        }
        break;
      
      default:
        console.log('Unknown bulk action:', actionId);
    }
  };

  const handleExport = () => {
    console.log('Exporting all invoices');
    // In real app: generate CSV/PDF export
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbTrail />
        
        <InvoiceHeader
          totalPending={summaryStats?.totalPending}
          overdueCount={summaryStats?.overdueCount}
          onAddInvoice={handleAddInvoice}
        />

        <InvoiceFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onSearch={handleSearch}
          onExport={handleExport}
        />

        <InvoiceTable
          invoices={filteredInvoices}
          selectedInvoices={selectedInvoices}
          onSelectInvoice={handleSelectInvoice}
          onSelectAll={handleSelectAll}
          onEditInvoice={handleEditInvoice}
          onMarkPaid={handleMarkPaid}
          onSendReminder={handleSendReminder}
          onBulkAction={handleBulkAction}
        />

        <AddInvoiceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveInvoice}
          editingInvoice={editingInvoice}
        />
      </div>
    </div>
  );
};

export default InvoiceManagement;