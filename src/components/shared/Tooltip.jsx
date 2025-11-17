import React, { useState } from 'react';
import { Info } from 'lucide-react';

export default function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children || <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />}
      </div>

      {isVisible && (
        <div className="absolute z-50 w-64 p-3 text-sm bg-gray-900 text-white rounded-lg shadow-lg bottom-full left-1/2 transform -translate-x-1/2 mb-2">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
}
