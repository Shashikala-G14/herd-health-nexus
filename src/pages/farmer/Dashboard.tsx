import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Bell, Shield, TrendingUp, AlertTriangle } from 'lucide-react'

const Dashboard = () => {
  const { profile } = useAuth()
  const [dashboardData, setDashboardData] = useState({
    riskScore: 0,
    trainingProgress: 0,
    alertsCount: 0,
    complianceScore: 0
  })

  useEffect(() => {
    // Simulate dashboard data
    setDashboardData({
      riskScore: 75,
      trainingProgress: 60,
      alertsCount: 3,
      complianceScore: 85
    })
  }, [])

  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: 'Low', color: 'bg-green-500' }
    if (score < 70) return { level: 'Medium', color: 'bg-yellow-500' }
    return { level: 'High', color: 'bg-red-500' }
  }

  const riskInfo = getRiskLevel(dashboardData.riskScore)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {profile?.full_name}</p>
        </div>
        <Badge variant={profile?.premium_user ? "default" : "secondary"}>
          {profile?.premium_user ? "Premium" : "Basic"} User
        </Badge>
      </div>

      {dashboardData.alertsCount > 0 && (
        <Alert>
          <Bell className="h-4 w-4" />
          <AlertDescription>
            You have {dashboardData.alertsCount} new alerts. Check the alerts section for details.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Biosecurity Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{riskInfo.level}</div>
            <div className="flex items-center space-x-2 mt-2">
              <Progress value={dashboardData.riskScore} className="flex-1" />
              <span className="text-sm text-muted-foreground">{dashboardData.riskScore}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Training Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.trainingProgress}%</div>
            <div className="flex items-center space-x-2 mt-2">
              <Progress value={dashboardData.trainingProgress} className="flex-1" />
              <span className="text-sm text-muted-foreground">Complete</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.alertsCount}</div>
            <p className="text-sm text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.complianceScore}%</div>
            <div className="flex items-center space-x-2 mt-2">
              <Progress value={dashboardData.complianceScore} className="flex-1" />
              <span className="text-sm text-muted-foreground">Good</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Completed Risk Assessment</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Training Module: Biosecurity Basics</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Alert: Disease outbreak nearby</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 text-left border rounded-lg hover:bg-accent/50 transition-colors">
                <Shield className="h-6 w-6 mb-2 text-primary" />
                <p className="font-medium">Risk Assessment</p>
                <p className="text-xs text-muted-foreground">Evaluate farm risks</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-accent/50 transition-colors">
                <TrendingUp className="h-6 w-6 mb-2 text-primary" />
                <p className="font-medium">Training</p>
                <p className="text-xs text-muted-foreground">Continue learning</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-accent/50 transition-colors">
                <Bell className="h-6 w-6 mb-2 text-primary" />
                <p className="font-medium">View Alerts</p>
                <p className="text-xs text-muted-foreground">Check notifications</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-accent/50 transition-colors">
                <AlertTriangle className="h-6 w-6 mb-2 text-primary" />
                <p className="font-medium">Report Issue</p>
                <p className="text-xs text-muted-foreground">Submit feedback</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard