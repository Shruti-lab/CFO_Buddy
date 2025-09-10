import React from 'react';

const TrustSection = () => {
  return (
    <div className="mt-16 space-y-6">
      {/* Security Assurance */}
      <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-2 text-teal-700">
            <span className="text-2xl">🔒</span>
            <span className="font-semibold">Bank-Level Security</span>
          </div>
        </div>
        
        <p className="text-center text-gray-700 font-medium mb-6">
          Your data is secure. You're always in control of what you share.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-3xl">🛡️</div>
            <div className="text-sm font-medium text-gray-800">256-bit Encryption</div>
            <div className="text-xs text-gray-600">Same security banks use</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl">🔐</div>
            <div className="text-sm font-medium text-gray-800">Read-Only Access</div>
            <div className="text-xs text-gray-600">We never touch your money</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl">✅</div>
            <div className="text-sm font-medium text-gray-800">You Control Data</div>
            <div className="text-xs text-gray-600">Disconnect anytime</div>
          </div>
        </div>
      </div>

      {/* Quick Benefits */}
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-3">
          Join 10,000+ small businesses who automated their cash flow tracking
        </p>
        <div className="flex items-center justify-center space-x-8 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>5-minute setup</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            <span>No spreadsheets</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            <span>Real-time insights</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSection;