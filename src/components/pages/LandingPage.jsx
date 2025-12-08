import React from 'react';
import { FileText, ClipboardCheck, Eye, ArrowRight, Users, Shield, BarChart3, FolderOpen } from 'lucide-react';

const ROLE_CARDS = [
  {
    id: 'wizard',
    title: 'Build My TOM',
    subtitle: 'Team Member',
    description: 'Create and edit your department\'s Target Operating Model using our step-by-step wizard.',
    icon: FileText,
    color: 'bg-blue-500',
    features: ['13-step guided wizard', 'Auto-save progress', 'Export to JSON/Markdown']
  },
  {
    id: 'my-submissions',
    title: 'My Submissions',
    subtitle: 'Track Your Progress',
    description: 'View your submission status, read reviewer feedback, and resubmit if changes are requested.',
    icon: FolderOpen,
    color: 'bg-purple-500',
    features: ['Track submission status', 'Read reviewer feedback', 'Edit & resubmit if needed']
  },
  {
    id: 'auditor',
    title: 'Review Queue',
    subtitle: 'Operational Excellence Team',
    description: 'Review and validate TOM submissions from departments. Approve or request revisions.',
    icon: ClipboardCheck,
    color: 'bg-amber-500',
    features: ['Review pending submissions', 'Add comments & feedback', 'Approve or request changes']
  },
  {
    id: 'vp-dashboard',
    title: 'VP Dashboard',
    subtitle: 'Division Leadership (View Only)',
    description: 'View all departments at a glance. Track TOM completion status across your division.',
    icon: Eye,
    color: 'bg-green-600',
    features: ['Division overview', 'Section completion status', 'Export reports to PDF']
  }
];

function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-ekfc-cream">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-ekfc-red to-ekfc-darkred text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              TOM Builder
            </h1>
            <p className="text-xl text-red-100 mb-6">
              Build, review, and manage Target Operating Models for your organization.
            </p>
            <p className="text-red-200">
              A structured approach to defining how your department operates, delivers value, and measures success.
            </p>
          </div>
        </div>
      </div>

      {/* Role Selection Cards */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Your Role</h2>
        <p className="text-gray-600 mb-8">Choose the view that matches your role in the TOM process</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROLE_CARDS.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => onNavigate(card.id)}
              >
                {/* Card Header */}
                <div className={`${card.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <Icon className="w-10 h-10" />
                    <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-2xl font-bold mt-4">{card.title}</h3>
                  <p className="text-sm opacity-90">{card.subtitle}</p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <ul className="space-y-2">
                    {card.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 bg-ekfc-gold rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6">
                  <button className="w-full py-3 bg-gray-100 hover:bg-ekfc-red hover:text-white rounded-lg font-medium transition-colors group-hover:bg-ekfc-red group-hover:text-white">
                    Enter {card.title}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">1. Teams Build</h3>
              <p className="text-gray-600 text-sm">
                Department teams work through the 13-step wizard to define their operating model, including services, stakeholders, KPIs, and governance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">2. OpEx Reviews</h3>
              <p className="text-gray-600 text-sm">
                The Operational Excellence team reviews submissions for completeness and quality, providing feedback and requesting revisions as needed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">3. VP Oversees</h3>
              <p className="text-gray-600 text-sm">
                Division leadership gets a complete overview of all department TOMs, tracking progress and ensuring alignment across the organization.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>TOM Builder - Target Operating Model Management System</p>
          <p className="mt-1">Built for organizational excellence</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
