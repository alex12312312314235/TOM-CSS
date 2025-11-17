import React from 'react';
import Tooltip from './Tooltip';

export default function InputField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  helper = '',
  tooltip = '',
  required = false,
  error = '',
  multiline = false,
  rows = 3,
  options = []
}) {
  const inputClasses = `input-field ${error ? 'border-red-500 focus:ring-red-500' : ''}`;

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1">
        <label htmlFor={name} className="label">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>

      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
        >
          <option value="">Select...</option>
          {options.map(opt => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          className={inputClasses}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}

      {helper && !error && <p className="helper-text">{helper}</p>}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
