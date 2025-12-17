import React, { useState } from 'react';
import { X, CheckCircle, Clock, AlertCircle, ChevronDown, ChevronUp, Building2, Eye } from 'lucide-react';
import { SECTION_NAMES, getTOMSectionStatus } from '../../data/mockDepartments';

// Section viewer component (read-only)
function SectionViewer({ title, status, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const statusConfig = {
    green: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    amber: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
    red: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' }
  };

  const config = statusConfig[status] || statusConfig.red;
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

// Render section content
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
          <ul className="text-sm space-y-2">
            {data.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                <span className="text-ekfc-gold font-bold">{idx + 1}.</span>
                <span className="text-gray-700">
                  {item.serviceName || item.name || item.service || item.activity ||
                   item.description || item.metric || item.on ||
                   (typeof item === 'string' ? item : JSON.stringify(item).slice(0, 100))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'valueChain':
      return (
        <div className="space-y-4 text-sm">
          <div>
            <strong className="text-gray-700">Inputs ({data.inputs?.length || 0}):</strong>
            {data.inputs?.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {data.inputs.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full" />
                    {item.description || item}
                  </li>
                ))}
              </ul>
            ) : <p className="text-gray-500 italic mt-1">None defined</p>}
          </div>
          <div>
            <strong className="text-gray-700">Activities ({data.activities?.length || 0}):</strong>
            {data.activities?.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {data.activities.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full" />
                    {item.description || item}
                  </li>
                ))}
              </ul>
            ) : <p className="text-gray-500 italic mt-1">None defined</p>}
          </div>
          <div>
            <strong className="text-gray-700">Outputs ({data.outputs?.length || 0}):</strong>
            {data.outputs?.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {data.outputs.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    {item.description || item}
                  </li>
                ))}
              </ul>
            ) : <p className="text-gray-500 italic mt-1">None defined</p>}
          </div>
        </div>
      );

    case 'governance':
      return (
        <div className="space-y-3 text-sm">
          <div>
            <strong className="text-gray-700">Forums ({data.forums?.length || 0}):</strong>
            {data.forums?.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {data.forums.map((forum, idx) => (
                  <li key={idx} className="p-2 bg-gray-50 rounded">
                    {forum.name || forum.description || forum}
                  </li>
                ))}
              </ul>
            ) : <p className="text-gray-500 italic mt-1">None defined</p>}
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
      return <p className="text-gray-500">Content not available</p>;
  }
}

function TOMDetailModal({ department, onClose }) {
  const tomData = department.tomData;
  const sectionStatus = getTOMSectionStatus(tomData);
  const sectionKeys = Object.keys(SECTION_NAMES);

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

  const statusCounts = {
    green: Object.values(sectionStatus).filter(s => s === 'green').length,
    amber: Object.values(sectionStatus).filter(s => s === 'amber').length,
    red: Object.values(sectionStatus).filter(s => s === 'red').length
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-ekfc-red to-ekfc-darkred text-white px-6 py-5 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold">{department.name}</h2>
                <p className="text-red-100 text-sm">
                  {department.division} • {department.workflowStatus === 'approved' ? 'Approved TOM' : 'TOM Details'}
                </p>
              </div>
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
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">View Only</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                {statusCounts.green} Complete
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                {statusCounts.amber} Partial
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                {statusCounts.red} Missing
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {sectionKeys.map((key, index) => {
              const dataKey = dataKeyMap[key];
              const data = tomData?.[dataKey];

              return (
                <SectionViewer
                  key={key}
                  title={`${index + 1}. ${SECTION_NAMES[key]}`}
                  status={sectionStatus[key]}
                  defaultOpen={index === 0}
                >
                  {renderSectionContent(key, data)}
                </SectionViewer>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TOMDetailModal;
