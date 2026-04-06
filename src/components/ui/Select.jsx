import React from "react";

export default function Select({ label, options = [], value, onChange, placeholder, disabled, className = "" }) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#8E8EA8] mb-2 px-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full h-[58px] px-6 rounded-full bg-[#F5F6FF] border-none text-[#14143A] font-medium outline-none appearance-none disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <option value="" disabled hidden>
            {placeholder || "Select an option"}
          </option>
          {options.map((opt) => (
            <option key={opt.id || opt.value || opt.code} value={opt.id || opt.value || opt.code}>
              {opt.text || opt.name || opt.label || opt.institutionName}
            </option>
          ))}
        </select>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="#9AA0B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
