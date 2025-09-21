import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react'

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "Disease outbreak reported in nearby district",
      description: "African Swine Fever cases detected 50km from your location. Implement enhanced biosecurity measures.",
      type: "critical",
      timestamp: "2 hours ago",
      read: false,
      actionRequired: true
    },
    {
      id: 2,
      title: "Vaccination reminder",
      description: "Annual vaccination for your poultry is due in 3 days. Contact your veterinarian to schedule.",
      type: "warning",
      timestamp: "1 day ago",
      read: false,
      actionRequired: true
    },
    {
      id: 3,
      title: "Training module completed",
      description: "Congratulations! You've successfully completed the Equipment Sanitization module.",
      type: "success",
      timestamp: "2 days ago",
      read: true,
      actionRequired: false
    },
    {
      id: 4,
      title: "Weather advisory",
      description: "Heavy rainfall expected in your area. Ensure proper drainage and shelter for animals.",
      type: "info",
      timestamp: "3 days ago",
      read: true,
      actionRequired: false
    }
  ])

  const markAsRead = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ))
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'warning': return <Bell className="h-5 w-5 text-yellow-500" />
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'info': return <Info className="h-5 w-5 text-blue-500" />
      default: return <Bell className="h-5 w-5" />
    }
  }

  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive'
      case 'warning': return 'default'
      case 'success': return 'default'
      case 'info': return 'default'
      default: return 'default'
    }
  }

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive'
      case 'warning': return 'secondary'
      case 'success': return 'default'
      case 'info': return 'outline'
      default: return 'secondary'
    }
  }

  const unreadCount = alerts.filter(alert => !alert.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
          <p className="text-muted-foreground">Stay updated with important farm notifications</p>
        </div>
        <Badge variant="secondary">
          {unreadCount} unread
        </Badge>
      </div>

      {unreadCount > 0 && (
        <Alert>
          <Bell className="h-4 w-4" />
          <AlertDescription>
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}. 
            Please review them to stay updated on important farm matters.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className={`${!alert.read ? 'ring-2 ring-primary/20' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{alert.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getBadgeVariant(alert.type)}>
                    {alert.type}
                  </Badge>
                  {!alert.read && (
                    <Badge variant="default" className="text-xs">
                      New
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{alert.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {!alert.read && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => markAsRead(alert.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                  {alert.actionRequired && (
                    <Button size="sm">
                      Take Action
                    </Button>
                  )}
                </div>
                
                {alert.type === 'critical' && (
                  <Badge variant="destructive" className="animate-pulse">
                    Urgent
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Disease outbreak alerts</h4>
                <p className="text-sm text-muted-foreground">Get notified about disease outbreaks in your region</p>
              </div>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Training reminders</h4>
                <p className="text-sm text-muted-foreground">Reminders for training modules and certifications</p>
              </div>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Weather alerts</h4>
                <p className="text-sm text-muted-foreground">Weather conditions that may affect your livestock</p>
              </div>
              <Badge variant="outline">Disabled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Alerts