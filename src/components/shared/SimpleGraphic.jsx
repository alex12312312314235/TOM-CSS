import React from 'react';

export default function SimpleGraphic({ type }) {
  const graphics = {
    department: (
      <div className="text-center py-4 font-mono text-gray-600 text-sm bg-gray-50 rounded-lg">
        <pre>{`
    ┌─────────────────┐
    │   DEPARTMENT    │
    │                 │
    │  👥 Team        │
    │  📋 Services    │
    │  🎯 Goals       │
    └─────────────────┘
        `}</pre>
      </div>
    ),

    purpose: (
      <div className="text-center py-4 font-mono text-gray-600 text-sm bg-gray-50 rounded-lg">
        <pre>{`
         WHY WE EXIST
              │
              ▼
    ┌──────────────────┐
    │ Purpose Statement│
    └──────────────────┘
              │
              ▼
       What we deliver
        `}</pre>
      </div>
    ),

    services: (
      <div className="text-center py-4 font-mono text-gray-600 text-sm bg-gray-50 rounded-lg">
        <pre>{`
    Service 1 ────┐
    Service 2 ────┤──► Customers
    Service 3 ────┘
        `}</pre>
      </div>
    ),

    stakeholders: (
      <div className="text-center py-4 font-mono text-gray-600 text-sm bg-gray-50 rounded-lg">
        <pre>{`
    Customer ◄────┐
    Partner  ◄────┤ YOUR TEAM
    Supplier ◄────┘
        `}</pre>
      </div>
    ),

    valueChain: (
      <div className="text-center py-4 font-mono text-gray-600 text-sm bg-gray-50 rounded-lg">
        <pre>{`
    INPUTS ──► ACTIVITIES ──► OUTPUTS
       │           │             │
       └───────────┴─────────────┘
            Value Creation
        `}</pre>
      </div>
    ),

    sla: (
      <div className="text-center py-4 font-mono text-gray-600 text-sm bg-gray-50 rounded-lg">
        <pre>{`
    Service: Response Time
         │
         ▼
    Target: < 2 hours
         │
         ▼
    Measure: Track & Report
        `}</pre>
      </div>
    ),

    kpi: (
      <div className="text-center py-4 font-mono text-gray-600 text-sm bg-gray-50 rounded-lg">
        <pre>{`
    📊 KPI Dashboard

    Quality    ████████░░ 80%
    Speed      ██████████ 100%
    Cost       ██████░░░░ 60%
        `}</pre>
      </div>
    ),

    raci: (
      <div className="text-center py-4 font-mono text-gray-600 text-sm bg-gray-50 rounded-lg">
        <pre>{`
    R = Does the work
    A = Approves (one only!)
    C = Consulted before
    I = Informed after
        `}</pre>
      </div>
    ),

    governance: (
      <div className="text-center py-4 font-mono text-gray-600 text-sm bg-gray-50 rounded-lg">
        <pre>{`
    Weekly Team Meeting
           │
           ▼
    Monthly Review
           │
           ▼
    Quarterly Planning
        `}</pre>
      </div>
    ),

    dependencies: (
      <div className="text-center py-4 font-mono text-gray-600 text-sm bg-gray-50 rounded-lg">
        <pre>{`
    Your Team
        │
        ├──► IT System
        ├──► Finance Team
        └──► External Data
        `}</pre>
      </div>
    ),

    risks: (
      <div className="text-center py-4 font-mono text-gray-600 text-sm bg-gray-50 rounded-lg">
        <pre>{`
    ⚠️  Risk
        │
        ├─► Impact?
        ├─► Likelihood?
        └─► Mitigation?
        `}</pre>
      </div>
    ),

    opportunities: (
      <div className="text-center py-4 font-mono text-gray-600 text-sm bg-gray-50 rounded-lg">
        <pre>{`
    💡 Opportunity
        │
        ├─► Effort: Low/Med/High
        ├─► Impact: Low/Med/High
        └─► Timeframe: When?
        `}</pre>
      </div>
    )
  };

  return graphics[type] || null;
}
