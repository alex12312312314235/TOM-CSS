import React from 'react';

export default function InfoCard({ title, children }) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-ekfc-gold/30 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-ekfc-gold/20 flex items-center justify-center mt-0.5">
          <svg className="w-3 h-3 text-ekfc-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          {title && <h3 className="text-sm font-semibold text-gray-900 mb-2">{title}</h3>}
          <div className="text-sm text-gray-700 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
