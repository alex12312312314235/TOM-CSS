import React, { useState } from 'react';
import InputField from '../shared/InputField';
import InfoBox from '../shared/InfoBox';
import SimpleGraphic from '../shared/SimpleGraphic';
import { Plus, Trash2 } from 'lucide-react';

export default function Step9Governance({ data, onChange }) {
  const [governance, setGovernance] = useState(data || { forums: [], escalationPath: '', decisionRights: '' });

  const addForum = () => {
    const newForums = [...(governance.forums || []), {
      name: '',
      purpose: '',
      frequency: '',
      participants: [],
      decisions: []
    }];
    const newGovernance = { ...governance, forums: newForums };
    setGovernance(newGovernance);
    onChange(newGovernance);
  };

  const removeForum = (index) => {
    const newForums = governance.forums.filter((_, i) => i !== index);
    const newGovernance = { ...governance, forums: newForums };
    setGovernance(newGovernance);
    onChange(newGovernance);
  };

  const handleForumChange = (index, field, value) => {
    const newForums = [...governance.forums];

    if (['participants', 'decisions'].includes(field)) {
      newForums[index][field] = value.split(',').map(v => v.trim()).filter(Boolean);
    } else {
      newForums[index][field] = value;
    }

    const newGovernance = { ...governance, forums: newForums };
    setGovernance(newGovernance);
    onChange(newGovernance);
  };

  const handleGlobalChange = (field, value) => {
    const newGovernance = { ...governance, [field]: value };
    setGovernance(newGovernance);
    onChange(newGovernance);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Governance & Decision-Making</h2>
        <p className="text-gray-600">
          How do you make decisions? What meetings do you have and what gets decided where?
        </p>
      </div>

      <SimpleGraphic type="governance" />

      <InfoBox type="info">
        <strong>What's this for?</strong> Governance is about how your team makes decisions and stays
        aligned. This includes regular meetings, who decides what, and how problems get escalated.
      </InfoBox>

      {/* FORUMS */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Regular Meetings / Forums</h3>
        <p className="text-sm text-gray-600 mb-4">
          What regular meetings does your team have? (Team meetings, reviews, planning sessions, etc.)
        </p>

        {(governance.forums || []).map((forum, index) => (
          <div key={index} className="card bg-blue-50 mb-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-900">Forum {index + 1}</h4>
              <button
                onClick={() => removeForum(index)}
                className="text-red-500 hover:text-red-700"
                type="button"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <InputField
              label="Meeting Name"
              name="name"
              value={forum.name}
              onChange={(e) => handleForumChange(index, 'name', e.target.value)}
              placeholder="e.g., Weekly Team Sync, Monthly Review"
            />

            <InputField
              label="Purpose"
              name="purpose"
              value={forum.purpose}
              onChange={(e) => handleForumChange(index, 'purpose', e.target.value)}
              multiline
              rows={2}
              placeholder="What's this meeting for?"
              helper="What do you achieve in this meeting?"
            />

            <InputField
              label="Frequency"
              name="frequency"
              value={forum.frequency}
              onChange={(e) => handleForumChange(index, 'frequency', e.target.value)}
              placeholder="e.g., Weekly, Monthly, Quarterly"
              helper="How often does this meeting happen?"
            />

            <InputField
              label="Participants"
              name="participants"
              value={Array.isArray(forum.participants) ? forum.participants.join(', ') : forum.participants}
              onChange={(e) => handleForumChange(index, 'participants', e.target.value)}
              placeholder="e.g., Team Lead, All team members, CFO"
              helper="Who attends? (Separate with commas)"
            />

            <InputField
              label="What Gets Decided Here"
              name="decisions"
              value={Array.isArray(forum.decisions) ? forum.decisions.join(', ') : forum.decisions}
              onChange={(e) => handleForumChange(index, 'decisions', e.target.value)}
              placeholder="e.g., Priority changes, Resource allocation"
              helper="What types of decisions are made in this forum? (Separate with commas)"
            />
          </div>
        ))}

        <button
          onClick={addForum}
          className="btn-secondary w-full flex items-center justify-center gap-2 mb-6"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add Forum
        </button>
      </div>

      {/* ESCALATION */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Escalation & Decision Rights</h3>

        <InputField
          label="Escalation Path"
          name="escalationPath"
          value={governance.escalationPath || ''}
          onChange={(e) => handleGlobalChange('escalationPath', e.target.value)}
          multiline
          rows={3}
          placeholder="e.g., Team Lead → Department Head → Director"
          helper="When there's a problem or decision beyond your authority, who do you escalate to?"
          tooltip="Describe the chain: who handles what level of issue, and who's the final decision maker"
        />

        <InputField
          label="Decision Rights"
          name="decisionRights"
          value={governance.decisionRights || ''}
          onChange={(e) => handleGlobalChange('decisionRights', e.target.value)}
          multiline
          rows={3}
          placeholder="Team can decide X, Y, Z. Manager approval needed for A, B, C."
          helper="What can your team decide on its own vs. what needs approval?"
          tooltip="Be clear about autonomy: what decisions can the team make freely, and what needs sign-off from above?"
        />
      </div>
    </div>
  );
}
