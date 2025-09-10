import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './components/ProgressBar';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import CompletionModal from './components/CompletionModal';

const SetupWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [setupData, setSetupData] = useState({
    cashPosition: '',
    fixedCosts: {},
    expectedIncome: {},
    pendingInvoices: []
  });
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const totalSteps = 4;

  useEffect(() => {
    // Check if setup is already complete
    const setupComplete = localStorage.getItem('cfobuddy_setup_complete');
    if (setupComplete === 'true') {
      navigate('/dashboard');
    }

    // Load any existing setup data
    const savedData = localStorage.getItem('cfobuddy_setup_data');
    if (savedData) {
      try {
        setSetupData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading setup data:', error);
      }
    }
  }, [navigate]);

  const handleStepUpdate = (stepData) => {
    const updatedData = { ...setupData, ...stepData };
    setSetupData(updatedData);
    
    // Save progress to localStorage
    localStorage.setItem('cfobuddy_setup_progress', JSON.stringify(updatedData));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Setup complete
      setShowCompletionModal(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            data={setupData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <StepTwo
            data={setupData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <StepThree
            data={setupData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <StepFour
            data={setupData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="py-8 px-4">
        {renderCurrentStep()}
      </div>

      <CompletionModal 
        isOpen={showCompletionModal}
        setupData={setupData}
      />
    </div>
  );
};

export default SetupWizard;