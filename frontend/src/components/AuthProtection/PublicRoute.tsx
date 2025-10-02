import { ProtectedRoute } from './ProtectedRoute'

interface PublicRouteProps {
  children: React.ReactNode
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  return (
    <ProtectedRoute requireAuth={false} redirectTo="/">
      {children}
    </ProtectedRoute>
  )
}