import React, { useState } from 'react';
import InputField from '../shared/InputField';
import InfoBox from '../shared/InfoBox';
import SimpleGraphic from '../shared/SimpleGraphic';
import { Plus, Trash2 } from 'lucide-react';

export default function Step10Dependencies({ data, onChange }) {
  const [dependencies, setDependencies] = useState(data || []);

  const addDependency = () => {
    const newDeps = [...dependencies, { on: '', type: '', criticality: '', impact: '' }];
    setDependencies(newDeps);
    onChange(newDeps);
  };

  const removeDependency = (index) => {
    const newDeps = dependencies.filter((_, i) => i !== index);
    setDependencies(newDeps);
    onChange(newDeps);
  };

  const handleChange = (index, field, value) => {
    const newDeps = [...dependencies];
    newDeps[index][field] = value;
    setDependencies(newDeps);
    onChange(newDeps);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dependencies</h2>
        <p className="text-gray-600">
          What does your team rely on to do its work? Systems, other teams, data, etc.
        </p>
      </div>

      <SimpleGraphic type="dependencies" />

      <InfoBox type="info">
        <strong>What's this for?</strong> Dependencies are things you need but don't control.
        If they fail, your work stops or slows down. This could be IT systems, data from other teams,
        external suppliers, or specific people.
      </InfoBox>

      <InfoBox type="warning">
        Knowing your dependencies helps you plan for risks. If a critical system goes down,
        what's your backup plan?
      </InfoBox>

      <div className="space-y-6">
        {dependencies.map((dep, index) => (
          <div key={index} className="card bg-gray-50 relative">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">Dependency {index + 1}</h3>
              {dependencies.length > 1 && (
                <button
                  onClick={() => removeDependency(index)}
                  className="text-red-500 hover:text-red-700"
                  type="button"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <InputField
              label="What You Depend On"
              name="on"
              value={dep.on}
              onChange={(e) => handleChange(index, 'on', e.target.value)}
              placeholder="e.g., HR System, IT Support Team, Monthly sales data"
              helper="What system, team, or resource do you rely on?"
              required
            />

            <InputField
              label="Type"
              name="type"
              type="select"
              value={dep.type}
              onChange={(e) => handleChange(index, 'type', e.target.value)}
              options={['System', 'Team', 'Process', 'Data', 'External']}
              helper="What kind of dependency is this?"
              tooltip="System: Software/IT. Team: Another department. Process: A workflow. Data: Information you receive. External: Outside vendors/partners."
              required
            />

            <InputField
              label="Criticality"
              name="criticality"
              type="select"
              value={dep.criticality}
              onChange={(e) => handleChange(index, 'criticality', e.target.value)}
              options={['High', 'Medium', 'Low']}
              helper="How critical is this dependency?"
              tooltip="High: Can't work without it. Medium: Work is harder without it. Low: Nice to have."
            />

            <InputField
              label="Impact If It Fails"
              name="impact"
              value={dep.impact}
              onChange={(e) => handleChange(index, 'impact', e.target.value)}
              multiline
              rows={2}
              placeholder="e.g., Can't process payroll, Reports delayed by 2 days"
              helper="What happens if this dependency isn't available?"
            />
          </div>
        ))}

        <button
          onClick={addDependency}
          className="btn-secondary w-full flex items-center justify-center gap-2"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add Another Dependency
        </button>
      </div>
    </div>
  );
}
