import React, { useState } from 'react';
import InputField from '../shared/InputField';
import InfoBox from '../shared/InfoBox';
import SimpleGraphic from '../shared/SimpleGraphic';
import { Plus, Trash2 } from 'lucide-react';

export default function Step8RACI({ data, onChange }) {
  const [racis, setRACIs] = useState(data || []);

  const addRACI = () => {
    const newRACIs = [...racis, { activity: '', responsible: [], accountable: '', consulted: [], informed: [] }];
    setRACIs(newRACIs);
    onChange(newRACIs);
  };

  const removeRACI = (index) => {
    const newRACIs = racis.filter((_, i) => i !== index);
    setRACIs(newRACIs);
    onChange(newRACIs);
  };

  const handleChange = (index, field, value) => {
    const newRACIs = [...racis];

    // For array fields, convert comma-separated string to array
    if (['responsible', 'consulted', 'informed'].includes(field)) {
      newRACIs[index][field] = value.split(',').map(v => v.trim()).filter(Boolean);
    } else {
      newRACIs[index][field] = value;
    }

    setRACIs(newRACIs);
    onChange(newRACIs);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">RACI Matrix</h2>
        <p className="text-gray-600">
          Who does what? This prevents confusion and ensures everyone knows their role.
        </p>
      </div>

      <SimpleGraphic type="raci" />

      <InfoBox type="info">
        <strong>RACI stands for:</strong>
        <ul className="mt-2 space-y-1 ml-4">
          <li><strong>R = Responsible:</strong> The person(s) who do the actual work</li>
          <li><strong>A = Accountable:</strong> The ONE person who approves and is ultimately answerable (only one!)</li>
          <li><strong>C = Consulted:</strong> People whose input you need before doing the work</li>
          <li><strong>I = Informed:</strong> People you tell after the work is done</li>
        </ul>
      </InfoBox>

      <InfoBox type="warning">
        <strong>Important:</strong> Each activity must have exactly ONE person who is Accountable.
        That person makes the final call and takes responsibility.
      </InfoBox>

      <div className="space-y-6">
        {racis.map((raci, index) => (
          <div key={index} className="card bg-gray-50 relative">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">RACI {index + 1}</h3>
              {racis.length > 1 && (
                <button
                  onClick={() => removeRACI(index)}
                  className="text-red-500 hover:text-red-700"
                  type="button"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <InputField
              label="Activity / Process"
              name="activity"
              value={raci.activity}
              onChange={(e) => handleChange(index, 'activity', e.target.value)}
              placeholder="e.g., Approve monthly budget"
              helper="What activity or decision is this for?"
              required
            />

            <InputField
              label="Responsible (Does the work)"
              name="responsible"
              value={Array.isArray(raci.responsible) ? raci.responsible.join(', ') : raci.responsible}
              onChange={(e) => handleChange(index, 'responsible', e.target.value)}
              placeholder="e.g., Finance Team, Sarah J."
              helper="Who actually does this work? (Separate multiple people with commas)"
              tooltip="Can be one or more people who do the hands-on work"
            />

            <InputField
              label="Accountable (Approves & owns it)"
              name="accountable"
              value={raci.accountable}
              onChange={(e) => handleChange(index, 'accountable', e.target.value)}
              placeholder="e.g., Finance Director"
              helper="Who is the ONE person ultimately accountable?"
              tooltip="This must be exactly one person - the decision maker and person who signs off"
              required
            />

            <InputField
              label="Consulted (Input needed before)"
              name="consulted"
              value={Array.isArray(raci.consulted) ? raci.consulted.join(', ') : raci.consulted}
              onChange={(e) => handleChange(index, 'consulted', e.target.value)}
              placeholder="e.g., CFO, Legal Team"
              helper="Who do you need to ask before doing this? (Separate with commas)"
              tooltip="People whose expertise or approval you need before starting"
            />

            <InputField
              label="Informed (Told after)"
              name="informed"
              value={Array.isArray(raci.informed) ? raci.informed.join(', ') : raci.informed}
              onChange={(e) => handleChange(index, 'informed', e.target.value)}
              placeholder="e.g., All staff, Board"
              helper="Who needs to be told once it's done? (Separate with commas)"
              tooltip="People who should know the outcome but don't need to be involved"
            />
          </div>
        ))}

        <button
          onClick={addRACI}
          className="btn-secondary w-full flex items-center justify-center gap-2"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add Another RACI
        </button>
      </div>
    </div>
  );
}
