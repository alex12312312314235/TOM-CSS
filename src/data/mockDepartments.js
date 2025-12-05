// Mock data for HOD Dashboard demonstration
// CSS (Culinary Shared Services) departments

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

// Helper function to create partial TOM data for demo purposes
function createPartialTOM(deptName, division, completeness) {
  const base = {
    department: { name: deptName, division: division, headcount: 0 },
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
    workflow: { id: `tom-${deptName.toLowerCase().replace(/\s+/g, '-')}`, status: 'draft', submittedAt: null, submittedBy: null },
    reviews: []
  };

  // Fill in data based on completeness percentage
  if (completeness >= 20) {
    base.department = { name: deptName, division: division, headcount: Math.floor(Math.random() * 20) + 5 };
    base.purpose = { statement: `To deliver excellent ${deptName.toLowerCase()} services for CSS`, vision: '', mission: '' };
  }
  if (completeness >= 40) {
    base.purpose.vision = `Be the leading ${deptName.toLowerCase()} team in the region`;
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
      escalationPath: 'Team → Manager → Director → VP',
      decisionRights: 'Team handles standard requests, Manager approves exceptions'
    };
    base.dependencies = [{ on: 'IT Systems', type: 'Technology', criticality: 'High', impact: 'Service disruption' }];
    base.risks = [{ description: 'Resource constraints', type: 'Operational', likelihood: 'Medium', impact: 'Medium', mitigation: 'Cross-training' }];
    base.opportunities = [{ description: 'Process automation', type: 'Efficiency', effort: 'Medium', impact: 'High', timeframe: 'Q2 2025' }];
  }

  return base;
}

// CSS Departments - matching the screenshot
export const MOCK_DEPARTMENTS = [
  {
    id: 'dept-concept-dev',
    name: 'Concept Development',
    division: 'CSS',
    tomData: createPartialTOM('Concept Development', 'CSS', 0),
    workflowStatus: 'draft',
    completeness: 0,
    submittedBy: null,
    submittedAt: null,
    lastUpdated: null
  },
  {
    id: 'dept-standards',
    name: 'Standards & Specifications',
    division: 'CSS',
    tomData: createPartialTOM('Standards & Specifications', 'CSS', 0),
    workflowStatus: 'draft',
    completeness: 0,
    submittedBy: null,
    submittedAt: null,
    lastUpdated: null
  },
  {
    id: 'dept-food-tech',
    name: 'Food Technology',
    division: 'CSS',
    tomData: createPartialTOM('Food Technology', 'CSS', 65),
    workflowStatus: 'submitted',
    completeness: 65,
    submittedBy: 'Ahmed Hassan',
    submittedAt: '2024-12-01T10:00:00Z',
    lastUpdated: '2024-12-01T10:00:00Z'
  },
  {
    id: 'dept-health-diet',
    name: 'Health & Dietetics',
    division: 'CSS',
    tomData: createPartialTOM('Health & Dietetics', 'CSS', 0),
    workflowStatus: 'draft',
    completeness: 0,
    submittedBy: null,
    submittedAt: null,
    lastUpdated: null
  },
  {
    id: 'dept-insights',
    name: 'Insights & Intelligence',
    division: 'CSS',
    tomData: createPartialTOM('Insights & Intelligence', 'CSS', 0),
    workflowStatus: 'draft',
    completeness: 0,
    submittedBy: null,
    submittedAt: null,
    lastUpdated: null
  },
  // SAMPLE department for reference/demo
  {
    id: 'dept-sample',
    name: 'SAMPLE - Customer Support',
    division: 'Demo',
    tomData: {
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
        { serviceName: 'Phone Support', description: 'Live phone assistance for customer inquiries', type: 'Core', frequency: 'Daily' },
        { serviceName: 'Email Support', description: 'Written responses to customer questions', type: 'Core', frequency: 'Daily' },
        { serviceName: 'Live Chat', description: 'Real-time chat support on website', type: 'Core', frequency: 'Daily' }
      ],
      stakeholders: [
        { name: 'End Customers', role: 'Primary Users', relationship: 'Customer', expectations: 'Quick resolution, friendly service' },
        { name: 'Product Team', role: 'Internal Partner', relationship: 'Partner', expectations: 'Bug reports, customer insights' },
        { name: 'VP Operations', role: 'Leadership', relationship: 'Supplier', expectations: 'Cost efficiency, quality metrics' }
      ],
      valueChain: {
        inputs: [
          { name: 'Customer Inquiries', source: 'Phone/Email/Chat', frequency: 'Daily' },
          { name: 'Product Documentation', source: 'Product Team', frequency: 'Weekly' }
        ],
        activities: [
          { name: 'Ticket Triage', description: 'Categorize and prioritize incoming requests', owner: 'Support Agents', criticality: 'High' },
          { name: 'Issue Resolution', description: 'Investigate and solve customer problems', owner: 'Support Agents', criticality: 'High' }
        ],
        outputs: [
          { name: 'Resolved Tickets', recipient: 'Customers', quality: 'First contact resolution target: 70%' },
          { name: 'Customer Satisfaction Scores', recipient: 'Management', quality: 'CSAT target: 4.5/5' }
        ]
      },
      slas: [
        { service: 'Phone Support', metric: 'Average Wait Time', target: '< 2 minutes', measurement: 'Call system analytics' },
        { service: 'Email Support', metric: 'First Response Time', target: '< 4 hours', measurement: 'Ticket system tracking' }
      ],
      kpis: [
        { name: 'Customer Satisfaction (CSAT)', description: 'Post-interaction satisfaction rating', target: '4.5 / 5.0', category: 'Quality', frequency: 'Daily', owner: 'Team Lead' },
        { name: 'First Contact Resolution', description: 'Issues resolved in first interaction', target: '70%', category: 'Efficiency', frequency: 'Weekly', owner: 'Manager' },
        { name: 'Average Handle Time', description: 'Time spent per customer interaction', target: '8 minutes', category: 'Efficiency', frequency: 'Daily', owner: 'Team Lead' }
      ],
      raci: [
        { activity: 'Handle customer calls', responsible: 'Support Agents', accountable: 'Team Lead', consulted: 'Product Team', informed: 'Manager' },
        { activity: 'Escalate complex issues', responsible: 'Team Lead', accountable: 'Manager', consulted: 'Technical Specialists', informed: 'VP Operations' }
      ],
      governance: {
        forums: [
          { name: 'Daily Standup', purpose: 'Review tickets, blockers, priorities', frequency: 'Daily', participants: 'All team members', decisions: 'Daily priorities' },
          { name: 'Weekly Team Meeting', purpose: 'Performance review, process improvements', frequency: 'Weekly', participants: 'Team Lead, Manager', decisions: 'Process changes' }
        ],
        escalationPath: 'Agent → Team Lead → Manager → VP Operations',
        decisionRights: 'Agents can offer refunds up to $50. Team Leads approve up to $200.'
      },
      dependencies: [
        { on: 'CRM System (Salesforce)', type: 'Technology', criticality: 'High', impact: 'Cannot access customer history' },
        { on: 'IT Help Desk', type: 'Internal Team', criticality: 'High', impact: 'System access issues' }
      ],
      risks: [
        { description: 'High agent turnover leading to knowledge loss', type: 'Operational', likelihood: 'Medium', impact: 'High', mitigation: 'Comprehensive onboarding program' },
        { description: 'System outages during peak hours', type: 'Technology', likelihood: 'Low', impact: 'High', mitigation: 'Redundant systems' }
      ],
      opportunities: [
        { description: 'Implement AI chatbot for common questions', type: 'Automation', effort: 'Medium', impact: 'High', timeframe: 'Q2 2025' },
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
        submittedBy: { name: 'Sarah Johnson', email: 'sarah.j@company.com' }
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
    },
    workflowStatus: 'approved',
    completeness: 100,
    submittedBy: 'Sarah Johnson',
    submittedAt: '2024-11-20T09:00:00Z',
    lastUpdated: '2024-12-01T14:30:00Z'
  }
];

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
