import React from 'react';
import BuildingIcon from '../icons/BuildingIcon';
import TargetIcon from '../icons/TargetIcon';
import ServiceIcon from '../icons/ServiceIcon';
import StakeholderIcon from '../icons/StakeholderIcon';
import ValueChainIcon from '../icons/ValueChainIcon';
import ClockIcon from '../icons/ClockIcon';
import KPIIcon from '../icons/KPIIcon';
import RACIIcon from '../icons/RACIIcon';
import GovernanceIcon from '../icons/GovernanceIcon';
import DependencyIcon from '../icons/DependencyIcon';
import RiskIcon from '../icons/RiskIcon';
import OpportunityIcon from '../icons/OpportunityIcon';
import DocumentIcon from '../icons/DocumentIcon';

export default function SimpleGraphic({ type }) {
  const graphics = {
    department: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <BuildingIcon />
      </div>
    ),

    purpose: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <TargetIcon />
      </div>
    ),

    services: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <ServiceIcon />
      </div>
    ),

    stakeholders: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <StakeholderIcon />
      </div>
    ),

    valueChain: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <ValueChainIcon />
      </div>
    ),

    sla: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <ClockIcon />
      </div>
    ),

    kpi: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <KPIIcon />
      </div>
    ),

    raci: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <RACIIcon />
      </div>
    ),

    governance: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <GovernanceIcon />
      </div>
    ),

    dependencies: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <DependencyIcon />
      </div>
    ),

    risks: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <RiskIcon />
      </div>
    ),

    opportunities: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <OpportunityIcon />
      </div>
    ),

    summary: (
      <div className="flex justify-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <DocumentIcon />
      </div>
    )
  };

  return graphics[type] || null;
}
