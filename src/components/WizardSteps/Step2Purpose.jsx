import React from 'react';
import InputField from '../shared/InputField';
import InfoBox from '../shared/InfoBox';
import SimpleGraphic from '../shared/SimpleGraphic';

export default function Step2Purpose({ data, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Purpose Statement</h2>
        <p className="text-gray-600">
          Why does your team exist? What would be missing if you weren't there?
        </p>
      </div>

      <SimpleGraphic type="purpose" />

      <InfoBox type="info">
        <strong>What's this for?</strong> Your purpose statement is your team's reason for existing.
        It answers: "Why are we here?" Keep it simple and honest - no buzzwords needed.
      </InfoBox>

      <InfoBox type="warning">
        <strong>Good example:</strong> "We process invoices and payments so the business can pay
        suppliers on time and maintain good relationships."
        <br /><br />
        <strong>Avoid:</strong> "We leverage synergies to deliver best-in-class financial excellence."
      </InfoBox>

      <div className="space-y-4">
        <InputField
          label="Purpose Statement"
          name="statement"
          value={data.statement || ''}
          onChange={handleChange}
          multiline
          rows={4}
          placeholder="We exist to..."
          helper="In plain language, what does your team do and why does it matter?"
          tooltip="Imagine explaining your job to a friend or family member. What would you say?"
          required
        />

        <InputField
          label="Vision (Optional)"
          name="vision"
          value={data.vision || ''}
          onChange={handleChange}
          multiline
          rows={3}
          placeholder="Where we're heading..."
          helper="Where do you want your team to be in 1-2 years?"
          tooltip="This is aspirational - what does 'great' look like for your team?"
        />

        <InputField
          label="Mission (Optional)"
          name="mission"
          value={data.mission || ''}
          onChange={handleChange}
          multiline
          rows={3}
          placeholder="How we'll get there..."
          helper="How will you achieve that vision?"
          tooltip="Think about the key things you need to do well to reach your vision"
        />
      </div>
    </div>
  );
}
