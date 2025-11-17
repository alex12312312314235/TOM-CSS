import React from 'react';

export default function SimpleGraphic({ type }) {
  const graphics = {
    department: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-ekfc-red">
          <rect x="20" y="30" width="60" height="50" fill="none" stroke="currentColor" strokeWidth="2"/>
          <rect x="30" y="40" width="12" height="12" fill="currentColor" opacity="0.3"/>
          <rect x="58" y="40" width="12" height="12" fill="currentColor" opacity="0.3"/>
          <rect x="30" y="60" width="12" height="12" fill="currentColor" opacity="0.3"/>
          <rect x="58" y="60" width="12" height="12" fill="currentColor" opacity="0.3"/>
          <rect x="35" y="15" width="30" height="15" fill="currentColor"/>
        </svg>
      </div>
    ),

    purpose: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-ekfc-red">
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="50" cy="50" r="10" fill="currentColor"/>
          <polygon points="50,20 55,35 50,30 45,35" fill="#b38b2b"/>
        </svg>
      </div>
    ),

    services: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <svg width="120" height="100" viewBox="0 0 120 100" className="text-ekfc-red">
          <rect x="10" y="20" width="25" height="20" rx="2" fill="currentColor" opacity="0.7"/>
          <rect x="10" y="45" width="25" height="20" rx="2" fill="currentColor" opacity="0.7"/>
          <rect x="10" y="70" width="25" height="20" rx="2" fill="currentColor" opacity="0.7"/>
          <line x1="35" y1="30" x2="70" y2="50" stroke="currentColor" strokeWidth="2"/>
          <line x1="35" y1="55" x2="70" y2="50" stroke="currentColor" strokeWidth="2"/>
          <line x1="35" y1="80" x2="70" y2="50" stroke="currentColor" strokeWidth="2"/>
          <circle cx="85" cy="50" r="15" fill="none" stroke="#b38b2b" strokeWidth="2"/>
          <circle cx="85" cy="45" r="5" fill="#b38b2b"/>
          <path d="M 75,60 Q 85,65 95,60" fill="none" stroke="#b38b2b" strokeWidth="2"/>
        </svg>
      </div>
    ),

    stakeholders: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <svg width="120" height="100" viewBox="0 0 120 100" className="text-ekfc-red">
          <circle cx="60" cy="50" r="12" fill="currentColor"/>
          <circle cx="25" cy="30" r="8" fill="#b38b2b"/>
          <circle cx="25" cy="70" r="8" fill="#b38b2b"/>
          <circle cx="95" cy="30" r="8" fill="#b38b2b"/>
          <circle cx="95" cy="70" r="8" fill="#b38b2b"/>
          <line x1="33" y1="30" x2="48" y2="45" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="33" y1="70" x2="48" y2="55" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="72" y1="45" x2="87" y2="30" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="72" y1="55" x2="87" y2="70" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>
    ),

    valueChain: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <svg width="140" height="80" viewBox="0 0 140 80" className="text-ekfc-red">
          <rect x="10" y="25" width="30" height="30" rx="2" fill="#b38b2b" opacity="0.7"/>
          <text x="25" y="45" fill="white" fontSize="10" textAnchor="middle">IN</text>
          <rect x="55" y="25" width="30" height="30" rx="2" fill="currentColor"/>
          <text x="70" y="45" fill="white" fontSize="10" textAnchor="middle">DO</text>
          <rect x="100" y="25" width="30" height="30" rx="2" fill="#b38b2b" opacity="0.7"/>
          <text x="115" y="45" fill="white" fontSize="10" textAnchor="middle">OUT</text>
          <polygon points="43,40 48,37 48,43" fill="currentColor"/>
          <polygon points="88,40 93,37 93,43" fill="currentColor"/>
        </svg>
      </div>
    ),

    sla: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-ekfc-red">
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="50" cy="50" r="3" fill="currentColor"/>
          <line x1="50" y1="50" x2="50" y2="30" stroke="currentColor" strokeWidth="2"/>
          <line x1="50" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="2"/>
          <path d="M 65,35 L 75,30 L 70,40 Z" fill="#b38b2b"/>
        </svg>
      </div>
    ),

    kpi: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <svg width="100" height="80" viewBox="0 0 100 80" className="text-ekfc-red">
          <rect x="20" y="50" width="12" height="20" fill="currentColor" opacity="0.6"/>
          <rect x="38" y="35" width="12" height="35" fill="currentColor" opacity="0.8"/>
          <rect x="56" y="25" width="12" height="45" fill="currentColor"/>
          <rect x="74" y="40" width="12" height="30" fill="#b38b2b"/>
          <line x1="15" y1="70" x2="90" y2="70" stroke="currentColor" strokeWidth="1"/>
          <line x1="15" y1="70" x2="15" y2="15" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>
    ),

    raci: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <svg width="120" height="80" viewBox="0 0 120 80" className="text-ekfc-red">
          <rect x="15" y="30" width="18" height="40" fill="currentColor" opacity="0.5"/>
          <rect x="41" y="30" width="18" height="40" fill="#b38b2b" opacity="0.7"/>
          <rect x="67" y="30" width="18" height="40" fill="currentColor" opacity="0.5"/>
          <rect x="93" y="30" width="18" height="40" fill="currentColor" opacity="0.3"/>
          <text x="24" y="20" fill="currentColor" fontSize="12" textAnchor="middle" fontWeight="bold">R</text>
          <text x="50" y="20" fill="#b38b2b" fontSize="12" textAnchor="middle" fontWeight="bold">A</text>
          <text x="76" y="20" fill="currentColor" fontSize="12" textAnchor="middle" fontWeight="bold">C</text>
          <text x="102" y="20" fill="currentColor" fontSize="12" textAnchor="middle" fontWeight="bold">I</text>
        </svg>
      </div>
    ),

    governance: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-ekfc-red">
          <rect x="30" y="20" width="40" height="15" rx="2" fill="currentColor" opacity="0.5"/>
          <rect x="30" y="45" width="40" height="15" rx="2" fill="currentColor" opacity="0.7"/>
          <rect x="30" y="70" width="40" height="15" rx="2" fill="currentColor"/>
          <line x1="50" y1="35" x2="50" y2="45" stroke="#b38b2b" strokeWidth="2"/>
          <line x1="50" y1="60" x2="50" y2="70" stroke="#b38b2b" strokeWidth="2"/>
          <polygon points="50,42 48,38 52,38" fill="#b38b2b"/>
          <polygon points="50,67 48,63 52,63" fill="#b38b2b"/>
        </svg>
      </div>
    ),

    dependencies: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <svg width="120" height="100" viewBox="0 0 120 100" className="text-ekfc-red">
          <rect x="45" y="40" width="30" height="20" rx="2" fill="currentColor"/>
          <rect x="10" y="15" width="25" height="15" rx="2" fill="#b38b2b" opacity="0.6"/>
          <rect x="10" y="42" width="25" height="15" rx="2" fill="#b38b2b" opacity="0.6"/>
          <rect x="10" y="69" width="25" height="15" rx="2" fill="#b38b2b" opacity="0.6"/>
          <line x1="35" y1="22" x2="45" y2="45" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="35" y1="50" x2="45" y2="50" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="35" y1="77" x2="45" y2="55" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>
    ),

    risks: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-ekfc-red">
          <polygon points="50,20 80,70 20,70" fill="none" stroke="currentColor" strokeWidth="2"/>
          <polygon points="50,25 75,65 25,65" fill="currentColor" opacity="0.1"/>
          <circle cx="50" cy="45" r="3" fill="currentColor"/>
          <line x1="50" y1="50" x2="50" y2="60" stroke="currentColor" strokeWidth="3"/>
        </svg>
      </div>
    ),

    opportunities: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-ekfc-red">
          <circle cx="50" cy="55" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
          <rect x="47" y="30" width="6" height="18" fill="#b38b2b"/>
          <polygon points="50,28 45,38 55,38" fill="#b38b2b"/>
          <line x1="35" y1="70" x2="65" y2="40" stroke="currentColor" strokeWidth="2"/>
          <polygon points="65,40 60,45 60,40 65,40" fill="currentColor"/>
        </svg>
      </div>
    )
  };

  return graphics[type] || null;
}
