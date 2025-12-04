import React from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import { SECTION_NAMES, getTOMSectionStatus, STATUS_LABELS } from '../../data/mockDepartments';

// Status Dot for table
function StatusDot({ status }) {
  const colors = {
    green: 'bg-green-500',
    amber: 'bg-amber-400',
    red: 'bg-red-500'
  };
  return <span className={`w-2.5 h-2.5 rounded-full ${colors[status]} inline-block`} />;
}

// Workflow Badge for table
function StatusBadge({ status }) {
  const styles = {
    draft: 'bg-gray-100 text-gray-600',
    submitted: 'bg-blue-100 text-blue-700',
    under_review: 'bg-amber-100 text-amber-700',
    approved: 'bg-green-100 text-green-700',
    needs_revision: 'bg-red-100 text-red-700'
  };

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded ${styles[status] || styles.draft}`}>
      {STATUS_LABELS[status] || 'Draft'}
    </span>
  );
}

function DepartmentTable({ departments, onViewDetails }) {
  const sectionKeys = Object.keys(SECTION_NAMES);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Department
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Division
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Complete
              </th>
              {/* Section columns */}
              {sectionKeys.map((key, index) => (
                <th
                  key={key}
                  className="text-center px-1 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  title={SECTION_NAMES[key]}
                >
                  {index + 1}
                </th>
              ))}
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {departments.map(dept => {
              const sectionStatus = getTOMSectionStatus(dept.tomData);

              return (
                <tr key={dept.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900">{dept.name}</div>
                    {dept.submittedBy && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        by {dept.submittedBy}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {dept.division || '-'}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <StatusBadge status={dept.workflowStatus} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-ekfc-red rounded-full transition-all"
                          style={{ width: `${dept.completeness}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 w-10">
                        {dept.completeness}%
                      </span>
                    </div>
                  </td>
                  {/* Section status dots */}
                  {sectionKeys.map(key => (
                    <td key={key} className="px-1 py-4 text-center">
                      <div className="flex justify-center">
                        <StatusDot status={sectionStatus[key]} />
                      </div>
                    </td>
                  ))}
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => onViewDetails(dept)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-ekfc-red hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table footer with section key */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-3">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
          {sectionKeys.map((key, index) => (
            <span key={key}>
              <strong>{index + 1}</strong> = {SECTION_NAMES[key]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DepartmentTable;
