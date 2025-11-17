import React from 'react';
import { Check } from 'lucide-react';
import InfoCard from './InfoCard';

const STEP_NAMES = [
  'Department Information',
  'Purpose Statement',
  'Service Catalogue',
  'Stakeholders',
  'Value Chain',
  'SLAs',
  'KPIs',
  'RACI Matrix',
  'Governance',
  'Dependencies',
  'Risks & Pain Points',
  'Opportunities',
  'Summary & Export'
];

export default function StepSidebar({ currentStep, infoContent }) {
  return (
    <div className="space-y-6">
      {/* Progress List */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
          Your Progress
        </h3>
        <div className="space-y-1">
          {STEP_NAMES.map((name, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isPending = stepNumber > currentStep;

            return (
              <div
                key={stepNumber}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm
                  ${isCurrent ? 'bg-ekfc-red text-white font-medium' : ''}
                  ${isCompleted ? 'text-ekfc-gold' : ''}
                  ${isPending ? 'text-gray-400' : ''}
                `}
              >
                <div className={`
                  flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium
                  ${isCurrent ? 'bg-white text-ekfc-red' : ''}
                  ${isCompleted ? 'bg-ekfc-gold text-white' : ''}
                  ${isPending ? 'bg-gray-200 text-gray-500' : ''}
                `}>
                  {isCompleted ? <Check className="w-3 h-3" /> : stepNumber}
                </div>
                <span className="flex-1 truncate">{name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Content */}
      {infoContent && (
        <InfoCard title="What's this for?">
          {infoContent}
        </InfoCard>
      )}
    </div>
  );
}
