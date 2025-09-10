import React from 'react';
import { useNavigate } from 'react-router-dom';
import IntegrationHeader from './components/IntegrationHeader';
import ConnectionButtons from './components/ConnectionButtons';
import TrustSection from './components/TrustSection';

const IntegrationSetup = () => {
  const navigate = useNavigate();

  const handleBankConnect = () => {
    // Navigate to bank connection flow or show modal
    console.log('Connect bank account clicked');
    // For now, navigate to setup wizard as the next step
    navigate('/setup-wizard');
  };

  const handleAccountingConnect = () => {
    // Navigate to accounting tool connection flow or show modal
    console.log('Connect accounting tool clicked');
    // For now, navigate to setup wizard as the next step
    navigate('/setup-wizard');
  };

  const handleSkip = () => {
    // Navigate to setup wizard, skipping integrations for now
    navigate('/setup-wizard');
  };

  return (
    <div className="min-h-screen bg-teal-50" style={{ backgroundColor: '#F0FDFA' }}>
      {/* Success notification would be handled by a global toast/notification system */}
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Main Content */}
          <div className="space-y-8">
            <IntegrationHeader />
            
            <ConnectionButtons 
              onBankConnect={handleBankConnect}
              onAccountingConnect={handleAccountingConnect}
              onSkip={handleSkip}
            />
            
            <TrustSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSetup;