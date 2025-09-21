import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Play, Clock, CheckCircle, Lock } from 'lucide-react'

const Training = () => {
  const [completedModules, setCompletedModules] = useState(new Set([1, 2]))

  const modules = [
    {
      id: 1,
      title: "Biosecurity Fundamentals",
      description: "Basic principles of farm biosecurity and disease prevention",
      duration: "30 min",
      difficulty: "Beginner",
      completed: true,
      premium: false
    },
    {
      id: 2,
      title: "Equipment Sanitization",
      description: "Proper cleaning and disinfection procedures for farm equipment",
      duration: "25 min",
      difficulty: "Beginner",
      completed: true,
      premium: false
    },
    {
      id: 3,
      title: "Visitor Management Protocols",
      description: "Managing farm access and visitor biosecurity requirements",
      duration: "20 min",
      difficulty: "Intermediate",
      completed: false,
      premium: false
    },
    {
      id: 4,
      title: "Animal Health Monitoring",
      description: "Early disease detection and health surveillance techniques",
      duration: "35 min",
      difficulty: "Intermediate",
      completed: false,
      premium: false
    },
    {
      id: 5,
      title: "Advanced Quarantine Procedures",
      description: "Comprehensive quarantine facility design and management",
      duration: "45 min",
      difficulty: "Advanced",
      completed: false,
      premium: true
    },
    {
      id: 6,
      title: "Emergency Response Planning",
      description: "Creating and implementing disease outbreak response plans",
      duration: "40 min",
      difficulty: "Advanced",
      completed: false,
      premium: true
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const completedCount = modules.filter(m => completedModules.has(m.id)).length
  const progressPercentage = (completedCount / modules.length) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Training Modules</h1>
        <p className="text-muted-foreground">Enhance your biosecurity knowledge and skills</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{completedCount}/{modules.length} modules</span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            {Math.round(progressPercentage)}% Complete
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <Card key={module.id} className="relative">
            {module.premium && (
              <Badge className="absolute top-4 right-4" variant="secondary">
                Premium
              </Badge>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg pr-16">{module.title}</CardTitle>
                {completedModules.has(module.id) && (
                  <CheckCircle className="h-6 w-6 text-green-500 absolute top-4 right-4" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{module.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{module.duration}</span>
                  </div>
                  <Badge className={getDifficultyColor(module.difficulty)}>
                    {module.difficulty}
                  </Badge>
                </div>
              </div>

              <Button 
                className="w-full"
                variant={completedModules.has(module.id) ? "outline" : "default"}
                disabled={module.premium && !completedModules.has(module.id)}
              >
                {module.premium && !completedModules.has(module.id) ? (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Premium Required
                  </>
                ) : completedModules.has(module.id) ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Review Module
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Module
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Learning Path</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            <li className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Complete Biosecurity Fundamentals ✓</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Complete Equipment Sanitization ✓</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="h-5 w-5 rounded-full border-2 border-primary bg-primary/20" />
              <span className="text-sm font-medium">Next: Visitor Management Protocols</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
              <span className="text-sm text-muted-foreground">Animal Health Monitoring</span>
            </li>
            <li className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Advanced Quarantine Procedures (Premium)</span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

export default Training