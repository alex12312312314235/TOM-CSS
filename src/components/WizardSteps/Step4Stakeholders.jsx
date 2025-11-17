import React, { useState } from 'react';
import InputField from '../shared/InputField';
import InfoBox from '../shared/InfoBox';
import SimpleGraphic from '../shared/SimpleGraphic';
import { Plus, Trash2 } from 'lucide-react';

export default function Step4Stakeholders({ data, onChange }) {
  const [stakeholders, setStakeholders] = useState(data || []);

  const addStakeholder = () => {
    const newStakeholders = [...stakeholders, { name: '', role: '', relationship: '', expectations: '' }];
    setStakeholders(newStakeholders);
    onChange(newStakeholders);
  };

  const removeStakeholder = (index) => {
    const newStakeholders = stakeholders.filter((_, i) => i !== index);
    setStakeholders(newStakeholders);
    onChange(newStakeholders);
  };

  const handleChange = (index, field, value) => {
    const newStakeholders = [...stakeholders];
    newStakeholders[index][field] = value;
    setStakeholders(newStakeholders);
    onChange(newStakeholders);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Stakeholders</h2>
        <p className="text-gray-600">
          Who do you work with? Who depends on you, and who do you depend on?
        </p>
      </div>

      <SimpleGraphic type="stakeholders" />

      <InfoBox type="info">
        <strong>What's this for?</strong> Stakeholders are the people and teams you interact with.
        This includes customers (who use your services), partners (who you work with), suppliers
        (who provide to you), and leadership (who you report to).
      </InfoBox>

      <div className="space-y-6">
        {stakeholders.map((stakeholder, index) => (
          <div key={index} className="card bg-gray-50 relative">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">Stakeholder {index + 1}</h3>
              {stakeholders.length > 1 && (
                <button
                  onClick={() => removeStakeholder(index)}
                  className="text-red-500 hover:text-red-700"
                  type="button"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <InputField
              label="Name / Team"
              name="name"
              value={stakeholder.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="e.g., Marketing Team, John Smith (CFO)"
              helper="Who is this stakeholder?"
              required
            />

            <InputField
              label="Role / Position"
              name="role"
              value={stakeholder.role}
              onChange={(e) => handleChange(index, 'role', e.target.value)}
              placeholder="e.g., Head of Marketing"
              helper="What's their job title or position?"
            />

            <InputField
              label="Relationship Type"
              name="relationship"
              type="select"
              value={stakeholder.relationship}
              onChange={(e) => handleChange(index, 'relationship', e.target.value)}
              options={[
                'Internal Customer',
                'External Customer',
                'Partner',
                'Supplier',
                'Leadership'
              ]}
              helper="What kind of relationship do you have?"
              tooltip="Customer: Uses your services. Partner: Works with you. Supplier: Provides to you. Leadership: You report to them."
              required
            />

            <InputField
              label="What They Expect from You"
              name="expectations"
              value={stakeholder.expectations}
              onChange={(e) => handleChange(index, 'expectations', e.target.value)}
              multiline
              rows={2}
              placeholder="e.g., Monthly reports delivered by 5th of month"
              helper="What do they need from your team?"
            />
          </div>
        ))}

        <button
          onClick={addStakeholder}
          className="btn-secondary w-full flex items-center justify-center gap-2"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add Another Stakeholder
        </button>
      </div>
    </div>
  );
}
