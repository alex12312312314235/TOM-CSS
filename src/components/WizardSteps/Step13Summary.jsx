import React, { useState } from 'react';
import { Download, FileText, Copy, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { calculateCompleteness, getSectionRAG, getMissingSections, getRecommendations } from '../../utils/diagnostics';
import { exportToJSON, downloadMarkdown, generateMarkdown } from '../../utils/exporters';
import InfoBox from '../shared/InfoBox';

export default function Step13Summary({ data }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const completeness = calculateCompleteness(data);
  const sectionRAG = getSectionRAG(data);
  const missingSections = getMissingSections(data);
  const recommendations = getRecommendations(data);

  const handleCopyMarkdown = () => {
    const markdown = generateMarkdown(data);
    navigator.clipboard.writeText(markdown).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    });
  };

  const getRAGColor = (status) => {
    if (status === 'green') return 'text-green-600 bg-green-50';
    if (status === 'amber') return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const getRAGIcon = (status) => {
    if (status === 'green') return <CheckCircle className="w-5 h-5" />;
    if (status === 'amber') return <AlertTriangle className="w-5 h-5" />;
    return <AlertCircle className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Summary & Export</h2>
        <p className="text-gray-600">
          Here's how your TOM looks. Review the diagnostic, then export your work.
        </p>
      </div>

      {/* COMPLETENESS SCORE */}
      <div className="card bg-gradient-to-br from-primary-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Overall Completeness</h3>
            <p className="text-sm text-gray-600">How much of your TOM is filled in</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary-600">{completeness}%</div>
            {completeness >= 80 && <p className="text-sm text-green-600 font-medium mt-1">Excellent!</p>}
            {completeness >= 50 && completeness < 80 && <p className="text-sm text-amber-600 font-medium mt-1">Good progress</p>}
            {completeness < 50 && <p className="text-sm text-red-600 font-medium mt-1">Keep going</p>}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary-600 h-3 rounded-full transition-all"
            style={{ width: `${completeness}%` }}
          />
        </div>
      </div>

      {/* SECTION STATUS */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Section Status</h3>
        <div className="space-y-2">
          {Object.entries(sectionRAG).map(([key, status]) => {
            const labels = {
              department: 'Department Information',
              purpose: 'Purpose Statement',
              serviceCatalogue: 'Service Catalogue',
              stakeholders: 'Stakeholders',
              valueChain: 'Value Chain',
              slas: 'SLAs',
              kpis: 'KPIs',
              raci: 'RACI Matrix',
              governance: 'Governance',
              dependencies: 'Dependencies',
              risks: 'Risks & Pain Points',
              opportunities: 'Opportunities'
            };

            return (
              <div
                key={key}
                className={`flex items-center gap-3 p-3 rounded-lg ${getRAGColor(status)}`}
              >
                {getRAGIcon(status)}
                <span className="font-medium">{labels[key]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MISSING OR INCOMPLETE */}
      {missingSections.length > 0 && (
        <div className="card bg-amber-50 border-amber-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Missing or Incomplete</h3>
          <div className="space-y-3">
            {missingSections.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  item.severity === 'critical' ? 'text-red-500' : 'text-amber-500'
                }`} />
                <div>
                  <p className="font-medium text-gray-900">{item.section}</p>
                  <p className="text-sm text-gray-600">{item.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECOMMENDATIONS */}
      {recommendations.length > 0 && (
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps & Recommendations</h3>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">→</span>
                <span className="text-gray-800">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* EXPORT SECTION */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Your TOM</h3>

        <InfoBox type="info">
          Save your work in different formats. JSON is for technical use, Markdown is great for
          documentation and sharing.
        </InfoBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <button
            onClick={() => exportToJSON(data)}
            className="btn-primary flex items-center justify-center gap-2 py-3"
          >
            <Download className="w-5 h-5" />
            Download JSON
          </button>

          <button
            onClick={() => downloadMarkdown(data)}
            className="btn-primary flex items-center justify-center gap-2 py-3"
          >
            <FileText className="w-5 h-5" />
            Download Markdown
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="btn-secondary flex items-center justify-center gap-2 py-3 md:col-span-2"
          >
            {copySuccess ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-600">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Markdown to Clipboard
              </>
            )}
          </button>
        </div>
      </div>

      {/* WHAT TO DO NEXT */}
      <div className="card bg-green-50 border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">What to Do Next</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>✅ <strong>Share with your team</strong> - Get feedback and validate what you've captured</p>
          <p>✅ <strong>Review with your manager</strong> - Ensure alignment with department goals</p>
          <p>✅ <strong>Update regularly</strong> - Your TOM should evolve as your team changes</p>
          <p>✅ <strong>Use it</strong> - Reference this when planning, hiring, or explaining what you do</p>
        </div>
      </div>
    </div>
  );
}
