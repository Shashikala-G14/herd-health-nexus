import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: '',
    state: '',
    farmSize: '',
    livestockType: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password
    })

    if (authError) {
      toast({
        title: "Signup Failed",
        description: authError.message,
        variant: "destructive"
      })
      setLoading(false)
      return
    }

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user.id,
          email: formData.email,
          full_name: formData.fullName,
          role: formData.role,
          state: formData.state,
          farm_size: parseInt(formData.farmSize),
          livestock_type: formData.livestockType,
          premium_user: false,
          risk_level: 'low'
        }])

      if (profileError) {
        toast({
          title: "Profile Creation Failed",
          description: profileError.message,
          variant: "destructive"
        })
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account."
        })
        navigate('/login')
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Join AgriShield</CardTitle>
          <p className="text-muted-foreground">Create your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="admin">Policy Maker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>State</Label>
                <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
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
            </div>
            {formData.role === 'farmer' && (
              <>
                <div>
                  <Label htmlFor="farmSize">Farm Size (acres)</Label>
                  <Input
                    id="farmSize"
                    type="number"
                    value={formData.farmSize}
                    onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>Livestock Type</Label>
                  <Select value={formData.livestockType} onValueChange={(value) => setFormData({...formData, livestockType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select livestock" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pig">Pig</SelectItem>
                      <SelectItem value="poultry">Poultry</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
          <p className="text-center mt-4 text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signup