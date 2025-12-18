import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, Send } from 'lucide-react';
import StepSidebar from './components/shared/StepSidebar';
import Navigation from './components/shared/Navigation';

// Import wizard steps
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

// Import new pages
import LandingPage from './components/pages/LandingPage';
import VPDashboard from './components/pages/VPDashboard';
import AuditorDashboard from './components/pages/AuditorDashboard';
import ProjectSetupWizard from './components/pages/ProjectSetupWizard';
import ProjectDashboard from './components/pages/ProjectDashboard';

// Import data and utilities
import { MOCK_DEPARTMENTS } from './data/mockDepartments';
import { exportDivisionToPDF } from './utils/pdfExporter';

const TOTAL_STEPS = 13;

const STEP_INFO = {
  1: "Your department name and basic details help identify your team in the organization. Think of this as your team's nameplate.",
  2: "Your purpose statement is your team's reason for existing. It answers: \"Why are we here?\" Keep it simple and honest - no buzzwords needed.",
  3: "Your services are what you deliver to others. Each service should be something that someone requests or depends on. Examples: \"Monthly Financial Reports,\" \"Payroll Processing,\" \"IT Support Tickets.\"",
  4: "Stakeholders are the people and teams you interact with. This includes customers (who use your services), partners (who you work with), suppliers (who provide to you), and leadership (who you report to).",
  5: "The value chain shows how your team creates value. Inputs = what you receive, Activities = what you do, Outputs = what you deliver.",
  6: "SLAs are your commitments to customers. They set clear expectations about speed and quality. Example: \"We'll respond to IT tickets within 4 hours\" or \"Invoices processed within 2 days.\"",
  7: "KPIs are the vital signs of your team. They tell you if you're healthy and performing well. Pick 3-7 metrics that really matter - not everything you could measure, just what you should measure.",
  8: "RACI stands for: R = Responsible (does the work), A = Accountable (approves, one only!), C = Consulted (input needed before), I = Informed (told after).",
  9: "Governance is about how your team makes decisions and stays aligned. This includes regular meetings, who decides what, and how problems get escalated.",
  10: "Dependencies are things you need but don't control. If they fail, your work stops or slows down. This could be IT systems, data from other teams, external suppliers, or specific people.",
  11: "Risks are potential problems that haven't happened yet (or happen sometimes). Pain points are current problems you're dealing with. Being honest about these helps you plan mitigations and improvements.",
  12: "Opportunities are ways to improve your team's performance, efficiency, or quality. These could be process improvements, automation ideas, new tools, training needs, or restructuring work."
};

// Initial TOM data structure
const getInitialTOMData = () => ({
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
  },
  workflow: {
    id: `tom-${Date.now()}`,
    status: 'draft',
    submittedAt: null,
    submittedBy: null,
    reviewedAt: null,
    reviewedBy: null,
    approvedAt: null,
    approvedBy: null
  },
  reviews: []
});

function App() {
  // Navigation state
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'project-setup' | 'project-dashboard' | 'wizard' | 'auditor' | 'vp-dashboard'

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [tomData, setTomData] = useState(getInitialTOMData());

  // Mock departments state (for demo - in production this would come from API)
  const [departments, setDepartments] = useState(MOCK_DEPARTMENTS);

  // Project state (for team collaboration)
  const [project, setProject] = useState(null);

  // Load project from localStorage
  useEffect(() => {
    const savedProject = localStorage.getItem('tomProject');
    if (savedProject) {
      try {
        setProject(JSON.parse(savedProject));
      } catch (e) {
        console.error('Error loading project:', e);
      }
    }
  }, []);

  // Save project to localStorage
  useEffect(() => {
    if (project) {
      localStorage.setItem('tomProject', JSON.stringify(project));
    }
  }, [project]);

  // Auto-save TOM data to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('tomBuilderData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Merge with defaults to ensure all fields exist
        setTomData(prev => ({
          ...getInitialTOMData(),
          ...parsed,
          workflow: { ...getInitialTOMData().workflow, ...parsed.workflow },
          reviews: parsed.reviews || []
        }));
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tomBuilderData', JSON.stringify(tomData));
  }, [tomData]);

  // Navigation handlers
  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Wizard navigation
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

  const handleStepChange = (stepNumber) => {
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      setTomData(getInitialTOMData());
      setCurrentStep(1);
    }
  };

  // Submit TOM for review
  const handleSubmitForReview = () => {
    if (!tomData.department?.name) {
      alert('Please enter a department name before submitting.');
      return;
    }

    const submitterName = prompt('Enter your name for the submission:');
    if (!submitterName) return;

    if (confirm('Submit this TOM for review? You can still make edits after submission.')) {
      const submittedAt = new Date().toISOString();
      const workflowId = tomData.workflow?.id || `tom-${Date.now()}`;

      // Update local TOM data
      const updatedTomData = {
        ...tomData,
        workflow: {
          ...tomData.workflow,
          id: workflowId,
          status: 'submitted',
          submittedAt: submittedAt,
          submittedBy: { name: submitterName, email: '' }
        }
      };
      setTomData(updatedTomData);

      // Add/update in departments list so it appears in review queue
      setDepartments(prev => {
        const existingIndex = prev.findIndex(d => d.id === workflowId);
        const newDept = {
          id: workflowId,
          name: tomData.department.name,
          division: tomData.department.division || 'User Submission',
          headcount: tomData.department.headcount || 0,
          workflowStatus: 'submitted',
          submittedAt: submittedAt,
          submittedBy: submitterName,
          completeness: calculateCompleteness(tomData),
          lastUpdated: submittedAt,
          tomData: updatedTomData
        };

        if (existingIndex >= 0) {
          // Update existing
          const updated = [...prev];
          updated[existingIndex] = newDept;
          return updated;
        } else {
          // Add new
          return [...prev, newDept];
        }
      });

      alert('TOM submitted for review successfully! You can track its status in "My Submissions".');
    }
  };

  // Calculate completeness percentage
  const calculateCompleteness = (data) => {
    const sections = ['department', 'purpose', 'serviceCatalogue', 'stakeholders', 'valueChain', 'slas', 'kpis', 'raci', 'governance', 'dependencies', 'risks', 'opportunities'];
    let complete = 0;
    sections.forEach(key => {
      const val = data[key];
      if (val) {
        if (Array.isArray(val) && val.length > 0) complete++;
        else if (typeof val === 'object' && Object.values(val).some(v => v && v.length > 0)) complete++;
      }
    });
    return Math.round((complete / 12) * 100);
  };

  // Update department status (for auditor actions)
  const handleUpdateDepartmentStatus = (deptId, newStatus, comment = null, sectionComments = null) => {
    const reviewEntry = {
      id: `rev-${Date.now()}`,
      reviewerName: 'OpEx Reviewer',
      reviewerRole: 'auditor',
      comment: comment || '',
      sectionComments: sectionComments || {},
      status: newStatus === 'approved' ? 'approved' : 'request_change',
      createdAt: new Date().toISOString()
    };

    setDepartments(prev => prev.map(dept => {
      if (dept.id !== deptId) return dept;

      const updated = {
        ...dept,
        workflowStatus: newStatus,
        lastUpdated: new Date().toISOString()
      };

      // Add review to tomData
      if (dept.tomData) {
        updated.tomData = {
          ...dept.tomData,
          workflow: {
            ...dept.tomData.workflow,
            status: newStatus
          },
          reviews: [
            ...(dept.tomData.reviews || []),
            reviewEntry
          ]
        };
      }

      return updated;
    }));

    // Also sync to user's local TOM if this is their submission
    if (tomData.workflow?.id === deptId) {
      setTomData(prev => ({
        ...prev,
        workflow: {
          ...prev.workflow,
          status: newStatus
        },
        reviews: [
          ...(prev.reviews || []),
          reviewEntry
        ]
      }));
    }

    // Sync to project if this is the project's submission
    if (project?.id === deptId) {
      setProject(prev => ({
        ...prev,
        status: newStatus,
        activityLog: [
          ...(prev.activityLog || []),
          {
            id: `act-${Date.now()}`,
            type: newStatus === 'approved' ? 'approved' : 'revision_requested',
            message: newStatus === 'approved'
              ? 'TOM approved by OpEx'
              : `OpEx requested revisions: ${comment || 'See section comments'}`,
            timestamp: new Date().toISOString()
          }
        ]
      }));
    }
  };

  // PDF Export handler
  const handleExportPDF = (depts) => {
    exportDivisionToPDF(depts || departments);
  };

  // Reset demo - clear all data
  const handleResetDemo = () => {
    if (confirm('Reset all demo data? This will clear your project, TOM data, and all submissions.')) {
      localStorage.removeItem('tomProject');
      localStorage.removeItem('tomBuilderData');
      setProject(null);
      setTomData(getInitialTOMData());
      setDepartments(MOCK_DEPARTMENTS);
      setCurrentStep(1);
      setCurrentView('landing');
      alert('Demo reset complete! You can start fresh.');
    }
  };

  // Project creation handler
  const handleProjectCreate = (projectData) => {
    const newProject = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'in_progress',
      activityLog: [
        {
          id: `act-${Date.now()}`,
          type: 'project_created',
          message: `Project created by ${projectData.hod.name}`,
          timestamp: new Date().toISOString()
        }
      ]
    };
    setProject(newProject);

    // Initialize TOM data with project department info
    setTomData(prev => ({
      ...prev,
      department: {
        name: projectData.department.name,
        division: projectData.department.division,
        headcount: projectData.teamMembers.length + 1
      }
    }));

    handleNavigate('project-dashboard');
  };

  // Add activity to project
  const addProjectActivity = (message) => {
    if (!project) return;
    setProject(prev => ({
      ...prev,
      activityLog: [
        ...(prev.activityLog || []),
        {
          id: `act-${Date.now()}`,
          type: 'activity',
          message,
          timestamp: new Date().toISOString()
        }
      ]
    }));
  };

  // Submit project to OpEx review
  const handleProjectSubmitToOpEx = () => {
    if (!project) return;

    const submittedAt = new Date().toISOString();

    // Update project status
    setProject(prev => ({
      ...prev,
      status: 'submitted',
      submittedAt
    }));

    // Add to activity log
    addProjectActivity(`TOM submitted for OpEx review by ${project.hod.name}`);

    // Update TOM workflow
    setTomData(prev => ({
      ...prev,
      workflow: {
        ...prev.workflow,
        status: 'submitted',
        submittedAt,
        submittedBy: project.hod
      }
    }));

    // Add to departments list for OpEx review queue
    const newDept = {
      id: project.id,
      name: project.department.name,
      division: project.department.division,
      headcount: project.teamMembers.length + 1,
      workflowStatus: 'submitted',
      submittedAt,
      submittedBy: project.hod.name,
      completeness: calculateCompleteness(tomData),
      lastUpdated: submittedAt,
      tomData: tomData
    };

    setDepartments(prev => {
      const existingIndex = prev.findIndex(d => d.id === project.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newDept;
        return updated;
      }
      return [...prev, newDept];
    });

    alert('TOM submitted to OpEx for review!');
  };

  // Render wizard step
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

  // Render Landing Page (no navigation header)
  if (currentView === 'landing') {
    return <LandingPage onNavigate={handleNavigate} hasProject={!!project} onResetDemo={handleResetDemo} />;
  }

  // Render Project Setup Wizard
  if (currentView === 'project-setup') {
    return (
      <div className="min-h-screen bg-ekfc-cream">
        <Navigation currentView={currentView} onNavigate={handleNavigate} />
        <ProjectSetupWizard
          onComplete={handleProjectCreate}
          onCancel={() => handleNavigate('landing')}
        />
      </div>
    );
  }

  // Render Project Dashboard
  if (currentView === 'project-dashboard') {
    return (
      <div className="min-h-screen bg-ekfc-cream">
        <Navigation currentView={currentView} onNavigate={handleNavigate} />
        <ProjectDashboard
          project={project}
          tomData={tomData}
          currentUser="hod"
          onEnterBuilder={() => handleNavigate('wizard')}
          onSubmitForReview={handleProjectSubmitToOpEx}
          onNavigateHome={() => handleNavigate('landing')}
        />
      </div>
    );
  }

  // Render VP Dashboard
  if (currentView === 'vp-dashboard') {
    return (
      <div className="min-h-screen bg-ekfc-cream">
        <Navigation currentView={currentView} onNavigate={handleNavigate} />
        <VPDashboard
          departments={departments}
          onExportPDF={handleExportPDF}
        />
      </div>
    );
  }

  // Render Auditor Dashboard
  if (currentView === 'auditor') {
    return (
      <div className="min-h-screen bg-ekfc-cream">
        <Navigation currentView={currentView} onNavigate={handleNavigate} />
        <AuditorDashboard
          departments={departments}
          onUpdateStatus={handleUpdateDepartmentStatus}
        />
      </div>
    );
  }

  // Render Wizard (default)
  return (
    <div className="min-h-screen bg-ekfc-cream">
      <Navigation currentView={currentView} onNavigate={handleNavigate} />

      {/* Wizard Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Build Your TOM</h2>
              <p className="text-sm text-gray-600">Step {currentStep} of {TOTAL_STEPS}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Workflow Status Badge */}
              {tomData.workflow?.status && tomData.workflow.status !== 'draft' && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  tomData.workflow.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                  tomData.workflow.status === 'approved' ? 'bg-green-100 text-green-700' :
                  tomData.workflow.status === 'needs_revision' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {tomData.workflow.status === 'submitted' ? 'Submitted' :
                   tomData.workflow.status === 'approved' ? 'Approved' :
                   tomData.workflow.status === 'needs_revision' ? 'Needs Revision' :
                   tomData.workflow.status}
                </span>
              )}
              <button
                onClick={handleStartOver}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-ekfc-red transition-colors"
              >
                <Home className="w-4 h-4" />
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Main Content */}
          <div className="flex-1 min-w-0">
            {/* Step Content */}
            <div className="card mb-6">
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

              <div className="flex items-center gap-3">
                {/* Submit for Review Button (show on last step) */}
                {currentStep === TOTAL_STEPS && tomData.workflow?.status === 'draft' && (
                  <button
                    onClick={handleSubmitForReview}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Submit for Review
                  </button>
                )}

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
                    You've completed the wizard!
                  </div>
                )}
              </div>
            </div>

            {/* Auto-save indicator */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Your progress is automatically saved to your browser
              </p>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <StepSidebar
                currentStep={currentStep}
                infoContent={STEP_INFO[currentStep]}
                onStepChange={handleStepChange}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-600">
          <p>TOM Builder - Target Operating Model Wizard</p>
          <p className="mt-1">Built to help teams define their Target Operating Model with clarity and simplicity</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
