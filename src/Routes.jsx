import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import FinancialReports from './pages/financial-reports';
import SetupWizard from './pages/setup-wizard';
import Dashboard from './pages/dashboard';
import InvoiceManagement from './pages/invoice-management';
import Register from './pages/register';
import IntegrationSetup from './pages/integration-setup';

const Routes = () => {
  // Use the repository name as the basename for GitHub Pages
  const basename = process.env.NODE_ENV === 'production' ? '/cfo_buddy' : '';
  
  return (
    <BrowserRouter basename={basename}>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/financial-reports" element={<FinancialReports />} />
        <Route path="/setup-wizard" element={<SetupWizard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoice-management" element={<InvoiceManagement />} />
        <Route path="/register" element={<Register />} />
        <Route path="/integration-setup" element={<IntegrationSetup />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;