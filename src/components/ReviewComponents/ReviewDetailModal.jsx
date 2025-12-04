import React, { useState } from 'react';
import { X, CheckCircle, XCircle, AlertCircle, Clock, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { SECTION_NAMES, getTOMSectionStatus } from '../../data/mockDepartments';

// Section detail viewer
function SectionDetail({ title, status, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const statusConfig = {
    green: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    amber: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
    red: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className={`border rounded-lg ${config.border} overflow-hidden`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-3 ${config.bg} hover:opacity-90 transition-opacity`}
      >
        <div className="flex items-center gap-2">
          <StatusIcon className={`w-5 h-5 ${config.color}`} />
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 bg-white border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
}

// Render section content based on type
function renderSectionContent(key, data) {
  if (!data) {
    return <p className="text-gray-500 italic">No data entered</p>;
  }

  switch (key) {
    case 'department':
      return (
        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {data.name || '-'}</p>
          <p><strong>Division:</strong> {data.division || '-'}</p>
          <p><strong>Headcount:</strong> {data.headcount || '-'}</p>
        </div>
      );

    case 'purpose':
      return (
        <div className="space-y-3 text-sm">
          <div>
            <strong className="text-gray-700">Purpose Statement:</strong>
            <p className="mt-1 text-gray-600">{data.statement || '-'}</p>
          </div>
          <div>
            <strong className="text-gray-700">Vision:</strong>
            <p className="mt-1 text-gray-600">{data.vision || '-'}</p>
          </div>
          <div>
            <strong className="text-gray-700">Mission:</strong>
            <p className="mt-1 text-gray-600">{data.mission || '-'}</p>
          </div>
        </div>
      );

    case 'serviceCatalogue':
    case 'stakeholders':
    case 'slas':
    case 'kpis':
    case 'raci':
    case 'dependencies':
    case 'risks':
    case 'opportunities':
      if (!Array.isArray(data) || data.length === 0) {
        return <p className="text-gray-500 italic">No items added</p>;
      }
      return (
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-2">{data.length} item(s)</p>
          <ul className="text-sm space-y-1">
            {data.slice(0, 5).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-ekfc-gold">•</span>
                <span className="text-gray-700">
                  {item.serviceName || item.name || item.service || item.activity || item.description || item.on || JSON.stringify(item).slice(0, 50)}
                </span>
              </li>
            ))}
            {data.length > 5 && (
              <li className="text-gray-500 italic">...and {data.length - 5} more</li>
            )}
          </ul>
        </div>
      );

    case 'valueChain':
      return (
        <div className="space-y-3 text-sm">
          <div>
            <strong className="text-gray-700">Inputs:</strong> {data.inputs?.length || 0} items
          </div>
          <div>
            <strong className="text-gray-700">Activities:</strong> {data.activities?.length || 0} items
          </div>
          <div>
            <strong className="text-gray-700">Outputs:</strong> {data.outputs?.length || 0} items
          </div>
        </div>
      );

    case 'governance':
      return (
        <div className="space-y-3 text-sm">
          <div>
            <strong className="text-gray-700">Forums:</strong> {data.forums?.length || 0} defined
          </div>
          <div>
            <strong className="text-gray-700">Escalation Path:</strong>
            <p className="mt-1 text-gray-600">{data.escalationPath || '-'}</p>
          </div>
          <div>
            <strong className="text-gray-700">Decision Rights:</strong>
            <p className="mt-1 text-gray-600">{data.decisionRights || '-'}</p>
          </div>
        </div>
      );

    default:
      return <p className="text-gray-500">Content preview not available</p>;
  }
}

function ReviewDetailModal({ department, onClose, onApprove, onRequestRevision }) {
  const [reviewComment, setReviewComment] = useState('');

  const sectionStatus = getTOMSectionStatus(department.tomData);
  const sectionKeys = Object.keys(SECTION_NAMES);

  // Map section keys to tomData keys
  const dataKeyMap = {
    department: 'department',
    purpose: 'purpose',
    serviceCatalogue: 'serviceCatalogue',
    stakeholders: 'stakeholders',
    valueChain: 'valueChain',
    slas: 'slas',
    kpis: 'kpis',
    raci: 'raci',
    governance: 'governance',
    dependencies: 'dependencies',
    risks: 'risks',
    opportunities: 'opportunities'
  };

  const handleApprove = () => {
    if (confirm('Are you sure you want to approve this TOM submission?')) {
      onApprove(department, reviewComment.trim() || null);
    }
  };

  const handleRequestRevision = () => {
    if (!reviewComment.trim()) {
      alert('Please provide feedback explaining what needs to be revised.');
      return;
    }
    onRequestRevision(department, reviewComment);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-ekfc-red to-ekfc-darkred text-white px-6 py-5 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">Review: {department.name}</h2>
              <p className="text-red-100 text-sm mt-1">
                {department.division} • Submitted by {department.submittedBy || 'Unknown'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Completeness Banner */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">Overall Completeness</div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-ekfc-red to-ekfc-gold rounded-full"
                    style={{ width: `${department.completeness}%` }}
                  />
                </div>
                <span className="text-lg font-bold text-gray-900">{department.completeness}%</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                {Object.values(sectionStatus).filter(s => s === 'green').length} Complete
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                {Object.values(sectionStatus).filter(s => s === 'amber').length} Partial
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                {Object.values(sectionStatus).filter(s => s === 'red').length} Missing
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Section Review</h3>
          <div className="space-y-3">
            {sectionKeys.map((key, index) => {
              const dataKey = dataKeyMap[key];
              const data = department.tomData?.[dataKey];

              return (
                <SectionDetail
                  key={key}
                  title={`${index + 1}. ${SECTION_NAMES[key]}`}
                  status={sectionStatus[key]}
                  defaultOpen={index === 0}
                >
                  {renderSectionContent(key, data)}
                </SectionDetail>
              );
            })}
          </div>

          {/* Previous Reviews */}
          {department.tomData?.reviews?.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Previous Review Comments</h3>
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

          {/* Review Comment - Always Visible */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-ekfc-red" />
              Add Review Comment
            </h3>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Add your feedback, suggestions, or notes about this TOM submission..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-ekfc-red focus:border-ekfc-red"
            />
            <p className="text-xs text-gray-500 mt-2">
              This comment will be saved with your review decision (required for revision requests, optional for approvals).
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRequestRevision}
                disabled={!reviewComment.trim()}
                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={!reviewComment.trim() ? 'Comment required for revision request' : ''}
              >
                <XCircle className="w-4 h-4" />
                Request Revision
              </button>
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Approve TOM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetailModal;
