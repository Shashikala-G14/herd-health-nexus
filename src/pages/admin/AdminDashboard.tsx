import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Users, AlertTriangle, TrendingUp, Shield, Send, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

const AdminDashboard = () => {
  const { toast } = useToast()
  
  // Mock data - in real app, this would come from Supabase
  const [dashboardData] = useState({
    totalFarmers: 2847,
    highRiskFarmers: 156,
    premiumUsers: 892,
    activeAlerts: 23,
    completionRate: 68,
    responseTime: 4.2
  })

  const stateData = [
    { state: 'Punjab', farmers: 785, highRisk: 45, issues: 12 },
    { state: 'Haryana', farmers: 623, highRisk: 38, issues: 8 },
    { state: 'UP', farmers: 892, highRisk: 52, issues: 15 },
    { state: 'Maharashtra', farmers: 456, highRisk: 18, issues: 5 },
    { state: 'Tamil Nadu', farmers: 91, highRisk: 3, issues: 2 }
  ]

  const riskDistribution = [
    { name: 'Low Risk', value: 65, color: '#10b981' },
    { name: 'Medium Risk', value: 28, color: '#f59e0b' },
    { name: 'High Risk', value: 7, color: '#ef4444' }
  ]

  const sendNotification = (targetGroup: string) => {
    toast({
      title: "Notification Sent",
      description: `Alert sent to ${targetGroup} farmers successfully`
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Policy Maker Dashboard</h1>
        <p className="text-muted-foreground">Monitor farmer activities and biosecurity status</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalFarmers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">High Risk Farms</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{dashboardData.highRiskFarmers}</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.premiumUsers}</div>
            <p className="text-xs text-muted-foreground">31% of total farmers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.activeAlerts}</div>
            <p className="text-xs text-muted-foreground">Across all regions</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* State-wise Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>State-wise Farm Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="farmers" fill="hsl(var(--primary))" />
                <Bar dataKey="highRisk" fill="hsl(var(--destructive))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Level Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* State Details Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>State-wise Detailed View</CardTitle>
          <Button className="flex items-center space-x-2" onClick={() => sendNotification('all')}>
            <Send className="h-4 w-4" />
            <span>Send Alert to All</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">State</th>
                  <th className="text-left p-4">Total Farmers</th>
                  <th className="text-left p-4">High Risk</th>
                  <th className="text-left p-4">Issues Reported</th>
                  <th className="text-left p-4">Risk %</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stateData.map((state, index) => {
                  const riskPercentage = ((state.highRisk / state.farmers) * 100).toFixed(1)
                  return (
                    <tr key={index} className="border-b">
                      <td className="p-4 font-medium">{state.state}</td>
                      <td className="p-4">{state.farmers.toLocaleString()}</td>
                      <td className="p-4">
                        <span className="text-red-600 font-semibold">{state.highRisk}</span>
                      </td>
                      <td className="p-4">{state.issues}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Progress value={parseFloat(riskPercentage)} className="w-16" />
                          <span className="text-sm">{riskPercentage}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => sendNotification(state.state)}
                        >
                          Send Alert
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Send className="h-5 w-5" />
              <span>Emergency Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full" 
              variant="destructive"
              onClick={() => sendNotification('high-risk')}
            >
              Alert High-Risk Farmers
            </Button>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => sendNotification('all-states')}
            >
              State-wide Notification
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Recent Feedback</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p className="p-2 bg-muted rounded">Need better training materials - Farmer, Punjab</p>
              <p className="p-2 bg-muted rounded">Alert system working well - Farmer, Haryana</p>
              <p className="p-2 bg-muted rounded">Request for regional language support - Farmer, UP</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Training Completion Rate</span>
                <span>{dashboardData.completionRate}%</span>
              </div>
              <Progress value={dashboardData.completionRate} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Avg. Response Time</span>
                <span>{dashboardData.responseTime}h</span>
              </div>
              <p className="text-xs text-muted-foreground">For support queries</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard