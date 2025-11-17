import React from 'react';

export default function ClockIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="20" stroke="#D22B2B" strokeWidth="2" />
      <circle cx="32" cy="32" r="2" fill="#C9A45B" />
      <line x1="32" y1="32" x2="32" y2="18" stroke="#C9A45B" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="32" x2="42" y2="32" stroke="#C9A45B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
