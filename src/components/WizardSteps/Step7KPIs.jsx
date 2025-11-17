import React, { useState } from 'react';
import InputField from '../shared/InputField';
import InfoBox from '../shared/InfoBox';
import SimpleGraphic from '../shared/SimpleGraphic';
import { Plus, Trash2 } from 'lucide-react';

export default function Step7KPIs({ data, onChange }) {
  const [kpis, setKPIs] = useState(data || []);

  const addKPI = () => {
    const newKPIs = [...kpis, { name: '', description: '', target: '', frequency: '', owner: '', category: '' }];
    setKPIs(newKPIs);
    onChange(newKPIs);
  };

  const removeKPI = (index) => {
    const newKPIs = kpis.filter((_, i) => i !== index);
    setKPIs(newKPIs);
    onChange(newKPIs);
  };

  const handleChange = (index, field, value) => {
    const newKPIs = [...kpis];
    newKPIs[index][field] = value;
    setKPIs(newKPIs);
    onChange(newKPIs);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Key Performance Indicators (KPIs)</h2>
        <p className="text-gray-600">
          How will you know if you're successful? What numbers actually matter?
        </p>
      </div>

      <SimpleGraphic type="kpi" />

      <InfoBox type="info">
        <strong>What's this for?</strong> KPIs are the vital signs of your team. They tell you if
        you're healthy and performing well. Pick 3-7 metrics that really matter - not everything you
        <em>could</em> measure, just what you <em>should</em> measure.
      </InfoBox>

      <InfoBox type="warning">
        <strong>Good KPI:</strong> "Process 95% of invoices within 48 hours"
        <br />
        <strong>Bad KPI:</strong> "Do good work" (too vague, can't measure it)
      </InfoBox>

      <div className="space-y-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="card bg-gray-50 relative">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">KPI {index + 1}</h3>
              {kpis.length > 1 && (
                <button
                  onClick={() => removeKPI(index)}
                  className="text-red-500 hover:text-red-700"
                  type="button"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <InputField
              label="KPI Name"
              name="name"
              value={kpi.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="e.g., Invoice Processing Time"
              helper="What are you measuring?"
              required
            />

            <InputField
              label="Description"
              name="description"
              value={kpi.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              multiline
              rows={2}
              placeholder="Why does this metric matter?"
              helper="Explain what this tells you about your performance"
            />

            <InputField
              label="Target"
              name="target"
              value={kpi.target}
              onChange={(e) => handleChange(index, 'target', e.target.value)}
              placeholder="e.g., 95%, Under 2 days, Zero errors"
              helper="What's your goal? Be specific with numbers."
              tooltip="Make it SMART: Specific, Measurable, Achievable, Relevant, Time-bound"
              required
            />

            <InputField
              label="Category"
              name="category"
              type="select"
              value={kpi.category}
              onChange={(e) => handleChange(index, 'category', e.target.value)}
              options={[
                'Quality',
                'Speed',
                'Cost',
                'Customer Satisfaction',
                'Compliance'
              ]}
              helper="What type of performance does this measure?"
              required
            />

            <InputField
              label="How Often You'll Check It"
              name="frequency"
              value={kpi.frequency}
              onChange={(e) => handleChange(index, 'frequency', e.target.value)}
              placeholder="e.g., Weekly, Monthly, Real-time"
              helper="How often will you review this metric?"
            />

            <InputField
              label="Who Owns This KPI"
              name="owner"
              value={kpi.owner}
              onChange={(e) => handleChange(index, 'owner', e.target.value)}
              placeholder="e.g., Team Lead, Operations Manager"
              helper="Who's responsible for tracking and improving this?"
            />
          </div>
        ))}

        <button
          onClick={addKPI}
          className="btn-secondary w-full flex items-center justify-center gap-2"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add Another KPI
        </button>
      </div>
    </div>
  );
}
