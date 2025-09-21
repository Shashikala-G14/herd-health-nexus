import { AlertTriangle, CheckCircle, Users, TrendingUp, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Farm Biosecurity Management Hub
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor, assess, and improve your farm's biosecurity practices with our comprehensive dashboard
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">Low</div>
              <p className="text-xs text-muted-foreground">
                2% decrease from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">94%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last assessment
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">3</div>
              <p className="text-xs text-muted-foreground">
                2 medium, 1 low priority
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Training Progress</CardTitle>
              <Users className="h-4 w-4 text-info" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info">78%</div>
              <p className="text-xs text-muted-foreground">
                4 modules completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>
                  Access key biosecurity tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Start Risk Assessment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Training Modules
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Inspection
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MapPin className="mr-2 h-4 w-4" />
                  Update Farm Profile
                </Button>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="bg-warning/10 text-warning">
                    Medium
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Visitor log incomplete</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="bg-info/10 text-info">
                    Low
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Training due reminder</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="bg-warning/10 text-warning">
                    Medium
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Equipment maintenance</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Compliance Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compliance Progress</CardTitle>
                <CardDescription>
                  Your progress toward disease-free compartment recognition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Biosecurity Protocols</span>
                    <span className="text-primary font-medium">94%</span>
                  </div>
                  <Progress value={94} className="bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Staff Training</span>
                    <span className="text-primary font-medium">78%</span>
                  </div>
                  <Progress value={78} className="bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Documentation</span>
                    <span className="text-primary font-medium">87%</span>
                  </div>
                  <Progress value={87} className="bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Equipment & Infrastructure</span>
                    <span className="text-primary font-medium">91%</span>
                  </div>
                  <Progress value={91} className="bg-muted" />
                </div>
              </CardContent>
            </Card>

            {/* Farm Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Farm Profile</CardTitle>
                <CardDescription>
                  Green Valley Pig Farm - ID: GVF-2024-001
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">1,250</p>
                    <p className="text-sm text-muted-foreground">Pigs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">45</p>
                    <p className="text-sm text-muted-foreground">Hectares</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">12</p>
                    <p className="text-sm text-muted-foreground">Staff</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">8</p>
                    <p className="text-sm text-muted-foreground">Buildings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;