import React from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, Edit3, Eye, MessageSquare, Calendar, User } from 'lucide-react';
import { STATUS_LABELS, SECTION_NAMES, getTOMSectionStatus } from '../../data/mockDepartments';

// Status configuration
const STATUS_CONFIG = {
  draft: {
    icon: FileText,
    color: 'text-gray-500',
    bg: 'bg-gray-100',
    border: 'border-gray-300',
    label: 'Draft',
    description: 'Not yet submitted for review'
  },
  submitted: {
    icon: Clock,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    label: 'Submitted',
    description: 'Waiting for reviewer to start review'
  },
  under_review: {
    icon: Eye,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    label: 'Under Review',
    description: 'Currently being reviewed by OpEx team'
  },
  approved: {
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    label: 'Approved',
    description: 'Your TOM has been approved!'
  },
  needs_revision: {
    icon: AlertCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    label: 'Needs Revision',
    description: 'Please review feedback and resubmit'
  }
};

function MySubmissions({ tomData, onEditTOM, onNavigateToWizard }) {
  const workflowStatus = tomData?.workflow?.status || 'draft';
  const statusConfig = STATUS_CONFIG[workflowStatus] || STATUS_CONFIG.draft;
  const StatusIcon = statusConfig.icon;

  const sectionStatus = getTOMSectionStatus(tomData);
  const statusCounts = {
    green: Object.values(sectionStatus).filter(s => s === 'green').length,
    amber: Object.values(sectionStatus).filter(s => s === 'amber').length,
    red: Object.values(sectionStatus).filter(s => s === 'red').length
  };

  // Get latest review comment
  const latestReview = tomData?.reviews?.length > 0
    ? tomData.reviews[tomData.reviews.length - 1]
    : null;

  const hasSubmission = tomData?.department?.name;

  return (
    <div className="min-h-screen bg-ekfc-cream">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-gray-900">My Submissions</h1>
          <p className="text-gray-600 mt-1">Track your TOM submission status and reviewer feedback</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {!hasSubmission ? (
          /* No submission yet */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No TOM Started Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't started building your Target Operating Model yet.
              Click below to begin the wizard.
            </p>
            <button
              onClick={onNavigateToWizard}
              className="inline-flex items-center gap-2 px-6 py-3 bg-ekfc-red text-white rounded-lg font-medium hover:bg-ekfc-darkred transition-colors"
            >
              <Edit3 className="w-5 h-5" />
              Start Building TOM
            </button>
          </div>
        ) : (
          /* Has submission */
          <div className="space-y-6">
            {/* Status Card */}
            <div className={`bg-white rounded-xl shadow-sm border-2 ${statusConfig.border} overflow-hidden`}>
              <div className={`${statusConfig.bg} px-6 py-4 flex items-center gap-4`}>
                <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center ${statusConfig.color}`}>
                  <StatusIcon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900">{tomData.department.name}</h2>
                  <p className={`text-sm font-medium ${statusConfig.color}`}>
                    Status: {statusConfig.label}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Completeness</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round((statusCounts.green / 12) * 100)}%
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-100">
                <p className="text-gray-600">{statusConfig.description}</p>
              </div>

              {/* Submission Details */}
              {tomData.workflow?.submittedAt && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Submitted:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(tomData.workflow.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    {tomData.workflow.submittedBy && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">By:</span>
                        <span className="font-medium text-gray-900">
                          {typeof tomData.workflow.submittedBy === 'object'
                            ? tomData.workflow.submittedBy.name
                            : tomData.workflow.submittedBy}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Reviewer Feedback (if needs revision) */}
            {workflowStatus === 'needs_revision' && latestReview && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-900 mb-1">Reviewer Feedback</h3>
                    <p className="text-red-800 mb-3">{latestReview.comment}</p>
                    <div className="flex items-center gap-4 text-sm text-red-600">
                      <span>From: {latestReview.reviewerName}</span>
                      <span>|</span>
                      <span>{new Date(latestReview.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Approval Message */}
            {workflowStatus === 'approved' && latestReview && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900 mb-1">Approval Comment</h3>
                    <p className="text-green-800 mb-3">{latestReview.comment}</p>
                    <div className="flex items-center gap-4 text-sm text-green-600">
                      <span>From: {latestReview.reviewerName}</span>
                      <span>|</span>
                      <span>{new Date(latestReview.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section Status Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Section Completion</h3>

              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-600">{statusCounts.green} Complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="text-sm text-gray-600">{statusCounts.amber} In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm text-gray-600">{statusCounts.red} Not Started</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(SECTION_NAMES).map(([key, label], index) => {
                  const status = sectionStatus[key];
                  const statusColors = {
                    green: 'bg-green-100 text-green-800 border-green-200',
                    amber: 'bg-amber-100 text-amber-800 border-amber-200',
                    red: 'bg-red-100 text-red-800 border-red-200'
                  };
                  return (
                    <div
                      key={key}
                      className={`px-3 py-2 rounded-lg border text-sm ${statusColors[status]}`}
                    >
                      {index + 1}. {label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {(workflowStatus === 'draft' || workflowStatus === 'needs_revision') && (
                <button
                  onClick={onNavigateToWizard}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-ekfc-red text-white rounded-lg font-medium hover:bg-ekfc-darkred transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                  {workflowStatus === 'needs_revision' ? 'Edit & Resubmit' : 'Continue Editing'}
                </button>
              )}
              {(workflowStatus === 'submitted' || workflowStatus === 'under_review') && (
                <div className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium">
                  <Clock className="w-5 h-5" />
                  Waiting for Review...
                </div>
              )}
              {workflowStatus === 'approved' && (
                <button
                  onClick={onNavigateToWizard}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  View TOM
                </button>
              )}
            </div>

            {/* Review History */}
            {tomData.reviews && tomData.reviews.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Review History</h3>
                <div className="space-y-4">
                  {tomData.reviews.map((review, index) => (
                    <div key={review.id || index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        review.status === 'approved' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        <MessageSquare className={`w-4 h-4 ${
                          review.status === 'approved' ? 'text-green-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{review.reviewerName}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MySubmissions;
