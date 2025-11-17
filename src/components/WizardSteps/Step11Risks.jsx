import React, { useState } from 'react';
import InputField from '../shared/InputField';
import InfoBox from '../shared/InfoBox';
import SimpleGraphic from '../shared/SimpleGraphic';
import { Plus, Trash2 } from 'lucide-react';

export default function Step11Risks({ data, onChange }) {
  const [risks, setRisks] = useState(data || []);

  const addRisk = () => {
    const newRisks = [...risks, { description: '', type: '', likelihood: '', impact: '', mitigation: '' }];
    setRisks(newRisks);
    onChange(newRisks);
  };

  const removeRisk = (index) => {
    const newRisks = risks.filter((_, i) => i !== index);
    setRisks(newRisks);
    onChange(newRisks);
  };

  const handleChange = (index, field, value) => {
    const newRisks = [...risks];
    newRisks[index][field] = value;
    setRisks(newRisks);
    onChange(newRisks);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Risks & Pain Points</h2>
        <p className="text-gray-600">
          What keeps you up at night? What could go wrong, or what's already a problem?
        </p>
      </div>

      <SimpleGraphic type="risks" />

      <InfoBox type="info">
        <strong>What's this for?</strong> Risks are potential problems that haven't happened yet
        (or happen sometimes). Pain points are current problems you're dealing with. Being honest
        about these helps you plan mitigations and improvements.
      </InfoBox>

      <InfoBox type="warning">
        Think about: What would break your service? Where do mistakes happen? What do people complain about?
        What processes are fragile or depend on one person?
      </InfoBox>

      <div className="space-y-6">
        {risks.map((risk, index) => (
          <div key={index} className="card bg-gray-50 relative">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">Risk / Pain Point {index + 1}</h3>
              {risks.length > 1 && (
                <button
                  onClick={() => removeRisk(index)}
                  className="text-red-500 hover:text-red-700"
                  type="button"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <InputField
              label="Risk / Pain Point Description"
              name="description"
              value={risk.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              multiline
              rows={3}
              placeholder="e.g., Key person dependency - only Sarah knows how to run month-end close"
              helper="Describe the risk or problem"
              required
            />

            <InputField
              label="Type"
              name="type"
              type="select"
              value={risk.type}
              onChange={(e) => handleChange(index, 'type', e.target.value)}
              options={['Operational', 'Financial', 'Compliance', 'Reputational', 'Strategic']}
              helper="What category is this risk?"
              tooltip="Operational: Day-to-day work issues. Financial: Money/budget. Compliance: Legal/regulatory. Reputational: Image/trust. Strategic: Long-term goals."
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Likelihood"
                name="likelihood"
                type="select"
                value={risk.likelihood}
                onChange={(e) => handleChange(index, 'likelihood', e.target.value)}
                options={['High', 'Medium', 'Low']}
                helper="How likely is this to happen?"
                tooltip="High: Very likely or already happening. Medium: Could happen. Low: Unlikely but possible."
              />

              <InputField
                label="Impact"
                name="impact"
                type="select"
                value={risk.impact}
                onChange={(e) => handleChange(index, 'impact', e.target.value)}
                options={['High', 'Medium', 'Low']}
                helper="How bad would it be?"
                tooltip="High: Severe consequences. Medium: Significant but manageable. Low: Minor inconvenience."
              />
            </div>

            <InputField
              label="Mitigation / What You're Doing About It"
              name="mitigation"
              value={risk.mitigation}
              onChange={(e) => handleChange(index, 'mitigation', e.target.value)}
              multiline
              rows={2}
              placeholder="e.g., Cross-training two other team members, documenting the process"
              helper="How are you reducing this risk or managing the pain point?"
            />
          </div>
        ))}

        <button
          onClick={addRisk}
          className="btn-secondary w-full flex items-center justify-center gap-2"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add Another Risk / Pain Point
        </button>
      </div>
    </div>
  );
}
