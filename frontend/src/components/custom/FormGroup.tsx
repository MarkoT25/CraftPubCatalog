import React from 'react'

interface FormGroupProps {
  children: React.ReactNode
  className?: string
  direction?: 'row' | 'column'
  gap?: 'sm' | 'md' | 'lg'
}

export const FormGroup = ({ 
  children, 
  className = '', 
  direction = 'column',
  gap = 'md'
}: FormGroupProps) => {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  }

  const directionClasses = {
    row: `flex ${gapClasses[gap]} max-sm:flex-col max-sm:gap-5`,
    column: `flex flex-col ${gapClasses[gap]}`
  }

  return (
    <div className={`${directionClasses[direction]} ${className}`}>
      {children}
    </div>
  )
}