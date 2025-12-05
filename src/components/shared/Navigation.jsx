import React from 'react';
import { Home, ClipboardCheck, LayoutDashboard, FileText, FolderOpen, Eye } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'landing', label: 'Home', icon: Home },
  { id: 'wizard', label: 'Build TOM', icon: FileText },
  { id: 'my-submissions', label: 'My Submissions', icon: FolderOpen },
  { id: 'auditor', label: 'Review Queue', icon: ClipboardCheck },
  { id: 'vp-dashboard', label: 'VP Dashboard', icon: Eye }
];

function Navigation({ currentView, onNavigate, showBackToWizard = false }) {
  return (
    <header className="bg-white border-b-4 border-ekfc-red sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-2xl font-bold text-ekfc-red">TOM Builder</h1>
              <p className="text-xs text-gray-500">Target Operating Model</p>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.id ||
                  (item.id === 'wizard' && currentView === 'wizard');

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${isActive
                        ? 'bg-ekfc-red text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-ekfc-red'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <select
              value={currentView}
              onChange={(e) => onNavigate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              {NAV_ITEMS.map(item => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
