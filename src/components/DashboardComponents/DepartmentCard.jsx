import React from 'react';
import { ArrowRight, X } from 'lucide-react';
import { SECTION_NAMES, getTOMSectionStatus, STATUS_LABELS, STATUS_COLORS } from '../../data/mockDepartments';

// RAG Status Dot Component
function StatusDot({ status, label }) {
  const colors = {
    green: 'bg-green-500',
    amber: 'bg-amber-400',
    red: 'bg-red-500'
  };

  const tooltipText = {
    green: 'Complete',
    amber: 'In Progress',
    red: 'Not Started'
  };

  return (
    <div className="group relative flex flex-col items-center">
      <div
        className={`w-3 h-3 rounded-full ${colors[status]} shadow-sm`}
        title={`${label}: ${tooltipText[status]}`}
      />
      {/* Tooltip on hover */}
      <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
        <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {label}: {tooltipText[status]}
        </div>
        <div className="w-2 h-2 bg-gray-900 transform rotate-45 mx-auto -mt-1" />
      </div>
    </div>
  );
}

// Workflow Status Badge
function WorkflowBadge({ status }) {
  const badgeStyles = {
    draft: 'bg-gray-100 text-gray-600 border-gray-300',
    submitted: 'bg-blue-50 text-blue-700 border-blue-200',
    under_review: 'bg-amber-50 text-amber-700 border-amber-200',
    approved: 'bg-green-50 text-green-700 border-green-200',
    needs_revision: 'bg-red-50 text-red-700 border-red-200'
  };

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${badgeStyles[status] || badgeStyles.draft}`}>
      {STATUS_LABELS[status] || 'Draft'}
    </span>
  );
}

function DepartmentCard({ department, onViewDetails, onDismiss }) {
  const sectionStatus = getTOMSectionStatus(department.tomData);
  const sectionKeys = Object.keys(SECTION_NAMES);

  // Count statuses
  const statusCounts = {
    green: Object.values(sectionStatus).filter(s => s === 'green').length,
    amber: Object.values(sectionStatus).filter(s => s === 'amber').length,
    red: Object.values(sectionStatus).filter(s => s === 'red').length
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Card Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 truncate" title={department.name}>
            {department.name}
          </h3>
          <p className="text-sm text-gray-500">{department.division}</p>
        </div>
        {onDismiss && (
          <button
            onClick={() => onDismiss(department.id)}
            className="text-gray-400 hover:text-gray-600 p-1 -mr-1 -mt-1"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Status Badge & Completeness */}
      <div className="px-5 py-3 bg-gray-50 flex items-center justify-between">
        <WorkflowBadge status={department.workflowStatus} />
        <div className="text-sm">
          <span className="text-gray-500">Completeness:</span>
          <span className="ml-1 font-semibold text-gray-700">{department.completeness}%</span>
        </div>
      </div>

      {/* Section Status Dots */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sections (1-12)</span>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" /> {statusCounts.green}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> {statusCounts.amber}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" /> {statusCounts.red}
            </span>
          </div>
        </div>

        {/* The 12 Section Dots Grid */}
        <div className="grid grid-cols-12 gap-2">
          {sectionKeys.map((key, index) => (
            <StatusDot
              key={key}
              status={sectionStatus[key]}
              label={`${index + 1}. ${SECTION_NAMES[key]}`}
            />
          ))}
        </div>

        {/* Section Labels (abbreviated) */}
        <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400">
          <span>Dept</span>
          <span>Services</span>
          <span>Value Chain</span>
          <span>KPIs</span>
          <span>Risks</span>
          <span>Opps</span>
        </div>
      </div>

      {/* Submitted Info */}
      {department.submittedBy && (
        <div className="px-5 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
          Submitted by {department.submittedBy}
          {department.submittedAt && (
            <span className="ml-1">
              on {new Date(department.submittedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      )}

      {/* Action Button */}
      <div className="px-5 py-4 border-t border-gray-100">
        <button
          onClick={() => onViewDetails(department)}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-ekfc-red text-white rounded-lg font-medium hover:bg-ekfc-darkred transition-colors"
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default DepartmentCard;
