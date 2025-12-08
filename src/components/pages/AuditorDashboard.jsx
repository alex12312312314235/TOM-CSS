import React, { useState, useMemo } from 'react';
import { Search, Filter, Clock, CheckCircle, XCircle, Eye, MessageSquare, ChevronDown, AlertTriangle } from 'lucide-react';
import { MOCK_DEPARTMENTS, STATUS_LABELS, SECTION_NAMES, getTOMSectionStatus } from '../../data/mockDepartments';
import ReviewDetailModal from '../ReviewComponents/ReviewDetailModal';

// Filter to only show reviewable submissions
const REVIEWABLE_STATUSES = ['submitted', 'under_review', 'needs_revision'];

function AuditorDashboard({ departments = MOCK_DEPARTMENTS, onUpdateStatus }) {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get only submissions that need review
  const reviewableSubmissions = useMemo(() => {
    return departments.filter(dept => {
      // Must have TOM data and be in a reviewable status
      if (!dept.tomData) return false;
      if (filterStatus === 'all') {
        return REVIEWABLE_STATUSES.includes(dept.workflowStatus);
      }
      return dept.workflowStatus === filterStatus;
    }).filter(dept => {
      if (!searchTerm) return true;
      return dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             dept.division?.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [departments, filterStatus, searchTerm]);

  // Stats
  const stats = useMemo(() => {
    const reviewable = departments.filter(d => d.tomData && REVIEWABLE_STATUSES.includes(d.workflowStatus));
    return {
      pending: reviewable.filter(d => d.workflowStatus === 'submitted').length,
      underReview: reviewable.filter(d => d.workflowStatus === 'under_review').length,
      needsRevision: reviewable.filter(d => d.workflowStatus === 'needs_revision').length,
      total: reviewable.length
    };
  }, [departments]);

  const handleApprove = (department, comment, sectionComments) => {
    if (onUpdateStatus) {
      onUpdateStatus(department.id, 'approved', comment, sectionComments);
    }
    setSelectedSubmission(null);
  };

  const handleRequestRevision = (department, comment, sectionComments) => {
    if (onUpdateStatus) {
      onUpdateStatus(department.id, 'needs_revision', comment, sectionComments);
    }
    setSelectedSubmission(null);
  };

  const handleStartReview = (department) => {
    if (onUpdateStatus && department.workflowStatus === 'submitted') {
      onUpdateStatus(department.id, 'under_review');
    }
    setSelectedSubmission(department);
  };

  return (
    <div className="min-h-screen bg-ekfc-cream">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Review Queue</h1>
              <p className="text-gray-600">Operational Excellence Team - TOM Validation</p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-lg font-bold text-blue-700">{stats.pending}</div>
                  <div className="text-xs text-blue-600">Pending</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-lg">
                <Eye className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="text-lg font-bold text-amber-700">{stats.underReview}</div>
                  <div className="text-xs text-amber-600">In Review</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <div className="text-lg font-bold text-red-700">{stats.needsRevision}</div>
                  <div className="text-xs text-red-600">Needs Revision</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Status Filter */}
            <div className="relative">
              <label className="block text-xs font-medium text-gray-500 mb-1">STATUS</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-ekfc-red focus:border-ekfc-red"
              >
                <option value="all">All Pending ({stats.total})</option>
                <option value="submitted">Submitted ({stats.pending})</option>
                <option value="under_review">Under Review ({stats.underReview})</option>
                <option value="needs_revision">Needs Revision ({stats.needsRevision})</option>
              </select>
              <ChevronDown className="absolute right-2 bottom-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <label className="block text-xs font-medium text-gray-500 mb-1">SEARCH</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-ekfc-red focus:border-ekfc-red"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {reviewableSubmissions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600">No submissions waiting for review at this time.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviewableSubmissions.map(dept => (
              <ReviewCard
                key={dept.id}
                department={dept}
                onStartReview={() => handleStartReview(dept)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Review Detail Modal */}
      {selectedSubmission && (
        <ReviewDetailModal
          department={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          onApprove={handleApprove}
          onRequestRevision={handleRequestRevision}
        />
      )}
    </div>
  );
}

// Individual Review Card Component
function ReviewCard({ department, onStartReview }) {
  const sectionStatus = getTOMSectionStatus(department.tomData);
  const counts = {
    green: Object.values(sectionStatus).filter(s => s === 'green').length,
    amber: Object.values(sectionStatus).filter(s => s === 'amber').length,
    red: Object.values(sectionStatus).filter(s => s === 'red').length
  };

  const statusStyles = {
    submitted: { bg: 'border-l-blue-500', badge: 'bg-blue-100 text-blue-700', icon: Clock },
    under_review: { bg: 'border-l-amber-500', badge: 'bg-amber-100 text-amber-700', icon: Eye },
    needs_revision: { bg: 'border-l-red-500', badge: 'bg-red-100 text-red-700', icon: AlertTriangle }
  };

  const style = statusStyles[department.workflowStatus] || statusStyles.submitted;
  const StatusIcon = style.icon;

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 border-l-4 ${style.bg} overflow-hidden hover:shadow-md transition-shadow`}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Left: Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-gray-900 truncate">{department.name}</h3>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${style.badge}`}>
                <StatusIcon className="w-3 h-3" />
                {STATUS_LABELS[department.workflowStatus]}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span>{department.division}</span>
              {department.submittedBy && (
                <>
                  <span className="text-gray-300">|</span>
                  <span>Submitted by {department.submittedBy}</span>
                </>
              )}
              {department.submittedAt && (
                <>
                  <span className="text-gray-300">|</span>
                  <span>{new Date(department.submittedAt).toLocaleDateString()}</span>
                </>
              )}
            </div>

            {/* Section Status Summary */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-ekfc-red rounded-full"
                    style={{ width: `${department.completeness}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">{department.completeness}%</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-gray-600">{counts.green}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-gray-600">{counts.amber}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="text-gray-600">{counts.red}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onStartReview}
              className="flex items-center gap-2 px-4 py-2 bg-ekfc-red text-white rounded-lg font-medium hover:bg-ekfc-darkred transition-colors"
            >
              <Eye className="w-4 h-4" />
              Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuditorDashboard;
