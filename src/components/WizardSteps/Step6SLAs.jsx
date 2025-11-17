import React, { useState } from 'react';
import InputField from '../shared/InputField';
import InfoBox from '../shared/InfoBox';
import SimpleGraphic from '../shared/SimpleGraphic';
import { Plus, Trash2 } from 'lucide-react';

export default function Step6SLAs({ data, onChange }) {
  const [slas, setSLAs] = useState(data || []);

  const addSLA = () => {
    const newSLAs = [...slas, { service: '', metric: '', target: '', measurement: '' }];
    setSLAs(newSLAs);
    onChange(newSLAs);
  };

  const removeSLA = (index) => {
    const newSLAs = slas.filter((_, i) => i !== index);
    setSLAs(newSLAs);
    onChange(newSLAs);
  };

  const handleChange = (index, field, value) => {
    const newSLAs = [...slas];
    newSLAs[index][field] = value;
    setSLAs(newSLAs);
    onChange(newSLAs);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Level Agreements (SLAs)</h2>
        <p className="text-gray-600">
          What promises do you make? How fast or how well will you deliver each service?
        </p>
      </div>

      <SimpleGraphic type="sla" />

      <InfoBox type="info">
        <strong>What's this for?</strong> SLAs are your commitments to customers. They set clear expectations
        about speed and quality. Example: "We'll respond to IT tickets within 4 hours" or "Invoices processed
        within 2 days."
      </InfoBox>

      <InfoBox type="warning">
        Don't promise what you can't deliver! Be realistic. It's better to under-promise and over-deliver.
      </InfoBox>

      <div className="space-y-6">
        {slas.map((sla, index) => (
          <div key={index} className="card bg-gray-50 relative">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">SLA {index + 1}</h3>
              {slas.length > 1 && (
                <button
                  onClick={() => removeSLA(index)}
                  className="text-red-500 hover:text-red-700"
                  type="button"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <InputField
              label="Service / Activity"
              name="service"
              value={sla.service}
              onChange={(e) => handleChange(index, 'service', e.target.value)}
              placeholder="e.g., IT Support Tickets"
              helper="Which service is this SLA for?"
              required
            />

            <InputField
              label="What You're Measuring"
              name="metric"
              value={sla.metric}
              onChange={(e) => handleChange(index, 'metric', e.target.value)}
              placeholder="e.g., Response Time, Processing Time, Accuracy"
              helper="What specific thing are you measuring?"
              required
            />

            <InputField
              label="Target / Commitment"
              name="target"
              value={sla.target}
              onChange={(e) => handleChange(index, 'target', e.target.value)}
              placeholder="e.g., Within 4 hours, 99% accuracy"
              helper="What's the specific promise you're making?"
              tooltip="Be specific with numbers and timeframes. '95% of tickets resolved in 24 hours' is better than 'Quick response.'"
              required
            />

            <InputField
              label="How You'll Measure It"
              name="measurement"
              value={sla.measurement}
              onChange={(e) => handleChange(index, 'measurement', e.target.value)}
              placeholder="e.g., Ticket system reports, Manual tracking"
              helper="How will you know if you're meeting this target?"
            />
          </div>
        ))}

        <button
          onClick={addSLA}
          className="btn-secondary w-full flex items-center justify-center gap-2"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add Another SLA
        </button>
      </div>
    </div>
  );
}
