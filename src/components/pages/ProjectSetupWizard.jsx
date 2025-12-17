import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, Users, Rocket, Plus, X, Check, User } from 'lucide-react';
import { SECTION_NAMES } from '../../data/mockDepartments';

// CSS Departments (Culinary Shared Services)
const CSS_DEPARTMENTS = [
  { id: 'ii', name: 'I&I', fullName: 'Insights & Intelligence' },
  { id: 'hd', name: 'H&D', fullName: 'Health & Dietetics' },
  { id: 'ss', name: 'S&S', fullName: 'Standards & Specifications' },
  { id: 'cdr', name: 'CD&R', fullName: 'Concept Development & Research' },
  { id: 'ft', name: 'FT', fullName: 'Food Technology' },
];

// Simulated team members for prototype
const AVAILABLE_TEAM_MEMBERS = [
  { id: 'tm1', name: 'Sarah Johnson', email: 'sarah.johnson@company.com', role: 'Senior Analyst' },
  { id: 'tm2', name: 'John Smith', email: 'john.smith@company.com', role: 'Process Lead' },
  { id: 'tm3', name: 'Emily Chen', email: 'emily.chen@company.com', role: 'Operations Manager' },
  { id: 'tm4', name: 'Michael Brown', email: 'michael.brown@company.com', role: 'Quality Specialist' },
  { id: 'tm5', name: 'Lisa Wang', email: 'lisa.wang@company.com', role: 'Team Lead' },
  { id: 'tm6', name: 'David Miller', email: 'david.miller@company.com', role: 'Business Analyst' },
  { id: 'tm7', name: 'Anna Garcia', email: 'anna.garcia@company.com', role: 'Project Coordinator' },
  { id: 'tm8', name: 'James Wilson', email: 'james.wilson@company.com', role: 'Subject Matter Expert' },
];

const SECTION_KEYS = Object.keys(SECTION_NAMES);

function ProjectSetupWizard({ onComplete, onCancel }) {
  const [step, setStep] = useState(1);

  // Step 1: Department info
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [projectName, setProjectName] = useState('');
  const [tomOwner, setTomOwner] = useState('');

  // Step 2: Team members
  const [teamMembers, setTeamMembers] = useState([]);
  const [sectionAssignments, setSectionAssignments] = useState({});
  const [showAddMember, setShowAddMember] = useState(false);

  // Get available (not yet added) team members
  const availableMembers = AVAILABLE_TEAM_MEMBERS.filter(
    m => !teamMembers.find(tm => tm.id === m.id)
  );

  const addTeamMember = (member) => {
    setTeamMembers([...teamMembers, { ...member, permission: 'edit' }]);
    setShowAddMember(false);
  };

  const removeTeamMember = (memberId) => {
    setTeamMembers(teamMembers.filter(m => m.id !== memberId));
    // Remove their section assignments
    const newAssignments = { ...sectionAssignments };
    Object.keys(newAssignments).forEach(key => {
      if (newAssignments[key] === memberId) {
        delete newAssignments[key];
      }
    });
    setSectionAssignments(newAssignments);
  };

  const updateMemberPermission = (memberId, permission) => {
    setTeamMembers(teamMembers.map(m =>
      m.id === memberId ? { ...m, permission } : m
    ));
  };

  const assignSection = (sectionKey, memberId) => {
    setSectionAssignments({
      ...sectionAssignments,
      [sectionKey]: memberId || null
    });
  };

  const getDepartmentInfo = () => {
    return CSS_DEPARTMENTS.find(d => d.id === selectedDepartment);
  };

  const handleNext = () => {
    if (step === 1 && (!selectedDepartment || !tomOwner)) {
      alert('Please select a department and enter TOM Owner name');
      return;
    }
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleLaunch = () => {
    const deptInfo = getDepartmentInfo();
    const projectData = {
      id: `project-${Date.now()}`,
      department: {
        id: selectedDepartment,
        name: deptInfo?.name || selectedDepartment,
        fullName: deptInfo?.fullName || '',
        division: 'CSS - Culinary Shared Services',
      },
      projectName: projectName || `${deptInfo?.name} TOM Project`,
      hod: {
        name: tomOwner,
        email: '',
      },
      teamMembers: teamMembers,
      sectionAssignments: sectionAssignments,
      activityLog: [{
        id: `act-${Date.now()}`,
        type: 'project_created',
        message: `Project created by ${tomOwner}`,
        timestamp: new Date().toISOString(),
        user: tomOwner
      }],
      createdAt: new Date().toISOString(),
      status: 'in_progress'
    };
    onComplete(projectData);
  };

  const getMemberName = (memberId) => {
    if (!memberId) return null;
    const member = teamMembers.find(m => m.id === memberId);
    return member?.name || null;
  };

  return (
    <div className="min-h-screen bg-ekfc-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-ekfc-red to-ekfc-darkred text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-2">Create New TOM Project</h1>
          <p className="text-red-100">Set up your department's Target Operating Model mapping</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Department', icon: Building2 },
              { num: 2, label: 'Team', icon: Users },
              { num: 3, label: 'Launch', icon: Rocket }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  step === s.num ? 'bg-ekfc-red text-white' :
                  step > s.num ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {step > s.num ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <s.icon className="w-5 h-5" />
                  )}
                  <span className="font-medium">{s.label}</span>
                </div>
                {idx < 2 && (
                  <div className={`w-16 h-1 mx-2 rounded ${step > s.num ? 'bg-green-400' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

          {/* Step 1: Department Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Project Setup</h2>
                <p className="text-gray-600">Select your CSS department and project details</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CSS Department *
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ekfc-red focus:border-ekfc-red"
                  >
                    <option value="">Select your department...</option>
                    {CSS_DEPARTMENTS.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name} - {dept.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder={selectedDepartment ? `${getDepartmentInfo()?.name} TOM Project` : 'e.g., FT TOM Project'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ekfc-red focus:border-ekfc-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    TOM Owner (HOD) *
                  </label>
                  <input
                    type="text"
                    value={tomOwner}
                    onChange={(e) => setTomOwner(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ekfc-red focus:border-ekfc-red"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    As TOM Owner, you will have full editing rights and the ability to submit the final TOM for OpEx review.
                  </p>
                </div>
              </div>

              {/* Division info - fixed */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Division:</span> CSS - Culinary Shared Services
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Team Members */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Build Your Team</h2>
                <p className="text-gray-600">Add team members and assign TOM sections</p>
              </div>

              {/* Add Member Button/Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowAddMember(!showAddMember)}
                  className="flex items-center gap-2 px-4 py-2 bg-ekfc-red text-white rounded-lg font-medium hover:bg-ekfc-darkred transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Team Member
                </button>

                {showAddMember && availableMembers.length > 0 && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-64 overflow-y-auto">
                    {availableMembers.map(member => (
                      <button
                        key={member.id}
                        onClick={() => addTeamMember(member)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 text-left"
                      >
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.role}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Team Members List */}
              {teamMembers.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">Team Members ({teamMembers.length})</h3>
                  {teamMembers.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-700 font-medium">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <select
                          value={member.permission}
                          onChange={(e) => updateMemberPermission(member.id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="edit">Can Edit</option>
                          <option value="view">View Only</option>
                        </select>
                        <button
                          onClick={() => removeTeamMember(member.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">No team members added yet</p>
                  <p className="text-sm text-gray-500">Add team members to assign TOM sections</p>
                </div>
              )}

              {/* Section Assignments */}
              {teamMembers.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Section Assignments</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Assign each TOM section to a team member. Each section can only have one owner.
                    Unassigned sections can be edited by HOD.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {SECTION_KEYS.map((key, index) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-sm font-medium text-gray-700">
                          {index + 1}. {SECTION_NAMES[key]}
                        </span>
                        <select
                          value={sectionAssignments[key] || ''}
                          onChange={(e) => assignSection(key, e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm min-w-[140px]"
                        >
                          <option value="">HOD (default)</option>
                          {teamMembers.filter(m => m.permission === 'edit').map(member => (
                            <option key={member.id} value={member.id}>
                              {member.name.split(' ')[0]}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review & Launch */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Review & Launch</h2>
                <p className="text-gray-600">Confirm your project setup before launching</p>
              </div>

              {/* Summary */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-ekfc-red" />
                    Project Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Department:</span> <strong>{getDepartmentInfo()?.name}</strong> - {getDepartmentInfo()?.fullName}</p>
                    <p><span className="text-gray-500">Project:</span> {projectName || `${getDepartmentInfo()?.name} TOM Project`}</p>
                    <p><span className="text-gray-500">TOM Owner:</span> {tomOwner}</p>
                    <p><span className="text-gray-500">Division:</span> CSS - Culinary Shared Services</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-ekfc-red" />
                    Team
                  </h3>
                  <div className="text-sm">
                    <p><span className="text-gray-500">Members:</span> <strong>{teamMembers.length}</strong> (+ TOM Owner)</p>
                    <p><span className="text-gray-500">With edit access:</span> {teamMembers.filter(m => m.permission === 'edit').length}</p>
                    <p><span className="text-gray-500">Sections assigned:</span> {Object.values(sectionAssignments).filter(Boolean).length} of 12</p>
                  </div>
                </div>
              </div>

              {/* Section Assignment Summary */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3">Section Ownership</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  {SECTION_KEYS.map((key, index) => {
                    const assignee = getMemberName(sectionAssignments[key]);
                    return (
                      <div key={key} className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${assignee ? 'bg-blue-500' : 'bg-gray-400'}`} />
                        <span className="text-gray-600">{index + 1}. {SECTION_NAMES[key]}:</span>
                        <span className="font-medium text-gray-900 truncate">
                          {assignee || 'HOD'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Launch Info */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Ready to Launch</h3>
                <p className="text-sm text-green-800">
                  Once launched, your team can start working on their assigned sections.
                  As TOM Owner, you can monitor progress, edit any section, and submit the final TOM for OpEx review.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={step === 1 ? onCancel : handleBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            {step === 1 ? 'Cancel' : 'Back'}
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-ekfc-red text-white rounded-lg font-medium hover:bg-ekfc-darkred transition-colors"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleLaunch}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <Rocket className="w-5 h-5" />
              Launch Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectSetupWizard;
