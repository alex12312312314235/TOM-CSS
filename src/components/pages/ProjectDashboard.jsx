import React, { useState } from 'react';
import {
  Users, FileText, Clock, CheckCircle, AlertCircle, Send,
  User, Calendar, Activity, ChevronRight, Eye, Edit3,
  MessageSquare, Building2
} from 'lucide-react';
import { SECTION_NAMES, getTOMSectionStatus } from '../../data/mockDepartments';

const SECTION_KEYS = Object.keys(SECTION_NAMES);

// Status badge component
function StatusBadge({ status }) {
  const config = {
    in_progress: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'In Progress' },
    submitted: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Submitted for Review' },
    under_review: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Under OpEx Review' },
    needs_revision: { bg: 'bg-red-100', text: 'text-red-700', label: 'Needs Revision' },
    approved: { bg: 'bg-green-100', text: 'text-green-700', label: 'Approved' }
  };
  const c = config[status] || config.in_progress;
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}

function ProjectDashboard({
  project,
  tomData,
  currentUser = 'hod', // 'hod' or member id
  onEnterBuilder,
  onSubmitForReview,
  onNavigateHome
}) {
  const [selectedTab, setSelectedTab] = useState('overview');

  if (!project) {
    return (
      <div className="min-h-screen bg-ekfc-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No project found</p>
          <button onClick={onNavigateHome} className="mt-4 text-ekfc-red hover:underline">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const sectionStatus = getTOMSectionStatus(tomData);
  const statusCounts = {
    green: Object.values(sectionStatus).filter(s => s === 'green').length,
    amber: Object.values(sectionStatus).filter(s => s === 'amber').length,
    red: Object.values(sectionStatus).filter(s => s === 'red').length
  };
  const completeness = Math.round((statusCounts.green / 12) * 100);

  const isHod = currentUser === 'hod';
  const canSubmit = isHod && project.status === 'in_progress' && completeness >= 50;

  // Get section owner name
  const getSectionOwner = (sectionKey) => {
    const assigneeId = project.sectionAssignments?.[sectionKey];
    if (!assigneeId) return { name: project.hod.name, isHod: true };
    const member = project.teamMembers.find(m => m.id === assigneeId);
    return member ? { name: member.name, isHod: false } : { name: project.hod.name, isHod: true };
  };

  // Check if current user can edit a section
  const canEditSection = (sectionKey) => {
    if (isHod) return true;
    return project.sectionAssignments?.[sectionKey] === currentUser;
  };

  return (
    <div className="min-h-screen bg-ekfc-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-ekfc-red to-ekfc-darkred text-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-8 h-8" />
                <h1 className="text-2xl font-bold">{project.department.name}</h1>
              </div>
              <p className="text-red-100">{project.department.division} Division</p>
            </div>
            <StatusBadge status={project.status} />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{project.teamMembers.length + 1}</div>
                <div className="text-sm text-gray-500">Team Members</div>
              </div>
            </div>

            <div className="h-10 w-px bg-gray-200" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{statusCounts.green}/12</div>
                <div className="text-sm text-gray-500">Sections Complete</div>
              </div>
            </div>

            <div className="h-10 w-px bg-gray-200" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{completeness}%</div>
                <div className="text-sm text-gray-500">Overall Progress</div>
              </div>
            </div>

            <div className="flex-1" />

            <button
              onClick={onEnterBuilder}
              className="flex items-center gap-2 px-6 py-3 bg-ekfc-red text-white rounded-lg font-medium hover:bg-ekfc-darkred transition-colors"
            >
              <Edit3 className="w-5 h-5" />
              Enter TOM Builder
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Section Progress</h2>
              <div className="space-y-3">
                {SECTION_KEYS.map((key, index) => {
                  const status = sectionStatus[key];
                  const owner = getSectionOwner(key);
                  const canEdit = canEditSection(key);

                  return (
                    <div
                      key={key}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        status === 'green' ? 'bg-green-50 border-green-200' :
                        status === 'amber' ? 'bg-amber-50 border-amber-200' :
                        'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          status === 'green' ? 'bg-green-500' :
                          status === 'amber' ? 'bg-amber-400' : 'bg-red-500'
                        }`} />
                        <div>
                          <span className="font-medium text-gray-900">
                            {index + 1}. {SECTION_NAMES[key]}
                          </span>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <User className="w-3 h-3" />
                            {owner.name} {owner.isHod && '(HOD)'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          status === 'green' ? 'bg-green-100 text-green-700' :
                          status === 'amber' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {status === 'green' ? 'Complete' : status === 'amber' ? 'In Progress' : 'Not Started'}
                        </span>
                        {canEdit && (
                          <button
                            onClick={onEnterBuilder}
                            className="p-1 text-gray-400 hover:text-ekfc-red"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* HOD Actions */}
            {isHod && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">HOD Actions</h2>

                {project.status === 'in_progress' && (
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <h3 className="font-medium text-blue-900">Submit for OpEx Review</h3>
                      <p className="text-sm text-blue-700">
                        {completeness >= 50
                          ? 'Your TOM is ready for submission'
                          : `Complete at least 50% to submit (currently ${completeness}%)`
                        }
                      </p>
                    </div>
                    <button
                      onClick={onSubmitForReview}
                      disabled={!canSubmit}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      Submit
                    </button>
                  </div>
                )}

                {project.status === 'needs_revision' && tomData.reviews?.length > 0 && (
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h3 className="font-medium text-red-900 mb-2">Revision Required</h3>
                    <p className="text-sm text-red-700 mb-3">
                      {tomData.reviews[tomData.reviews.length - 1].comment}
                    </p>
                    <button
                      onClick={onEnterBuilder}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit & Resubmit
                    </button>
                  </div>
                )}

                {project.status === 'submitted' && (
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h3 className="font-medium text-amber-900">Awaiting OpEx Review</h3>
                    <p className="text-sm text-amber-700">
                      Your TOM has been submitted and is waiting for OpEx team review.
                    </p>
                  </div>
                )}

                {project.status === 'approved' && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-medium text-green-900">TOM Approved</h3>
                    <p className="text-sm text-green-700">
                      Your Target Operating Model has been approved by OpEx and is now official.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Team Members */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Team</h2>
              <div className="space-y-3">
                {/* HOD */}
                <div className="flex items-center gap-3 p-3 bg-ekfc-red/5 rounded-lg border border-ekfc-red/20">
                  <div className="w-10 h-10 bg-ekfc-red rounded-full flex items-center justify-center text-white font-medium">
                    {project.hod.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{project.hod.name}</div>
                    <div className="text-xs text-ekfc-red font-medium">Head of Department</div>
                  </div>
                </div>

                {/* Team members */}
                {project.teamMembers.map(member => {
                  const assignedCount = Object.values(project.sectionAssignments || {})
                    .filter(id => id === member.id).length;
                  return (
                    <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-xs text-gray-500">
                          {assignedCount} section{assignedCount !== 1 ? 's' : ''} •
                          {member.permission === 'edit' ? ' Can Edit' : ' View Only'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-ekfc-red" />
                Activity
              </h2>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {project.activityLog && project.activityLog.length > 0 ? (
                  project.activityLog.slice().reverse().map(activity => (
                    <div key={activity.id} className="flex gap-3 text-sm">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No activity yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDashboard;
