import React, { useState } from 'react';
import InputField from '../shared/InputField';
import InfoBox from '../shared/InfoBox';
import SimpleGraphic from '../shared/SimpleGraphic';
import { Plus, Trash2 } from 'lucide-react';

export default function Step12Opportunities({ data, onChange }) {
  const [opportunities, setOpportunities] = useState(data || []);

  const addOpportunity = () => {
    const newOpps = [...opportunities, { description: '', type: '', effort: '', impact: '', timeframe: '' }];
    setOpportunities(newOpps);
    onChange(newOpps);
  };

  const removeOpportunity = (index) => {
    const newOpps = opportunities.filter((_, i) => i !== index);
    setOpportunities(newOpps);
    onChange(newOpps);
  };

  const handleChange = (index, field, value) => {
    const newOpps = [...opportunities];
    newOpps[index][field] = value;
    setOpportunities(newOpps);
    onChange(newOpps);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Opportunities & Improvements</h2>
        <p className="text-gray-600">
          Where could you improve? What ideas do you have to make things better?
        </p>
      </div>

      <SimpleGraphic type="opportunities" />

      <InfoBox type="info">
        <strong>What's this for?</strong> Opportunities are ways to improve your team's performance,
        efficiency, or quality. These could be process improvements, automation ideas, new tools,
        training needs, or restructuring work.
      </InfoBox>

      <InfoBox type="success">
        <strong>Think about:</strong> What manual work could be automated? What slows you down?
        What would make your customers happier? What skills does your team need?
      </InfoBox>

      <div className="space-y-6">
        {opportunities.map((opp, index) => (
          <div key={index} className="card bg-gray-50 relative">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">Opportunity {index + 1}</h3>
              {opportunities.length > 1 && (
                <button
                  onClick={() => removeOpportunity(index)}
                  className="text-red-500 hover:text-red-700"
                  type="button"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <InputField
              label="Opportunity / Improvement Idea"
              name="description"
              value={opp.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              multiline
              rows={3}
              placeholder="e.g., Automate invoice data entry with OCR software"
              helper="What's the improvement or opportunity?"
              required
            />

            <InputField
              label="Type"
              name="type"
              type="select"
              value={opp.type}
              onChange={(e) => handleChange(index, 'type', e.target.value)}
              options={['Efficiency', 'Quality', 'Growth', 'Innovation', 'Cost Reduction']}
              helper="What kind of improvement is this?"
              tooltip="Efficiency: Faster/easier work. Quality: Better results. Growth: Expand capability. Innovation: New ways of working. Cost Reduction: Save money."
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Effort Required"
                name="effort"
                type="select"
                value={opp.effort}
                onChange={(e) => handleChange(index, 'effort', e.target.value)}
                options={['Low', 'Medium', 'High']}
                helper="How hard is this to do?"
                tooltip="Low: Quick win, easy to implement. Medium: Some work needed. High: Major project, significant resources."
              />

              <InputField
                label="Expected Impact"
                name="impact"
                type="select"
                value={opp.impact}
                onChange={(e) => handleChange(index, 'impact', e.target.value)}
                options={['Low', 'Medium', 'High']}
                helper="How much difference will it make?"
                tooltip="High: Game-changer. Medium: Noticeable improvement. Low: Small but worthwhile."
              />
            </div>

            <InputField
              label="Timeframe"
              name="timeframe"
              value={opp.timeframe}
              onChange={(e) => handleChange(index, 'timeframe', e.target.value)}
              placeholder="e.g., Next quarter, 6 months, Next fiscal year"
              helper="When could you realistically do this?"
            />

            {opp.effort && opp.impact && (
              <div className="mt-4 p-3 bg-white rounded border border-gray-200">
                <p className="text-sm font-medium text-gray-700">
                  Priority Guidance:
                  {opp.effort === 'Low' && opp.impact === 'High' && (
                    <span className="text-green-600 ml-2">🎯 Quick Win - Do this first!</span>
                  )}
                  {opp.effort === 'High' && opp.impact === 'Low' && (
                    <span className="text-red-600 ml-2">⚠️ Low priority - reconsider if worth it</span>
                  )}
                  {opp.effort === 'Medium' && opp.impact === 'High' && (
                    <span className="text-blue-600 ml-2">💪 Worth the effort - plan this carefully</span>
                  )}
                  {opp.effort === 'High' && opp.impact === 'High' && (
                    <span className="text-purple-600 ml-2">🚀 Major initiative - needs exec support</span>
                  )}
                  {(opp.effort === 'Low' || opp.effort === 'Medium') && (opp.impact === 'Low' || opp.impact === 'Medium') && (
                    <span className="text-gray-600 ml-2">📋 Moderate priority - fit in when you can</span>
                  )}
                </p>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addOpportunity}
          className="btn-secondary w-full flex items-center justify-center gap-2"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add Another Opportunity
        </button>
      </div>
    </div>
  );
}
