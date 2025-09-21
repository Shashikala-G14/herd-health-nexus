import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, Eye, Send, Star, AlertTriangle } from 'lucide-react'

const FarmerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterState, setFilterState] = useState('all')
  const [filterRisk, setFilterRisk] = useState('all')

  // Mock farmer data
  const farmers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      state: 'Punjab',
      farmSize: 25,
      livestockType: 'poultry',
      riskLevel: 'high',
      premiumUser: false,
      lastActive: '2 days ago',
      trainingProgress: 45
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@example.com', 
      state: 'Haryana',
      farmSize: 40,
      livestockType: 'pig',
      riskLevel: 'low',
      premiumUser: true,
      lastActive: '1 hour ago',
      trainingProgress: 85
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@example.com',
      state: 'Maharashtra',
      farmSize: 15,
      livestockType: 'both',
      riskLevel: 'medium',
      premiumUser: false,
      lastActive: '5 hours ago',
      trainingProgress: 60
    },
    {
      id: 4,
      name: 'Sunita Singh',
      email: 'sunita@example.com',
      state: 'Uttar Pradesh',
      farmSize: 35,
      livestockType: 'poultry',
      riskLevel: 'high',
      premiumUser: true,
      lastActive: '3 days ago',
      trainingProgress: 30
    }
  ]

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'default'
      default: return 'outline'
    }
  }

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesState = filterState === 'all' || farmer.state === filterState
    const matchesRisk = filterRisk === 'all' || farmer.riskLevel === filterRisk
    
    return matchesSearch && matchesState && matchesRisk
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Farmer Management</h1>
        <p className="text-muted-foreground">Monitor and manage farmer accounts and data</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Search & Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search farmers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterState} onValueChange={setFilterState}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="Punjab">Punjab</SelectItem>
                <SelectItem value="Haryana">Haryana</SelectItem>
                <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterRisk} onValueChange={setFilterRisk}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Farmer List */}
      <Card>
        <CardHeader>
          <CardTitle>Farmer Accounts ({filteredFarmers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Farmer</th>
                  <th className="text-left p-4">State</th>
                  <th className="text-left p-4">Farm Details</th>
                  <th className="text-left p-4">Risk Level</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Training</th>
                  <th className="text-left p-4">Last Active</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFarmers.map((farmer) => (
                  <tr key={farmer.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium flex items-center space-x-2">
                          <span>{farmer.name}</span>
                          {farmer.premiumUser && (
                            <Star className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{farmer.email}</div>
                      </div>
                    </td>
                    <td className="p-4">{farmer.state}</td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div>{farmer.farmSize} acres</div>
                        <div className="text-muted-foreground capitalize">{farmer.livestockType}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={getRiskBadgeVariant(farmer.riskLevel)}>
                        {farmer.riskLevel.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={farmer.premiumUser ? "default" : "secondary"}>
                        {farmer.premiumUser ? "Premium" : "Basic"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{width: `${farmer.trainingProgress}%`}}
                          ></div>
                        </div>
                        <span className="text-sm">{farmer.trainingProgress}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{farmer.lastActive}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="h-4 w-4" />
                        </Button>
                        {farmer.riskLevel === 'high' && (
                          <Button size="sm" variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {farmers.filter(f => f.riskLevel === 'high').length}
            </div>
            <p className="text-sm text-muted-foreground">High Risk Farmers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {farmers.filter(f => f.premiumUser).length}
            </div>
            <p className="text-sm text-muted-foreground">Premium Users</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {Math.round(farmers.reduce((acc, f) => acc + f.trainingProgress, 0) / farmers.length)}%
            </div>
            <p className="text-sm text-muted-foreground">Avg Training Progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {farmers.filter(f => f.lastActive.includes('hour')).length}
            </div>
            <p className="text-sm text-muted-foreground">Active Today</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FarmerManagement