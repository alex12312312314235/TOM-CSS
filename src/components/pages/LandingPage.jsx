import React from 'react';
import { Plus, FolderOpen, ClipboardCheck, Eye, ArrowRight, Users, Shield, BarChart3, Rocket } from 'lucide-react';

function LandingPage({ onNavigate, hasProject = false }) {
  const ROLE_CARDS = [
    {
      id: 'project-setup',
      title: 'Start New Project',
      subtitle: 'Head of Department',
      description: 'Create a new TOM mapping project for your department. Invite your team and assign sections.',
      icon: Plus,
      color: 'bg-blue-500',
      features: ['Set up department details', 'Invite team members', 'Assign section ownership'],
      show: !hasProject
    },
    {
      id: 'project-dashboard',
      title: 'My Project',
      subtitle: 'Team Collaboration',
      description: hasProject
        ? 'Continue working on your TOM project. View progress, activity, and enter the builder.'
        : 'No active project. Start a new project to begin.',
      icon: FolderOpen,
      color: hasProject ? 'bg-purple-500' : 'bg-gray-400',
      features: hasProject
        ? ['View team progress', 'Track activity feed', 'Enter TOM Builder']
        : ['Create a project first'],
      disabled: !hasProject,
      show: true
    },
    {
      id: 'auditor',
      title: 'OpEx Review',
      subtitle: 'Operational Excellence Team',
      description: 'Review and validate TOM submissions from departments. Approve or request revisions.',
      icon: ClipboardCheck,
      color: 'bg-amber-500',
      features: ['Review pending submissions', 'Add section comments', 'Approve or request changes'],
      show: true
    },
    {
      id: 'vp-dashboard',
      title: 'VP Dashboard',
      subtitle: 'Division Leadership',
      description: 'View all departments at a glance. Click any department to see full TOM details.',
      icon: Eye,
      color: 'bg-green-600',
      features: ['Division overview', 'Full TOM drill-down', 'Export reports to PDF'],
      show: true
    }
  ];

  const visibleCards = ROLE_CARDS.filter(card => card.show);

  return (
    <div className="min-h-screen bg-ekfc-cream">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-ekfc-red to-ekfc-darkred text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              TOM Builder
            </h1>
            <p className="text-xl text-red-100 mb-4">
              Build, review, and manage Target Operating Models for your organization.
            </p>
            <p className="text-red-200">
              A collaborative approach to defining how your department operates, delivers value, and measures success.
            </p>
          </div>
        </div>
      </div>

      {/* Role Selection Cards */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Get Started</h2>
        <p className="text-gray-600 mb-8">Choose your role or action to begin</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleCards.map(card => {
            const Icon = card.icon;
            const isDisabled = card.disabled;

            return (
              <div
                key={card.id}
                className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-shadow ${
                  isDisabled ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg cursor-pointer group'
                }`}
                onClick={() => !isDisabled && onNavigate(card.id)}
              >
                {/* Card Header */}
                <div className={`${card.color} p-5 text-white`}>
                  <div className="flex items-center justify-between">
                    <Icon className="w-8 h-8" />
                    {!isDisabled && (
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mt-3">{card.title}</h3>
                  <p className="text-sm opacity-90">{card.subtitle}</p>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-3">{card.description}</p>
                  <ul className="space-y-1.5">
                    {card.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-1.5 h-1.5 bg-ekfc-gold rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer */}
                <div className="px-5 pb-5">
                  <button
                    disabled={isDisabled}
                    className={`w-full py-2.5 rounded-lg font-medium transition-colors text-sm ${
                      isDisabled
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 hover:bg-ekfc-red hover:text-white group-hover:bg-ekfc-red group-hover:text-white'
                    }`}
                  >
                    {isDisabled ? 'No Project Yet' : `Enter ${card.title}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workflow Diagram */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">The TOM Journey</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center max-w-[200px]">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Rocket className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm mb-1">1. HOD Creates Project</h3>
              <p className="text-gray-500 text-xs">Set up department, invite team, assign sections</p>
            </div>

            <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center max-w-[200px]">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-semibold text-sm mb-1">2. Team Collaborates</h3>
              <p className="text-gray-500 text-xs">Each member works on assigned sections</p>
            </div>

            <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center max-w-[200px]">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <FolderOpen className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm mb-1">3. HOD Submits</h3>
              <p className="text-gray-500 text-xs">Final review and submit to OpEx</p>
            </div>

            <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center max-w-[200px]">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                <Shield className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-semibold text-sm mb-1">4. OpEx Reviews</h3>
              <p className="text-gray-500 text-xs">Validate and approve or request changes</p>
            </div>

            <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center max-w-[200px]">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <BarChart3 className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-sm mb-1">5. VP Oversees</h3>
              <p className="text-gray-500 text-xs">View approved TOMs across division</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>TOM Builder - Target Operating Model Management System</p>
          <p className="mt-1">Built for organizational excellence</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
