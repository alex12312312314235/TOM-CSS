// Mock data for HOD Dashboard demonstration
// SAMPLE department with generic, understandable content

export const SECTION_NAMES = {
  department: 'Department Info',
  purpose: 'Purpose & Vision',
  serviceCatalogue: 'Services',
  stakeholders: 'Stakeholders',
  valueChain: 'Value Chain',
  slas: 'SLAs',
  kpis: 'KPIs',
  raci: 'RACI Matrix',
  governance: 'Governance',
  dependencies: 'Dependencies',
  risks: 'Risks',
  opportunities: 'Opportunities'
};

export const WORKFLOW_STATUSES = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  NEEDS_REVISION: 'needs_revision'
};

export const STATUS_LABELS = {
  draft: 'Draft',
  submitted: 'Submitted',
  under_review: 'Under Review',
  approved: 'Approved',
  needs_revision: 'Needs Revision'
};

export const STATUS_COLORS = {
  draft: 'gray',
  submitted: 'blue',
  under_review: 'yellow',
  approved: 'green',
  needs_revision: 'red'
};

// Sample TOM data - a generic "Customer Support" department that's easy to understand
export const SAMPLE_TOM_DATA = {
  department: {
    name: 'Customer Support',
    division: 'Operations',
    headcount: 25
  },
  purpose: {
    statement: 'To provide exceptional customer service that resolves issues quickly and builds lasting customer relationships',
    vision: 'To be recognized as the most responsive and helpful support team in the industry',
    mission: 'We help customers succeed by providing timely, accurate, and friendly support across all channels'
  },
  serviceCatalogue: [
    {
      serviceName: 'Phone Support',
      description: 'Live phone assistance for customer inquiries and issue resolution',
      type: 'Core',
      frequency: 'Daily'
    },
    {
      serviceName: 'Email Support',
      description: 'Written responses to customer questions and complaints',
      type: 'Core',
      frequency: 'Daily'
    },
    {
      serviceName: 'Live Chat',
      description: 'Real-time chat support on website and mobile app',
      type: 'Core',
      frequency: 'Daily'
    },
    {
      serviceName: 'Knowledge Base Management',
      description: 'Creating and updating help articles and FAQs',
      type: 'Support',
      frequency: 'Weekly'
    },
    {
      serviceName: 'Customer Feedback Analysis',
      description: 'Analyzing customer feedback to identify improvement areas',
      type: 'Strategic',
      frequency: 'Monthly'
    }
  ],
  stakeholders: [
    {
      name: 'End Customers',
      role: 'Primary Users',
      relationship: 'Customer',
      expectations: 'Quick resolution, friendly service, accurate information'
    },
    {
      name: 'Product Team',
      role: 'Internal Partner',
      relationship: 'Partner',
      expectations: 'Bug reports, feature requests, customer insights'
    },
    {
      name: 'Sales Team',
      role: 'Internal Partner',
      relationship: 'Partner',
      expectations: 'Lead handoffs, customer satisfaction data'
    },
    {
      name: 'VP Operations',
      role: 'Leadership',
      relationship: 'Supplier',
      expectations: 'Cost efficiency, quality metrics, team performance'
    }
  ],
  valueChain: {
    inputs: [
      { name: 'Customer Inquiries', source: 'Phone/Email/Chat', frequency: 'Daily' },
      { name: 'Product Documentation', source: 'Product Team', frequency: 'Weekly' },
      { name: 'System Access', source: 'IT Department', frequency: 'As needed' }
    ],
    activities: [
      { name: 'Ticket Triage', description: 'Categorize and prioritize incoming requests', owner: 'Support Agents', criticality: 'High' },
      { name: 'Issue Resolution', description: 'Investigate and solve customer problems', owner: 'Support Agents', criticality: 'High' },
      { name: 'Escalation Management', description: 'Route complex issues to specialists', owner: 'Team Lead', criticality: 'Medium' },
      { name: 'Quality Assurance', description: 'Review interactions for quality', owner: 'QA Specialist', criticality: 'Medium' }
    ],
    outputs: [
      { name: 'Resolved Tickets', recipient: 'Customers', quality: 'First contact resolution target: 70%' },
      { name: 'Customer Satisfaction Scores', recipient: 'Management', quality: 'CSAT target: 4.5/5' },
      { name: 'Bug Reports', recipient: 'Product Team', quality: 'Detailed reproduction steps' }
    ]
  },
  slas: [
    { service: 'Phone Support', metric: 'Average Wait Time', target: '< 2 minutes', measurement: 'Call system analytics' },
    { service: 'Email Support', metric: 'First Response Time', target: '< 4 hours', measurement: 'Ticket system tracking' },
    { service: 'Live Chat', metric: 'Response Time', target: '< 30 seconds', measurement: 'Chat platform metrics' },
    { service: 'All Channels', metric: 'Resolution Time', target: '< 24 hours', measurement: 'Ticket lifecycle tracking' }
  ],
  kpis: [
    { name: 'Customer Satisfaction (CSAT)', description: 'Post-interaction satisfaction rating', target: '4.5 / 5.0', category: 'Quality', frequency: 'Daily', owner: 'Team Lead' },
    { name: 'First Contact Resolution', description: 'Issues resolved in first interaction', target: '70%', category: 'Efficiency', frequency: 'Weekly', owner: 'Manager' },
    { name: 'Average Handle Time', description: 'Time spent per customer interaction', target: '8 minutes', category: 'Efficiency', frequency: 'Daily', owner: 'Team Lead' },
    { name: 'Net Promoter Score', description: 'Customer likelihood to recommend', target: '> 50', category: 'Quality', frequency: 'Monthly', owner: 'Manager' },
    { name: 'Ticket Volume', description: 'Total tickets handled', target: 'Track trend', category: 'Volume', frequency: 'Daily', owner: 'Manager' }
  ],
  raci: [
    { activity: 'Handle customer calls', responsible: 'Support Agents', accountable: 'Team Lead', consulted: 'Product Team', informed: 'Manager' },
    { activity: 'Escalate complex issues', responsible: 'Team Lead', accountable: 'Manager', consulted: 'Technical Specialists', informed: 'VP Operations' },
    { activity: 'Update knowledge base', responsible: 'Content Specialist', accountable: 'Team Lead', consulted: 'Support Agents', informed: 'Product Team' },
    { activity: 'Report weekly metrics', responsible: 'Team Lead', accountable: 'Manager', consulted: 'QA Specialist', informed: 'VP Operations' }
  ],
  governance: {
    forums: [
      { name: 'Daily Standup', purpose: 'Review tickets, blockers, priorities', frequency: 'Daily', participants: 'All team members', decisions: 'Daily priorities, escalations' },
      { name: 'Weekly Team Meeting', purpose: 'Performance review, process improvements', frequency: 'Weekly', participants: 'Team Lead, Manager, Agents', decisions: 'Process changes, training needs' },
      { name: 'Monthly Business Review', purpose: 'KPI review, strategic planning', frequency: 'Monthly', participants: 'Manager, VP Operations', decisions: 'Staffing, budget, goals' }
    ],
    escalationPath: 'Agent → Team Lead → Manager → VP Operations → COO',
    decisionRights: 'Agents can offer refunds up to $50. Team Leads can approve up to $200. Manager approval needed above $200.'
  },
  dependencies: [
    { on: 'CRM System (Salesforce)', type: 'Technology', criticality: 'High', impact: 'Cannot access customer history or log interactions' },
    { on: 'Product Team', type: 'Internal Team', criticality: 'Medium', impact: 'Delayed information on new features and known bugs' },
    { on: 'IT Help Desk', type: 'Internal Team', criticality: 'High', impact: 'System access issues prevent customer service' }
  ],
  risks: [
    { description: 'High agent turnover leading to knowledge loss', type: 'Operational', likelihood: 'Medium', impact: 'High', mitigation: 'Comprehensive onboarding program and knowledge documentation' },
    { description: 'System outages during peak hours', type: 'Technology', likelihood: 'Low', impact: 'High', mitigation: 'Redundant systems and manual backup procedures' },
    { description: 'Seasonal volume spikes overwhelming capacity', type: 'Operational', likelihood: 'High', impact: 'Medium', mitigation: 'Flexible staffing model with temporary agents' }
  ],
  opportunities: [
    { description: 'Implement AI chatbot for common questions', type: 'Automation', effort: 'Medium', impact: 'High', timeframe: 'Q2 2025' },
    { description: 'Add video support channel for complex issues', type: 'Service Expansion', effort: 'Medium', impact: 'Medium', timeframe: 'Q3 2025' },
    { description: 'Cross-train agents on multiple product lines', type: 'Training', effort: 'Low', impact: 'Medium', timeframe: 'Q1 2025' }
  ],
  metadata: {
    createdDate: '2024-11-15T10:00:00Z',
    lastModified: '2024-12-01T14:30:00Z',
    version: '1.2',
    author: 'Sarah Johnson'
  },
  workflow: {
    id: 'tom-sample-001',
    status: 'approved',
    submittedAt: '2024-11-20T09:00:00Z',
    submittedBy: { name: 'Sarah Johnson', email: 'sarah.j@company.com' },
    reviewedAt: '2024-11-22T11:00:00Z',
    reviewedBy: { name: 'Mike Chen', email: 'mike.c@company.com' },
    approvedAt: '2024-11-25T16:00:00Z',
    approvedBy: { name: 'Lisa Wong', email: 'lisa.w@company.com' },
    version: 1,
    revisionHistory: []
  },
  reviews: [
    {
      id: 'rev-001',
      reviewerName: 'Mike Chen',
      reviewerRole: 'auditor',
      comment: 'Excellent detail on SLAs and KPIs. The escalation path is clearly defined.',
      section: 'overall',
      status: 'approved',
      createdAt: '2024-11-22T11:00:00Z'
    }
  ]
};

// Additional mock departments for the dashboard (showing variety of statuses)
export const MOCK_DEPARTMENTS = [
  {
    id: 'dept-sample',
    name: 'SAMPLE - Customer Support',
    division: 'Operations',
    tomData: SAMPLE_TOM_DATA,
    workflowStatus: 'approved',
    completeness: 100,
    submittedBy: 'Sarah Johnson',
    submittedAt: '2024-11-20T09:00:00Z',
    lastUpdated: '2024-12-01T14:30:00Z'
  },
  {
    id: 'dept-marketing',
    name: 'Marketing',
    division: 'Commercial',
    tomData: null, // Not started
    workflowStatus: 'draft',
    completeness: 0,
    submittedBy: null,
    submittedAt: null,
    lastUpdated: null
  },
  {
    id: 'dept-finance',
    name: 'Finance & Accounting',
    division: 'Corporate Services',
    tomData: createPartialTOM('Finance & Accounting', 45),
    workflowStatus: 'draft',
    completeness: 45,
    submittedBy: null,
    submittedAt: null,
    lastUpdated: '2024-11-28T10:15:00Z'
  },
  {
    id: 'dept-hr',
    name: 'Human Resources',
    division: 'Corporate Services',
    tomData: createPartialTOM('Human Resources', 75),
    workflowStatus: 'submitted',
    completeness: 75,
    submittedBy: 'John Smith',
    submittedAt: '2024-12-02T08:00:00Z',
    lastUpdated: '2024-12-02T08:00:00Z'
  },
  {
    id: 'dept-it',
    name: 'IT Services',
    division: 'Technology',
    tomData: createPartialTOM('IT Services', 90),
    workflowStatus: 'under_review',
    completeness: 90,
    submittedBy: 'Alex Kumar',
    submittedAt: '2024-11-30T14:00:00Z',
    lastUpdated: '2024-12-01T09:00:00Z'
  },
  {
    id: 'dept-procurement',
    name: 'Procurement',
    division: 'Operations',
    tomData: createPartialTOM('Procurement', 60),
    workflowStatus: 'needs_revision',
    completeness: 60,
    submittedBy: 'Emma Wilson',
    submittedAt: '2024-11-25T11:00:00Z',
    lastUpdated: '2024-11-27T16:00:00Z'
  }
];

// Helper function to create partial TOM data for demo purposes
function createPartialTOM(deptName, completeness) {
  const base = {
    department: { name: deptName, division: '', headcount: 0 },
    purpose: { statement: '', vision: '', mission: '' },
    serviceCatalogue: [],
    stakeholders: [],
    valueChain: { inputs: [], activities: [], outputs: [] },
    slas: [],
    kpis: [],
    raci: [],
    governance: { forums: [], escalationPath: '', decisionRights: '' },
    dependencies: [],
    risks: [],
    opportunities: [],
    metadata: { createdDate: new Date().toISOString(), lastModified: new Date().toISOString(), version: '1.0', author: 'TOM Builder' },
    workflow: { id: `tom-${deptName.toLowerCase().replace(/\s/g, '-')}`, status: 'draft', submittedAt: null, submittedBy: null },
    reviews: []
  };

  // Fill in data based on completeness percentage
  if (completeness >= 20) {
    base.department = { name: deptName, division: 'Corporate', headcount: 15 };
    base.purpose = { statement: `To deliver excellent ${deptName.toLowerCase()} services`, vision: '', mission: '' };
  }
  if (completeness >= 40) {
    base.purpose.vision = `Be the best ${deptName.toLowerCase()} team`;
    base.serviceCatalogue = [
      { serviceName: 'Core Service 1', description: 'Primary service offering', type: 'Core', frequency: 'Daily' },
      { serviceName: 'Core Service 2', description: 'Secondary service offering', type: 'Core', frequency: 'Weekly' }
    ];
    base.stakeholders = [
      { name: 'Internal Teams', role: 'Customers', relationship: 'Customer', expectations: 'Timely service' }
    ];
  }
  if (completeness >= 60) {
    base.valueChain = {
      inputs: [{ name: 'Requests', source: 'Internal Teams', frequency: 'Daily' }],
      activities: [{ name: 'Process requests', description: 'Handle incoming requests', owner: 'Team', criticality: 'High' }],
      outputs: [{ name: 'Completed work', recipient: 'Requestor', quality: 'High quality' }]
    };
    base.slas = [{ service: 'Core Service', metric: 'Response Time', target: '< 24 hours', measurement: 'Tracking system' }];
  }
  if (completeness >= 75) {
    base.kpis = [
      { name: 'Customer Satisfaction', description: 'Internal customer rating', target: '4.0/5.0', category: 'Quality', frequency: 'Monthly', owner: 'Manager' },
      { name: 'Turnaround Time', description: 'Average processing time', target: '< 48 hours', category: 'Efficiency', frequency: 'Weekly', owner: 'Team Lead' }
    ];
    base.raci = [
      { activity: 'Process requests', responsible: 'Team Members', accountable: 'Manager', consulted: 'Stakeholders', informed: 'Leadership' }
    ];
  }
  if (completeness >= 90) {
    base.governance = {
      forums: [{ name: 'Weekly Team Meeting', purpose: 'Review and planning', frequency: 'Weekly', participants: 'All team', decisions: 'Priorities' }],
      escalationPath: 'Team → Manager → Director',
      decisionRights: 'Team handles standard requests, Manager approves exceptions'
    };
    base.dependencies = [{ on: 'IT Systems', type: 'Technology', criticality: 'High', impact: 'Service disruption' }];
    base.risks = [{ description: 'Resource constraints', type: 'Operational', likelihood: 'Medium', impact: 'Medium', mitigation: 'Cross-training' }];
    base.opportunities = [{ description: 'Process automation', type: 'Efficiency', effort: 'Medium', impact: 'High', timeframe: 'Q2 2025' }];
  }

  return base;
}

// Get section RAG status for a TOM
export function getTOMSectionStatus(tomData) {
  if (!tomData) {
    return Object.keys(SECTION_NAMES).reduce((acc, key) => {
      acc[key] = 'red';
      return acc;
    }, {});
  }

  return {
    department: tomData.department?.name ? 'green' : 'red',
    purpose: tomData.purpose?.statement ? 'green' : (tomData.purpose?.vision || tomData.purpose?.mission ? 'amber' : 'red'),
    serviceCatalogue: getArrayStatus(tomData.serviceCatalogue, 3),
    stakeholders: getArrayStatus(tomData.stakeholders, 3),
    valueChain: getValueChainStatus(tomData.valueChain),
    slas: getArrayStatus(tomData.slas, 2),
    kpis: getArrayStatus(tomData.kpis, 3),
    raci: getArrayStatus(tomData.raci, 3),
    governance: tomData.governance?.forums?.length > 0 ? 'green' : (tomData.governance?.escalationPath ? 'amber' : 'red'),
    dependencies: getArrayStatus(tomData.dependencies, 2),
    risks: getArrayStatus(tomData.risks, 2),
    opportunities: getArrayStatus(tomData.opportunities, 2)
  };
}

function getArrayStatus(arr, minCount) {
  if (!arr || arr.length === 0) return 'red';
  if (arr.length < minCount) return 'amber';
  return 'green';
}

function getValueChainStatus(valueChain) {
  if (!valueChain) return 'red';
  const hasInputs = valueChain.inputs?.length > 0;
  const hasActivities = valueChain.activities?.length > 0;
  const hasOutputs = valueChain.outputs?.length > 0;
  const count = [hasInputs, hasActivities, hasOutputs].filter(Boolean).length;
  if (count === 3) return 'green';
  if (count >= 1) return 'amber';
  return 'red';
}
