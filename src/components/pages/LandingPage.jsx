import React from 'react';
import { Plus, FolderOpen, ClipboardCheck, Eye, ArrowRight, Users, Shield, BarChart3, Rocket, RotateCcw } from 'lucide-react';

function LandingPage({ onNavigate, hasProject = false, onResetDemo }) {
  const ROLE_CARDS = [
    {
      id: 'project-setup',
      title: 'Start New Project',
      subtitle: 'TOM Owner / HOD',
      description: hasProject
        ? 'You already have an active project. Reset demo to start fresh.'
        : 'Create a new TOM mapping project for your CSS department.',
      icon: Plus,
      color: hasProject ? 'bg-gray-400' : 'bg-blue-500',
      features: ['Select CSS department', 'Add team members', 'Assign section ownership'],
      disabled: hasProject
    },
    {
      id: 'project-dashboard',
      title: 'My Project',
      subtitle: 'Team Collaboration',
      description: hasProject
        ? 'Continue working on your TOM project. View progress, activity, and enter the builder.'
        : 'No active project. Start a new project first.',
      icon: FolderOpen,
      color: hasProject ? 'bg-purple-500' : 'bg-gray-400',
      features: hasProject
        ? ['View team progress', 'Track activity feed', 'Enter TOM Builder']
        : ['Create a project first'],
      disabled: !hasProject
    },
    {
      id: 'auditor',
      title: 'OpEx Review',
      subtitle: 'Operational Excellence Team',
      description: 'Review and validate TOM submissions from departments. Approve or request revisions.',
      icon: ClipboardCheck,
      color: 'bg-amber-500',
      features: ['Review pending submissions', 'Add section comments', 'Approve or request changes']
    },
    {
      id: 'vp-dashboard',
      title: 'VP Dashboard',
      subtitle: 'Division Leadership',
      description: 'View all departments at a glance. Click any department to see full TOM details.',
      icon: Eye,
      color: 'bg-green-600',
      features: ['Division overview', 'Full TOM drill-down', 'Export reports to PDF']
    }
  ];

  return (
    <div className="min-h-screen bg-ekfc-cream">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-ekfc-red to-ekfc-darkred text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                TOM Builder
              </h1>
              <p className="text-lg text-red-100 mb-1">
                CSS - Culinary Shared Services
              </p>
              <p className="text-red-200 text-sm">
                Build, review, and manage Target Operating Models for your department.
              </p>
            </div>
            {/* Demo Reset Button */}
            {onResetDemo && (
              <button
                onClick={onResetDemo}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Demo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Role Selection Cards */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Get Started</h2>
        <p className="text-gray-600 text-sm mb-6">Choose your role or action to begin</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROLE_CARDS.map(card => {
            const Icon = card.icon;
            const isDisabled = card.disabled;

            return (
              <div
                key={card.id}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all ${
                  isDisabled ? 'opacity-60' : 'hover:shadow-md cursor-pointer group'
                }`}
                onClick={() => !isDisabled && onNavigate(card.id)}
              >
                {/* Card Header */}
                <div className={`${card.color} p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <Icon className="w-7 h-7" />
                    {!isDisabled && (
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold mt-2">{card.title}</h3>
                  <p className="text-xs opacity-90">{card.subtitle}</p>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <p className="text-gray-600 text-xs mb-2 leading-relaxed">{card.description}</p>
                  <ul className="space-y-1">
                    {card.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-1 h-1 bg-ekfc-gold rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer */}
                <div className="px-4 pb-4">
                  <button
                    disabled={isDisabled}
                    className={`w-full py-2 rounded-lg font-medium transition-colors text-xs ${
                      isDisabled
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 hover:bg-ekfc-red hover:text-white group-hover:bg-ekfc-red group-hover:text-white'
                    }`}
                  >
                    {isDisabled ? (card.id === 'project-setup' ? 'Project Exists' : 'No Project') : `Enter`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workflow Diagram */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">The TOM Journey</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-1">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center w-32">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <Rocket className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-xs mb-1">1. Create Project</h3>
              <p className="text-gray-500 text-[10px] leading-tight">Set up department & team</p>
            </div>

            <ArrowRight className="w-5 h-5 text-gray-300 hidden md:block flex-shrink-0" />

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center w-32">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-xs mb-1">2. Collaborate</h3>
              <p className="text-gray-500 text-[10px] leading-tight">Team works on sections</p>
            </div>

            <ArrowRight className="w-5 h-5 text-gray-300 hidden md:block flex-shrink-0" />

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center w-32">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <FolderOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-xs mb-1">3. Submit</h3>
              <p className="text-gray-500 text-[10px] leading-tight">HOD submits to OpEx</p>
            </div>

            <ArrowRight className="w-5 h-5 text-gray-300 hidden md:block flex-shrink-0" />

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center w-32">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-xs mb-1">4. Review</h3>
              <p className="text-gray-500 text-[10px] leading-tight">OpEx validates TOM</p>
            </div>

            <ArrowRight className="w-5 h-5 text-gray-300 hidden md:block flex-shrink-0" />

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center w-32">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-xs mb-1">5. Approve</h3>
              <p className="text-gray-500 text-[10px] leading-tight">VP views approved TOMs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs">
          <p>TOM Builder - Target Operating Model Management System</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
