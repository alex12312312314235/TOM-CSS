import React from 'react';
import InputField from '../shared/InputField';
import InfoBox from '../shared/InfoBox';
import SimpleGraphic from '../shared/SimpleGraphic';

export default function Step1Department({ data, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: name === 'headcount' ? parseInt(value) || 0 : value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Department Information</h2>
        <p className="text-gray-600">
          Let's start with the basics. This helps everyone understand which team we're talking about.
        </p>
      </div>

      <SimpleGraphic type="department" />

      <InfoBox type="info">
        <strong>What's this for?</strong> Your department name and basic details help identify your team
        in the organization. Think of this as your team's nameplate.
      </InfoBox>

      <div className="space-y-4">
        <InputField
          label="Department Name"
          name="name"
          value={data.name || ''}
          onChange={handleChange}
          placeholder="e.g., Finance Operations"
          helper="What's the official name of your department or team?"
          tooltip="This should match how your team appears in org charts and official documents"
          required
        />

        <InputField
          label="Division or Business Unit"
          name="division"
          value={data.division || ''}
          onChange={handleChange}
          placeholder="e.g., Corporate Services"
          helper="Which larger group does your department belong to?"
          tooltip="This is your parent organization - the bigger umbrella you sit under"
        />

        <InputField
          label="Team Size (Headcount)"
          name="headcount"
          type="number"
          value={data.headcount || ''}
          onChange={handleChange}
          placeholder="e.g., 12"
          helper="How many people work in your department?"
          tooltip="Include full-time employees, contractors, and regular temps. Don't include occasional support."
        />
      </div>
    </div>
  );
}
