import React, { useState, useMemo } from 'react';
import { LayoutGrid, List, Search, Download, Filter, ChevronDown, X, Eye } from 'lucide-react';
import DepartmentCard from '../DashboardComponents/DepartmentCard';
import DepartmentTable from '../DashboardComponents/DepartmentTable';
import TOMDetailModal from '../DashboardComponents/TOMDetailModal';
import { MOCK_DEPARTMENTS, STATUS_LABELS } from '../../data/mockDepartments';

function VPDashboard({ departments = MOCK_DEPARTMENTS, onExportPDF }) {
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDivision, setFilterDivision] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Get unique divisions for filter
  const divisions = useMemo(() => {
    const unique = [...new Set(departments.map(d => d.division))];
    return unique.filter(Boolean).sort();
  }, [departments]);

  // Filter departments
  const filteredDepartments = useMemo(() => {
    return departments.filter(dept => {
      // Search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        if (!dept.name.toLowerCase().includes(term) &&
            !dept.division?.toLowerCase().includes(term)) {
          return false;
        }
      }

      // Division filter
      if (filterDivision !== 'all' && dept.division !== filterDivision) {
        return false;
      }

      // Status filter
      if (filterStatus !== 'all' && dept.workflowStatus !== filterStatus) {
        return false;
      }

      return true;
    });
  }, [departments, searchTerm, filterDivision, filterStatus]);

  // Calculate summary stats
  const stats = useMemo(() => {
    return {
      total: departments.length,
      approved: departments.filter(d => d.workflowStatus === 'approved').length,
      pending: departments.filter(d => d.workflowStatus === 'submitted' || d.workflowStatus === 'under_review').length,
      draft: departments.filter(d => d.workflowStatus === 'draft').length,
      needsRevision: departments.filter(d => d.workflowStatus === 'needs_revision').length,
      avgCompleteness: Math.round(departments.reduce((sum, d) => sum + d.completeness, 0) / departments.length) || 0
    };
  }, [departments]);

  const handleViewDetails = (department) => {
    setSelectedDepartment(department);
  };

  const handleExportPDF = () => {
    if (onExportPDF) {
      onExportPDF(filteredDepartments);
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-ekfc-cream">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Eye className="w-6 h-6 text-ekfc-red" />
                <h1 className="text-2xl font-bold text-gray-900">VP Dashboard</h1>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">View Only</span>
              </div>
              <p className="text-gray-600 mt-1">All CSS departments and TOM status at a glance</p>
            </div>

            {/* Summary Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                <div className="text-xs text-gray-500">Approved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-500">{stats.pending}</div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">{stats.draft}</div>
                <div className="text-xs text-gray-500">Draft</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-ekfc-red">{stats.avgCompleteness}%</div>
                <div className="text-xs text-gray-500">Avg Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left: Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Division Filter */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-500 mb-1">DIVISION</label>
                <select
                  value={filterDivision}
                  onChange={(e) => setFilterDivision(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-ekfc-red focus:border-ekfc-red"
                >
                  <option value="all">All Divisions</option>
                  {divisions.map(div => (
                    <option key={div} value={div}>{div}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 bottom-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-500 mb-1">STATUS</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-ekfc-red focus:border-ekfc-red"
                >
                  <option value="all">All Statuses</option>
                  {Object.entries(STATUS_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 bottom-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Search */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-500 mb-1">SEARCH</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search departments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-48 focus:ring-2 focus:ring-ekfc-red focus:border-ekfc-red"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: View Toggle & Actions */}
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'cards'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'table'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-4 h-4" />
                  Table
                </button>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2 bg-ekfc-red text-white rounded-lg text-sm font-medium hover:bg-ekfc-darkred transition-colors"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredDepartments.length} of {departments.length} departments
        </div>

        {/* Cards View */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDepartments.map(dept => (
              <DepartmentCard
                key={dept.id}
                department={dept}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <DepartmentTable
            departments={filteredDepartments}
            onViewDetails={handleViewDetails}
          />
        )}

        {/* Empty State */}
        {filteredDepartments.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Filter className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search term</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterDivision('all');
                setFilterStatus('all');
              }}
              className="text-ekfc-red hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Section Status Legend</h4>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-600">Complete - Section has sufficient detail</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="text-gray-600">In Progress - Started but needs more</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-gray-600">Not Started - Section is empty</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              <strong>12 Sections:</strong> 1. Department | 2. Purpose | 3. Services | 4. Stakeholders | 5. Value Chain | 6. SLAs | 7. KPIs | 8. RACI | 9. Governance | 10. Dependencies | 11. Risks | 12. Opportunities
            </p>
          </div>
        </div>
      </div>

      {/* TOM Detail Modal - Full drill-down view */}
      {selectedDepartment && (
        <TOMDetailModal
          department={selectedDepartment}
          onClose={() => setSelectedDepartment(null)}
        />
      )}
    </div>
  );
}

export default VPDashboard;
