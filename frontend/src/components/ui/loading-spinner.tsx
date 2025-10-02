interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
}

export const LoadingSpinner = ({ 
  size = 'md', 
  className = '',
  text
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div 
          className={`${sizeClasses[size]} rounded-full border-4 border-primary-200 animate-spin`}
        />
        {/* Inner spinning part */}
        <div 
          className={`${sizeClasses[size]} rounded-full border-4 border-transparent border-t-primary-600 absolute top-0 left-0 animate-spin`}
          style={{ animationDuration: '1s' }}
        />
      </div>
      
      {/* Optional text */}
      {text && (
        <p className={`mt-3 text-primary-600 font-medium ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  )
}

// Alternative spinner designs
export const PulseSpinner = ({ 
  size = 'md', 
  className = '' 
}: Pick<LoadingSpinnerProps, 'size' | 'className'>) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`${sizeClasses[size]} bg-primary-600 rounded-full animate-pulse`}
      />
    </div>
  )
}

export const DotsSpinner = ({ 
  size = 'md', 
  className = '' 
}: Pick<LoadingSpinnerProps, 'size' | 'className'>) => {
  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4'
  }

  const gapClasses = {
    sm: 'gap-1',
    md: 'gap-1.5',
    lg: 'gap-2',
    xl: 'gap-2.5'
  }

  return (
    <div className={`flex items-center justify-center ${gapClasses[size]} ${className}`}>
      <div 
        className={`${dotSizeClasses[size]} bg-primary-600 rounded-full animate-bounce`}
        style={{ animationDelay: '0ms' }}
      />
      <div 
        className={`${dotSizeClasses[size]} bg-primary-600 rounded-full animate-bounce`}
        style={{ animationDelay: '150ms' }}
      />
      <div 
        className={`${dotSizeClasses[size]} bg-primary-600 rounded-full animate-bounce`}
        style={{ animationDelay: '300ms' }}
      />
    </div>
  )
}

// Full page loading overlay
export const LoadingOverlay = ({ 
  text = "Loading..." 
}: { text?: string }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-50/80 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <LoadingSpinner size="lg" text={text} />
      </div>
    </div>
  )
}