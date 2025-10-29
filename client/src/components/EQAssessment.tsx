import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  { id: 1, question: "How well do you recognize your own emotions?", options: ["Very well", "Well", "Somewhat", "Not well"] },
  { id: 2, question: "How easily can you manage stress in difficult situations?", options: ["Very easily", "Easily", "With difficulty", "Very difficult"] },
  { id: 3, question: "How comfortable are you expressing your feelings to others?", options: ["Very comfortable", "Comfortable", "Uncomfortable", "Very uncomfortable"] },
  { id: 4, question: "Can you identify what triggers your emotional responses?", options: ["Always", "Often", "Sometimes", "Rarely"] },
  { id: 5, question: "How well do you understand other people's emotions?", options: ["Very well", "Well", "Somewhat", "Not well"] },
  { id: 6, question: "Do you stay calm under pressure?", options: ["Always", "Usually", "Sometimes", "Rarely"] },
  { id: 7, question: "Can you motivate yourself to achieve your goals?", options: ["Always", "Usually", "Sometimes", "Rarely"] },
  { id: 8, question: "How well do you handle criticism?", options: ["Very well", "Well", "Poorly", "Very poorly"] },
  { id: 9, question: "Do you adapt easily to changes?", options: ["Very easily", "Easily", "With difficulty", "Not at all"] },
  { id: 10, question: "Can you read non-verbal cues from others?", options: ["Always", "Often", "Sometimes", "Rarely"] },
  { id: 11, question: "How well do you manage conflicts?", options: ["Very well", "Well", "Poorly", "Very poorly"] },
  { id: 12, question: "Do you take time to reflect on your emotions?", options: ["Always", "Often", "Sometimes", "Rarely"] },
  { id: 13, question: "Can you maintain positive relationships despite differences?", options: ["Always", "Usually", "Sometimes", "Rarely"] },
  { id: 14, question: "How well do you bounce back from setbacks?", options: ["Very well", "Well", "Poorly", "Very poorly"] },
  { id: 15, question: "Do you practice self-compassion when you make mistakes?", options: ["Always", "Usually", "Sometimes", "Rarely"] },
];

interface EQAssessmentProps {
  onComplete?: (score: number) => void;
  canRetake?: boolean;
  hasCompleted?: boolean;
}

export default function EQAssessment({ onComplete, canRetake = false, hasCompleted = false }: EQAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(hasCompleted);
  const [score, setScore] = useState(0);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalScore = Math.round((newAnswers.reduce((a, b) => a + (4 - b), 0) / (questions.length * 4)) * 100);
      setScore(finalScore);
      setCompleted(true);
      onComplete?.(finalScore);
    }
  };

  const handleRetake = () => {
    if (canRetake) {
      setCurrentQuestion(0);
      setAnswers([]);
      setCompleted(false);
      setScore(0);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (completed && !canRetake) {
    return (
      <Card className="p-8" data-testid="card-eq-completed">
        <div className="text-center space-y-4">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-primary" data-testid="icon-check" />
          </div>
          <h3 className="text-2xl font-bold" data-testid="text-completed">Assessment Already Completed</h3>
          <p className="text-muted-foreground" data-testid="text-completed-message">
            You have already completed your EQ assessment. Upgrade to Pro to track your progress over time with unlimited retakes.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8" data-testid="card-eq-assessment">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-3 rounded-lg">
          <Brain className="w-6 h-6 text-primary" data-testid="icon-brain" />
        </div>
        <div>
          <h2 className="text-2xl font-bold" data-testid="text-eq-title">Emotional Intelligence Assessment</h2>
          <p className="text-muted-foreground" data-testid="text-eq-subtitle">
            {canRetake ? 'Track your progress over time' : 'Understand your emotional awareness'}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground" data-testid="text-question-number">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <Progress value={progress} className="mb-6" data-testid="progress-eq" />
            <div className="space-y-6">
              <p className="text-lg font-medium" data-testid={`text-question-${currentQuestion}`}>
                {questions[currentQuestion].question}
              </p>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-4 px-6 hover-elevate"
                    onClick={() => handleAnswer(index)}
                    data-testid={`button-option-${index}`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-primary" data-testid="icon-check" />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2" data-testid="text-eq-score">Your EQ Score: {score}</h3>
              <p className="text-muted-foreground" data-testid="text-eq-result">
                {score >= 80 ? "Excellent emotional awareness! You have strong emotional intelligence." : 
                 score >= 60 ? "Good emotional understanding. You're on the right path." : 
                 score >= 40 ? "Developing emotional intelligence. Keep working on it." :
                 "Room for growth in emotional intelligence. Consider professional support."}
              </p>
            </div>
            {canRetake && (
              <Button onClick={handleRetake} data-testid="button-retake">
                Retake Assessment
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
