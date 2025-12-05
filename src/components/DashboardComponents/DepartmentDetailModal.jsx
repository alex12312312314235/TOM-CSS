import React from 'react';
import { X, CheckCircle, AlertCircle, Clock, User, Calendar, FileText, Download } from 'lucide-react';
import { SECTION_NAMES, getTOMSectionStatus, STATUS_LABELS } from '../../data/mockDepartments';

// Status indicator with icon
function SectionStatusRow({ sectionKey, label, status, data }) {
  const statusConfig = {
    green: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Complete' },
    amber: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', label: 'In Progress' },
    red: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Not Started' }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${config.bg}`}>
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${config.color}`} />
        <span className="font-medium text-gray-800">{label}</span>
      </div>
      <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
    </div>
  );
}

// Workflow status badge
function WorkflowBadge({ status }) {
  const styles = {
    draft: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Draft' },
    submitted: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Submitted for Review' },
    under_review: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Under Review' },
    approved: { bg: 'bg-green-100', text: 'text-green-700', label: 'Approved' },
    needs_revision: { bg: 'bg-red-100', text: 'text-red-700', label: 'Needs Revision' }
  };

  const config = styles[status] || styles.draft;

  return (
    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

function DepartmentDetailModal({ department, onClose }) {
  const sectionStatus = getTOMSectionStatus(department.tomData);
  const sectionKeys = Object.keys(SECTION_NAMES);

  // Count statuses
  const counts = {
    green: Object.values(sectionStatus).filter(s => s === 'green').length,
    amber: Object.values(sectionStatus).filter(s => s === 'amber').length,
    red: Object.values(sectionStatus).filter(s => s === 'red').length
  };

  const handleExportJSON = () => {
    if (!department.tomData) return;
    const blob = new Blob([JSON.stringify(department.tomData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${department.name.replace(/\s+/g, '-')}-TOM.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-ekfc-red to-ekfc-darkred text-white px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">{department.name}</h2>
              <p className="text-red-100 text-sm mt-1">{department.division}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Status & Completeness */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div>
              <div className="text-sm text-gray-500 mb-1">Workflow Status</div>
              <WorkflowBadge status={department.workflowStatus} />
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Overall Completeness</div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-ekfc-red to-ekfc-gold rounded-full"
                    style={{ width: `${department.completeness}%` }}
                  />
                </div>
                <span className="text-xl font-bold text-gray-900">{department.completeness}%</span>
              </div>
            </div>
          </div>

          {/* Submission Info */}
          {department.submittedBy && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Submitted by:</span>
                  <span className="font-medium text-gray-900">{department.submittedBy}</span>
                </div>
                {department.submittedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Submitted:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(department.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section Summary */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Section Status</h3>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-600">{counts.green} Complete</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="text-gray-600">{counts.amber} In Progress</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-gray-600">{counts.red} Not Started</span>
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {sectionKeys.map((key, index) => (
                <SectionStatusRow
                  key={key}
                  sectionKey={key}
                  label={`${index + 1}. ${SECTION_NAMES[key]}`}
                  status={sectionStatus[key]}
                />
              ))}
            </div>
          </div>

          {/* Reviews (if any) */}
          {department.tomData?.reviews?.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Review Comments</h3>
              <div className="space-y-3">
                {department.tomData.reviews.map(review => (
                  <div key={review.id} className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-900">{review.reviewerName}</span>
                      <span className="text-xs text-blue-600">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-blue-800">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleExportJSON}
            disabled={!department.tomData}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-ekfc-red text-white rounded-lg font-medium hover:bg-ekfc-darkred transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DepartmentDetailModal;
