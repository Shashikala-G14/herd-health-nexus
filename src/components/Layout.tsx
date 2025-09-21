import { useAuth } from '@/hooks/useAuth'
import { Navigate, Link, useLocation, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard, 
  Shield, 
  GraduationCap, 
  Bell, 
  User, 
  LogOut, 
  Users,
  BarChart3,
  Menu
} from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

const Layout = () => {
  const { user, profile, loading, signOut, isAuthenticated, isAdmin, isFarmer } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { toast } = useToast()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  const farmerNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/risk-assessment', label: 'Risk Assessment', icon: Shield },
    { path: '/training', label: 'Training', icon: GraduationCap },
    { path: '/alerts', label: 'Alerts', icon: Bell },
    { path: '/profile', label: 'Profile', icon: User }
  ]

  const adminNavItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/admin/farmers', label: 'Farmer Management', icon: Users },
    { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/admin/notifications', label: 'Send Notifications', icon: Bell }
  ]

  const navItems = isAdmin ? adminNavItems : farmerNavItems

  const handleSignOut = async () => {
    await signOut()
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out."
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 lg:px-6">
          <Button
            variant="ghost"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link to={isAdmin ? "/admin/dashboard" : "/dashboard"} className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">AgriShield</span>
            </Link>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <Badge variant={profile?.premium_user ? "default" : "secondary"}>
              {profile?.premium_user ? "Premium" : "Basic"}
            </Badge>
            <Badge variant="outline">
              {isAdmin ? "Policy Maker" : "Farmer"}
            </Badge>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{profile?.full_name}</span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 
          bg-background border-r transition-transform duration-200 ease-in-out
          lg:block pt-16 lg:pt-0
        `}>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium
                    transition-colors hover:bg-accent hover:text-accent-foreground
                    ${isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Layout