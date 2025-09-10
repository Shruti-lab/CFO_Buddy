import React from 'react';
import Button from '../../../components/ui/Button';

const ConnectionButtons = ({ onBankConnect, onAccountingConnect, onSkip }) => {
  return (
    <div className="space-y-6">
      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
        <Button
          onClick={onBankConnect}
          className="flex-1 h-16 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
          size="lg"
        >
          <span className="text-2xl mr-3">🏦</span>
          Connect Bank Account
        </Button>
        
        <Button
          onClick={onAccountingConnect}
          className="flex-1 h-16 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
          size="lg"
        >
          <span className="text-2xl mr-3">📊</span>
          Connect Accounting Tool
        </Button>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto text-sm text-gray-600">
        <div className="text-center">
          <div className="text-xs font-medium text-gray-500 mb-1">BANK CONNECTION</div>
          <div>Auto-sync transactions & balances</div>
        </div>
        <div className="text-center">
          <div className="text-xs font-medium text-gray-500 mb-1">ACCOUNTING SYNC</div>
          <div>Real-time invoice & expense tracking</div>
        </div>
      </div>

      {/* Skip Option */}
      <div className="mt-8">
        <button
          onClick={onSkip}
          className="text-gray-500 hover:text-gray-700 font-medium underline underline-offset-4 hover:no-underline transition-all duration-200"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default ConnectionButtons;