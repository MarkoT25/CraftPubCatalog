import React from 'react'

interface FormInputProps {
  id: string
  name: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'number'
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  error?: string
  disabled?: boolean
  className?: string
  autoComplete?: string
}

export const FormInput = ({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  className = '',
  autoComplete,
}: FormInputProps) => {
  return (
    <div className={`mb-5 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-surface-600 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`
          w-full px-4 py-3 border rounded-lg text-base text-surface-800 bg-white 
          transition-all duration-200 placeholder-surface-400
          focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100
          disabled:bg-surface-100 disabled:cursor-not-allowed disabled:opacity-60
          ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
            : 'border-surface-300'
          }
        `}
      />
      {error && (
        <p className="text-red-600 text-xs mt-1.5 text-center">
          {error}
        </p>
      )}
    </div>
  )
}