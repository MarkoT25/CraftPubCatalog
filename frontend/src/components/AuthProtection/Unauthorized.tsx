import { Link } from 'react-router-dom'

export const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-200 flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-surface-800 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-surface-700 mb-4">Access Denied</h2>
        <p className="text-surface-600 mb-6">
          You don't have permission to access this resource.
        </p>
        <Link 
          to="/" 
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
