import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import ProgressBar from './components/shared/ProgressBar';

// Import all wizard steps
import Step1Department from './components/WizardSteps/Step1Department';
import Step2Purpose from './components/WizardSteps/Step2Purpose';
import Step3Services from './components/WizardSteps/Step3Services';
import Step4Stakeholders from './components/WizardSteps/Step4Stakeholders';
import Step5ValueChain from './components/WizardSteps/Step5ValueChain';
import Step6SLAs from './components/WizardSteps/Step6SLAs';
import Step7KPIs from './components/WizardSteps/Step7KPIs';
import Step8RACI from './components/WizardSteps/Step8RACI';
import Step9Governance from './components/WizardSteps/Step9Governance';
import Step10Dependencies from './components/WizardSteps/Step10Dependencies';
import Step11Risks from './components/WizardSteps/Step11Risks';
import Step12Opportunities from './components/WizardSteps/Step12Opportunities';
import Step13Summary from './components/WizardSteps/Step13Summary';

const TOTAL_STEPS = 13;

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [tomData, setTomData] = useState({
    department: { name: '', division: '', headcount: 0 },
    purpose: { statement: '', vision: '', mission: '' },
    serviceCatalogue: [],
    stakeholders: [],
    valueChain: { inputs: [], activities: [], outputs: [] },
    slas: [],
    kpis: [],
    raci: [],
    governance: { forums: [], escalationPath: '', decisionRights: '' },
    dependencies: [],
    risks: [],
    opportunities: [],
    metadata: {
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      version: '1.0',
      author: 'TOM Builder Wizard'
    }
  });

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('tomBuilderData');
    if (savedData) {
      try {
        setTomData(JSON.parse(savedData));
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tomBuilderData', JSON.stringify(tomData));
  }, [tomData]);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDataChange = (field, value) => {
    setTomData(prev => ({
      ...prev,
      [field]: value,
      metadata: {
        ...prev.metadata,
        lastModified: new Date().toISOString()
      }
    }));
  };

  const handleStartOver = () => {
    if (confirm('Are you sure? This will clear all your data and start from scratch.')) {
      localStorage.removeItem('tomBuilderData');
      setTomData({
        department: { name: '', division: '', headcount: 0 },
        purpose: { statement: '', vision: '', mission: '' },
        serviceCatalogue: [],
        stakeholders: [],
        valueChain: { inputs: [], activities: [], outputs: [] },
        slas: [],
        kpis: [],
        raci: [],
        governance: { forums: [], escalationPath: '', decisionRights: '' },
        dependencies: [],
        risks: [],
        opportunities: [],
        metadata: {
          createdDate: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          version: '1.0',
          author: 'TOM Builder Wizard'
        }
      });
      setCurrentStep(1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Department data={tomData.department} onChange={(data) => handleDataChange('department', data)} />;
      case 2:
        return <Step2Purpose data={tomData.purpose} onChange={(data) => handleDataChange('purpose', data)} />;
      case 3:
        return <Step3Services data={tomData.serviceCatalogue} onChange={(data) => handleDataChange('serviceCatalogue', data)} />;
      case 4:
        return <Step4Stakeholders data={tomData.stakeholders} onChange={(data) => handleDataChange('stakeholders', data)} />;
      case 5:
        return <Step5ValueChain data={tomData.valueChain} onChange={(data) => handleDataChange('valueChain', data)} />;
      case 6:
        return <Step6SLAs data={tomData.slas} onChange={(data) => handleDataChange('slas', data)} />;
      case 7:
        return <Step7KPIs data={tomData.kpis} onChange={(data) => handleDataChange('kpis', data)} />;
      case 8:
        return <Step8RACI data={tomData.raci} onChange={(data) => handleDataChange('raci', data)} />;
      case 9:
        return <Step9Governance data={tomData.governance} onChange={(data) => handleDataChange('governance', data)} />;
      case 10:
        return <Step10Dependencies data={tomData.dependencies} onChange={(data) => handleDataChange('dependencies', data)} />;
      case 11:
        return <Step11Risks data={tomData.risks} onChange={(data) => handleDataChange('risks', data)} />;
      case 12:
        return <Step12Opportunities data={tomData.opportunities} onChange={(data) => handleDataChange('opportunities', data)} />;
      case 13:
        return <Step13Summary data={tomData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TOM Builder Wizard</h1>
              <p className="text-sm text-gray-600">Build your Target Operating Model step by step</p>
            </div>
            <button
              onClick={handleStartOver}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <Home className="w-4 h-4" />
              Start Over
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Step Content */}
        <div className="card mb-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="btn-secondary flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep < TOTAL_STEPS ? (
            <button
              onClick={handleNext}
              className="btn-primary flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-sm text-gray-600 font-medium">
              You've completed the wizard! 🎉
            </div>
          )}
        </div>

        {/* Auto-save indicator */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            ✓ Your progress is automatically saved to your browser
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm text-gray-600">
          <p>TOM Builder Wizard for CSS (Culinary Shared Services)</p>
          <p className="mt-1">Built to help teams define their Target Operating Model with clarity and simplicity</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
