import React, { useState } from 'react';
import InputField from '../shared/InputField';
import InfoBox from '../shared/InfoBox';
import SimpleGraphic from '../shared/SimpleGraphic';
import { Plus, Trash2 } from 'lucide-react';

export default function Step5ValueChain({ data, onChange }) {
  const [valueChain, setValueChain] = useState(data || { inputs: [], activities: [], outputs: [] });

  const addItem = (category) => {
    const newValueChain = { ...valueChain };
    if (category === 'inputs') {
      newValueChain.inputs = [...(newValueChain.inputs || []), { name: '', source: '', frequency: '' }];
    } else if (category === 'activities') {
      newValueChain.activities = [...(newValueChain.activities || []), { name: '', description: '', owner: '', criticality: '' }];
    } else if (category === 'outputs') {
      newValueChain.outputs = [...(newValueChain.outputs || []), { name: '', recipient: '', quality: '' }];
    }
    setValueChain(newValueChain);
    onChange(newValueChain);
  };

  const removeItem = (category, index) => {
    const newValueChain = { ...valueChain };
    newValueChain[category] = newValueChain[category].filter((_, i) => i !== index);
    setValueChain(newValueChain);
    onChange(newValueChain);
  };

  const handleChange = (category, index, field, value) => {
    const newValueChain = { ...valueChain };
    newValueChain[category][index][field] = value;
    setValueChain(newValueChain);
    onChange(newValueChain);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Value Chain: Inputs → Activities → Outputs</h2>
        <p className="text-gray-600">
          This shows how work flows through your team. What comes in, what you do with it, and what goes out.
        </p>
      </div>

      <SimpleGraphic type="valueChain" />

      <InfoBox type="info">
        <strong>What's this for?</strong> The value chain shows how your team creates value.
        <strong> Inputs</strong> = what you receive, <strong>Activities</strong> = what you do,
        <strong> Outputs</strong> = what you deliver.
      </InfoBox>

      {/* INPUTS */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">📥 Inputs</h3>
        <p className="text-sm text-gray-600 mb-4">
          What does your team receive to do its work? (Data, requests, materials, etc.)
        </p>

        {(valueChain.inputs || []).map((input, index) => (
          <div key={index} className="card bg-blue-50 mb-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-900">Input {index + 1}</h4>
              <button
                onClick={() => removeItem('inputs', index)}
                className="text-red-500 hover:text-red-700"
                type="button"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <InputField
              label="What You Receive"
              name="name"
              value={input.name}
              onChange={(e) => handleChange('inputs', index, 'name', e.target.value)}
              placeholder="e.g., Purchase orders from sales team"
            />

            <InputField
              label="Where It Comes From"
              name="source"
              value={input.source}
              onChange={(e) => handleChange('inputs', index, 'source', e.target.value)}
              placeholder="e.g., Sales Team, Email, Shared Drive"
            />

            <InputField
              label="How Often"
              name="frequency"
              value={input.frequency}
              onChange={(e) => handleChange('inputs', index, 'frequency', e.target.value)}
              placeholder="e.g., Daily, As needed"
            />
          </div>
        ))}

        <button
          onClick={() => addItem('inputs')}
          className="btn-secondary w-full flex items-center justify-center gap-2"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add Input
        </button>
      </div>

      {/* ACTIVITIES */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">⚙️ Activities</h3>
        <p className="text-sm text-gray-600 mb-4">
          What does your team actually do? These are your main tasks and processes.
        </p>

        {(valueChain.activities || []).map((activity, index) => (
          <div key={index} className="card bg-purple-50 mb-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-900">Activity {index + 1}</h4>
              <button
                onClick={() => removeItem('activities', index)}
                className="text-red-500 hover:text-red-700"
                type="button"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <InputField
              label="Activity Name"
              name="name"
              value={activity.name}
              onChange={(e) => handleChange('activities', index, 'name', e.target.value)}
              placeholder="e.g., Process invoices"
            />

            <InputField
              label="Description"
              name="description"
              value={activity.description}
              onChange={(e) => handleChange('activities', index, 'description', e.target.value)}
              multiline
              rows={2}
              placeholder="What does this involve?"
            />

            <InputField
              label="Who Owns This"
              name="owner"
              value={activity.owner}
              onChange={(e) => handleChange('activities', index, 'owner', e.target.value)}
              placeholder="e.g., Finance team, Sarah J."
            />

            <InputField
              label="How Critical Is This?"
              name="criticality"
              type="select"
              value={activity.criticality}
              onChange={(e) => handleChange('activities', index, 'criticality', e.target.value)}
              options={['High', 'Medium', 'Low']}
              tooltip="High: Business stops if this fails. Medium: Important but manageable. Low: Nice to have."
            />
          </div>
        ))}

        <button
          onClick={() => addItem('activities')}
          className="btn-secondary w-full flex items-center justify-center gap-2"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add Activity
        </button>
      </div>

      {/* OUTPUTS */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">📤 Outputs</h3>
        <p className="text-sm text-gray-600 mb-4">
          What does your team deliver? These are your finished products or services.
        </p>

        {(valueChain.outputs || []).map((output, index) => (
          <div key={index} className="card bg-green-50 mb-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-900">Output {index + 1}</h4>
              <button
                onClick={() => removeItem('outputs', index)}
                className="text-red-500 hover:text-red-700"
                type="button"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <InputField
              label="What You Deliver"
              name="name"
              value={output.name}
              onChange={(e) => handleChange('outputs', index, 'name', e.target.value)}
              placeholder="e.g., Approved invoices, Monthly reports"
            />

            <InputField
              label="Who Receives It"
              name="recipient"
              value={output.recipient}
              onChange={(e) => handleChange('outputs', index, 'recipient', e.target.value)}
              placeholder="e.g., Finance Director, All staff"
            />

            <InputField
              label="Quality Standard"
              name="quality"
              value={output.quality}
              onChange={(e) => handleChange('outputs', index, 'quality', e.target.value)}
              placeholder="e.g., 99% accuracy, No errors"
            />
          </div>
        ))}

        <button
          onClick={() => addItem('outputs')}
          className="btn-secondary w-full flex items-center justify-center gap-2"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add Output
        </button>
      </div>
    </div>
  );
}
