import React from 'react';

const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background"></div>
      
      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-accent/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-40 right-10 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
    </div>
  );
};

export default BackgroundPattern;