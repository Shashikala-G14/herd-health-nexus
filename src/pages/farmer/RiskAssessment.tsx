import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

const RiskAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [completed, setCompleted] = useState(false)
  const { toast } = useToast()

  const questions = [
    {
      id: 1,
      question: "How often do you clean and disinfect your farm equipment?",
      options: [
        { text: "Daily", score: 1 },
        { text: "Weekly", score: 2 },
        { text: "Monthly", score: 3 },
        { text: "Rarely", score: 4 }
      ]
    },
    {
      id: 2,
      question: "Do you have a designated quarantine area for new animals?",
      options: [
        { text: "Yes, well-separated", score: 1 },
        { text: "Yes, but limited", score: 2 },
        { text: "Planning to build", score: 3 },
        { text: "No", score: 4 }
      ]
    },
    {
      id: 3,
      question: "How do you manage visitors to your farm?",
      options: [
        { text: "Strict protocols with PPE", score: 1 },
        { text: "Basic restrictions", score: 2 },
        { text: "Informal guidelines", score: 3 },
        { text: "No restrictions", score: 4 }
      ]
    },
    {
      id: 4,
      question: "What is your animal health monitoring frequency?",
      options: [
        { text: "Daily observation", score: 1 },
        { text: "Few times a week", score: 2 },
        { text: "Weekly", score: 3 },
        { text: "Only when issues arise", score: 4 }
      ]
    }
  ]

  const handleAnswer = (questionIndex: number, score: number) => {
    setAnswers({ ...answers, [questionIndex]: score })
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      completeAssessment()
    }
  }

  const completeAssessment = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
    const riskLevel = totalScore <= 6 ? 'Low' : totalScore <= 10 ? 'Medium' : 'High'
    
    setCompleted(true)
    toast({
      title: "Assessment Complete!",
      description: `Your risk level is: ${riskLevel}`
    })
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600'
      case 'Medium': return 'text-yellow-600'
      case 'High': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  if (completed) {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
    const riskLevel = totalScore <= 6 ? 'Low' : totalScore <= 10 ? 'Medium' : 'High'

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Assessment Results</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <h3 className={`text-4xl font-bold ${getRiskColor(riskLevel)}`}>
                {riskLevel} Risk
              </h3>
              <p className="text-muted-foreground mt-2">
                Score: {totalScore}/{questions.length * 4}
              </p>
            </div>
            
            <div className="text-left space-y-4">
              <h4 className="font-semibold">Recommendations:</h4>
              {riskLevel === 'High' && (
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Implement daily cleaning and disinfection protocols</li>
                  <li>• Establish a proper quarantine facility</li>
                  <li>• Restrict and monitor farm visitors</li>
                  <li>• Increase animal health monitoring frequency</li>
                </ul>
              )}
              {riskLevel === 'Medium' && (
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Improve cleaning schedules</li>
                  <li>• Enhance visitor protocols</li>
                  <li>• Regular health monitoring</li>
                </ul>
              )}
              {riskLevel === 'Low' && (
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Maintain current good practices</li>
                  <li>• Regular review of protocols</li>
                  <li>• Stay updated with best practices</li>
                </ul>
              )}
            </div>

            <Button onClick={() => window.location.reload()} className="w-full">
              Take Assessment Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Biosecurity Risk Assessment</h1>
        <p className="text-muted-foreground">Evaluate your farm's biosecurity measures</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} />
        </CardHeader>
        <CardContent className="space-y-6">
          <h3 className="text-lg font-semibold">
            {questions[currentQuestion].question}
          </h3>
          
          <RadioGroup 
            value={answers[currentQuestion]?.toString()}
            onValueChange={(value) => handleAnswer(currentQuestion, parseInt(value))}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option.score.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={nextQuestion}
              disabled={!answers[currentQuestion]}
            >
              {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RiskAssessment