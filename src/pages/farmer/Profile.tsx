import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { User, Shield, Star, MessageSquare } from 'lucide-react'

const Profile = () => {
  const { profile } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [query, setQuery] = useState('')

  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    state: profile?.state || '',
    farmSize: profile?.farm_size?.toString() || '',
    livestockType: profile?.livestock_type || ''
  })

  const handleSave = () => {
    // Here you would typically save to Supabase
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated."
    })
    setIsEditing(false)
  }

  const submitFeedback = () => {
    if (!feedback.trim()) return
    
    // Here you would save feedback to database
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback. We'll review it soon."
    })
    setFeedback('')
  }

  const submitQuery = () => {
    if (!query.trim()) return
    
    // Here you would save query to database
    toast({
      title: "Query Submitted", 
      description: "Your query has been submitted. We'll get back to you within 24 hours."
    })
    setQuery('')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={profile?.email} disabled />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>State</Label>
                  <Select 
                    value={formData.state} 
                    onValueChange={(value) => setFormData({...formData, state: value})}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="punjab">Punjab</SelectItem>
                      <SelectItem value="haryana">Haryana</SelectItem>
                      <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Farm Size (acres)</Label>
                  <Input
                    type="number"
                    value={formData.farmSize}
                    onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label>Livestock Type</Label>
                <Select 
                  value={formData.livestockType} 
                  onValueChange={(value) => setFormData({...formData, livestockType: value})}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pig">Pig</SelectItem>
                    <SelectItem value="poultry">Poultry</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Submit Feedback</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Your Feedback</Label>
                <Textarea
                  placeholder="Share your experience, suggestions, or report issues with the platform..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button onClick={submitFeedback} disabled={!feedback.trim()}>
                Submit Feedback
              </Button>
            </CardContent>
          </Card>

          {/* Query Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Ask a Question</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Your Question</Label>
                <Textarea
                  placeholder="Ask questions about biosecurity practices, platform features, or get expert advice..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button onClick={submitQuery} disabled={!query.trim()}>
                Submit Question
              </Button>
              <p className="text-xs text-muted-foreground">
                We'll respond within 24 hours via email
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Account Type</span>
                <Badge variant={profile?.premium_user ? "default" : "secondary"}>
                  {profile?.premium_user ? "Premium" : "Basic"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Risk Level</span>
                <Badge variant={profile?.risk_level === 'low' ? "default" : 
                              profile?.risk_level === 'medium' ? "secondary" : "destructive"}>
                  {profile?.risk_level?.toUpperCase()}
                </Badge>
              </div>
              <Separator />
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Member since</p>
                <p className="font-medium">
                  {new Date(profile?.created_at || '').toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm">First Risk Assessment</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Profile Complete</span>
              </div>
              <div className="flex items-center space-x-2 opacity-50">
                <Star className="h-4 w-4" />
                <span className="text-sm">Complete 5 Training Modules</span>
              </div>
            </CardContent>
          </Card>

          {!profile?.premium_user && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Upgrade to Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• Advanced training modules</li>
                  <li>• Priority support</li>
                  <li>• Detailed analytics</li>
                  <li>• Custom alerts</li>
                </ul>
                <Button className="w-full">Upgrade Now</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile