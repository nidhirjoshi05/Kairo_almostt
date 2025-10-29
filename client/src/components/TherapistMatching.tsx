import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Users, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TherapistCard from './TherapistCard';

const questions = [
  {
    id: 1,
    question: "What type of therapy are you most interested in?",
    type: "radio",
    options: ["Cognitive Behavioral Therapy (CBT)", "Psychodynamic Therapy", "Mindfulness-Based Therapy", "Family/Couples Therapy"]
  },
  {
    id: 2,
    question: "What are your primary concerns? (Select all that apply)",
    type: "checkbox",
    options: ["Anxiety", "Depression", "Stress Management", "Relationship Issues", "Trauma", "Self-esteem"]
  },
  {
    id: 3,
    question: "What time of day do you prefer sessions?",
    type: "radio",
    options: ["Morning (8 AM - 12 PM)", "Afternoon (12 PM - 5 PM)", "Evening (5 PM - 9 PM)", "Flexible"]
  },
  {
    id: 4,
    question: "Do you have a gender preference for your therapist?",
    type: "radio",
    options: ["Female", "Male", "Non-binary", "No preference"]
  }
];

//todo: remove mock functionality
const matchedTherapists = [
  {
    name: "Dr. Sarah Patel",
    specialization: "CBT & Anxiety Specialist",
    bio: "Specializing in cognitive behavioral therapy with over 10 years of experience helping clients manage anxiety and depression.",
    rating: 4.8,
    reviews: 156,
    yearsExperience: 12,
    availability: "Mon-Fri, 2-6 PM IST",
  },
  {
    name: "Dr. Priya Sharma",
    specialization: "Relationship Counseling",
    bio: "Expert in helping couples and individuals navigate relationship challenges with compassion and evidence-based techniques.",
    rating: 4.9,
    reviews: 203,
    yearsExperience: 15,
    availability: "Wed-Sun, 3-8 PM IST",
  }
];

export default function TherapistMatching() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [completed, setCompleted] = useState(false);

  const handleRadioAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);
  };

  const handleCheckboxAnswer = (option: string, checked: boolean) => {
    const currentAnswers = answers[questions[currentQuestion].id] || [];
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: checked
        ? [...currentAnswers, option]
        : currentAnswers.filter((a: string) => a !== option)
    };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  };

  const canProceed = () => {
    const answer = answers[questions[currentQuestion].id];
    if (questions[currentQuestion].type === "checkbox") {
      return answer && answer.length > 0;
    }
    return !!answer;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="space-y-6">
      {!completed ? (
        <Card className="p-8" data-testid="card-matching">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Get Matched with a Therapist</h2>
              <p className="text-muted-foreground">Answer a few questions to find your ideal therapist</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
            </div>
            <Progress value={progress} className="mb-6" data-testid="progress-matching" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium" data-testid={`question-${currentQuestion}`}>
                {questions[currentQuestion].question}
              </h3>

              {questions[currentQuestion].type === "radio" ? (
                <RadioGroup
                  value={answers[questions[currentQuestion].id] || ""}
                  onValueChange={handleRadioAnswer}
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2" data-testid={`option-${index}`}>
                      <RadioGroupItem value={option} id={`q${currentQuestion}-${index}`} />
                      <Label htmlFor={`q${currentQuestion}-${index}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2" data-testid={`option-${index}`}>
                      <Checkbox
                        id={`q${currentQuestion}-${index}`}
                        checked={(answers[questions[currentQuestion].id] || []).includes(option)}
                        onCheckedChange={(checked) => handleCheckboxAnswer(option, checked as boolean)}
                      />
                      <Label htmlFor={`q${currentQuestion}-${index}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="w-full"
                data-testid="button-next"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Find My Match'}
              </Button>
            </motion.div>
          </AnimatePresence>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="p-8 text-center" data-testid="card-match-complete">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">We Found Your Matches!</h2>
            <p className="text-muted-foreground mb-6">
              Based on your preferences, here are therapists we think would be a great fit for you.
            </p>
          </Card>

          <div className="space-y-4">
            {matchedTherapists.map((therapist, index) => (
              <TherapistCard
                key={index}
                {...therapist}
                canSchedule={true}
                onSchedule={() => console.log('Schedule with:', therapist.name)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
