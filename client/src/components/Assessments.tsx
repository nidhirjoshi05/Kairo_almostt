import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { usePlan } from '@/contexts/PlanContext';
import { useLocation } from 'wouter';
import { Brain, Heart, Lock, Sparkles, TrendingUp, ArrowLeft, ChevronRight } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import Footer from './Footer';
import newLogo from '@assets/Screenshot_2025-10-28_at_12.16.32_PM-removebg-preview_1761714308881.png';

const panasItems = [
  { id: 1, text: 'Interested', type: 'positive' },
  { id: 2, text: 'Distressed', type: 'negative' },
  { id: 3, text: 'Excited', type: 'positive' },
  { id: 4, text: 'Upset', type: 'negative' },
  { id: 5, text: 'Strong', type: 'positive' },
  { id: 6, text: 'Guilty', type: 'negative' },
  { id: 7, text: 'Scared', type: 'negative' },
  { id: 8, text: 'Hostile', type: 'negative' },
  { id: 9, text: 'Enthusiastic', type: 'positive' },
  { id: 10, text: 'Proud', type: 'positive' },
  { id: 11, text: 'Irritable', type: 'negative' },
  { id: 12, text: 'Alert', type: 'positive' },
  { id: 13, text: 'Ashamed', type: 'negative' },
  { id: 14, text: 'Inspired', type: 'positive' },
  { id: 15, text: 'Nervous', type: 'negative' },
  { id: 16, text: 'Determined', type: 'positive' },
  { id: 17, text: 'Attentive', type: 'positive' },
  { id: 18, text: 'Jittery', type: 'negative' },
  { id: 19, text: 'Active', type: 'positive' },
  { id: 20, text: 'Afraid', type: 'negative' },
];

const eisItems = [
  { id: 1, text: 'I can encourage others', factor: 'E' },
  { id: 2, text: 'I can carry out my plans', factor: 'C' },
  { id: 3, text: 'I care for others and feel concern for them', factor: 'J' },
  { id: 4, text: 'I can set examples for others by my behavior', factor: 'C' },
  { id: 5, text: 'I can keep patience when required', factor: 'E' },
  { id: 6, text: 'I am aware of my own feelings', factor: 'A' },
  { id: 7, text: 'People tell me I am an inspiration', factor: 'C' },
  { id: 8, text: 'I usually remain cool and calm under pressure', factor: 'C' },
  { id: 9, text: 'I can understand others feelings very well', factor: 'B' },
  { id: 10, text: "I can easily make out my friend's state of mind", factor: 'B' },
  { id: 11, text: 'I have good relationships with people', factor: 'E' },
  { id: 12, text: 'I can handle most of my feelings very well', factor: 'A' },
  { id: 13, text: 'I help others even after my work is over', factor: 'J' },
  { id: 14, text: 'I express my emotions to others easily', factor: 'D' },
  { id: 15, text: 'I think from others point of view', factor: 'B' },
  { id: 16, text: "I don't take advantage of others", factor: 'F' },
  { id: 17, text: 'I usually console people in difficulty', factor: 'E' },
  { id: 18, text: 'I understand my strength and weaknesses', factor: 'A' },
  { id: 19, text: 'I perform most of my tasks enthusiastically', factor: 'D' },
  { id: 20, text: 'I can understand feelings of others', factor: 'B' },
  { id: 21, text: 'I take care of people', factor: 'H' },
  { id: 22, text: 'I like to help others', factor: 'H' },
  { id: 23, text: 'I work hard for my organization', factor: 'I' },
  { id: 24, text: 'I am a hard worker', factor: 'I' },
  { id: 25, text: 'I can judge good and bad intentions of others', factor: 'B' },
  { id: 26, text: 'I am emotionally stable', factor: 'D' },
  { id: 27, text: 'I am trustworthy', factor: 'F' },
  { id: 28, text: 'I show very less emotional reaction', factor: 'D' },
  { id: 29, text: 'I am aware of my emotions', factor: 'A' },
  { id: 30, text: 'I try to know myself', factor: 'G' },
  { id: 31, text: 'I can do and complete most of my tasks', factor: 'C' },
  { id: 32, text: 'I remain honest in my dealings with others', factor: 'F' },
  { id: 33, text: 'I search for opportunities for my growth', factor: 'G' },
  { id: 34, text: 'I work hard to achieve my goals', factor: 'C' },
];

const factorNames = {
  A: 'Self-awareness',
  B: 'Empathy',
  C: 'Self-motivation',
  D: 'Emotional stability',
  E: 'Managing relations',
  F: 'Integrity',
  G: 'Self-development',
  H: 'Value orientation',
  I: 'Commitment',
  J: 'Altruistic behaviour',
};

const factorNorms = {
  A: { high: 16, normal: [10, 15], low: 9 },
  B: { high: 20, normal: [12, 19], low: 11 },
  C: { high: 24, normal: [15, 23], low: 14 },
  D: { high: 16, normal: [10, 15], low: 9 },
  E: { high: 16, normal: [10, 15], low: 9 },
  F: { high: 12, normal: [8, 11], low: 7 },
  G: { high: 8, normal: [5, 7], low: 4 },
  H: { high: 8, normal: [5, 7], low: 4 },
  I: { high: 8, normal: [5, 7], low: 4 },
  J: { high: 8, normal: [5, 7], low: 4 },
};

export default function Assessments() {
  const { plan } = usePlan();
  const [, setLocation] = useLocation();
  const [selectedTest, setSelectedTest] = useState<'panas' | 'eis' | null>(null);
  const [panasAnswers, setPanasAnswers] = useState<Record<number, number>>({});
  const [eisAnswers, setEisAnswers] = useState<Record<number, number>>({});
  const [showPanasResults, setShowPanasResults] = useState(false);
  const [showEisResults, setShowEisResults] = useState(false);

  const isPro = plan === 'pro';

  const handlePanasChange = (itemId: number, value: number) => {
    setPanasAnswers({ ...panasAnswers, [itemId]: value });
  };

  const handleEisChange = (itemId: number, value: number) => {
    setEisAnswers({ ...eisAnswers, [itemId]: value });
  };

  const calculatePanasScores = () => {
    const positiveItems = [1, 3, 5, 9, 10, 12, 14, 16, 17, 19];
    const negativeItems = [2, 4, 6, 7, 8, 11, 13, 15, 18, 20];

    const paScore = positiveItems.reduce((sum, id) => sum + (panasAnswers[id] || 0), 0);
    const naScore = negativeItems.reduce((sum, id) => sum + (panasAnswers[id] || 0), 0);

    return { paScore, naScore };
  };

  const calculateEisScores = () => {
    const totalScore = Object.values(eisAnswers).reduce((sum, val) => sum + val, 0);
    
    const factorScores: Record<string, number> = {};
    eisItems.forEach(item => {
      const factor = item.factor;
      factorScores[factor] = (factorScores[factor] || 0) + (eisAnswers[item.id] || 0);
    });

    return { totalScore, factorScores };
  };

  const getEisInterpretation = (score: number) => {
    if (score >= 85) return 'High';
    if (score >= 52) return 'Normal';
    return 'Low';
  };

  const getFactorInterpretation = (factor: keyof typeof factorNorms, score: number) => {
    const norms = factorNorms[factor];
    if (score >= norms.high) return 'High';
    if (score >= norms.normal[0] && score <= norms.normal[1]) return 'Normal';
    return 'Low';
  };

  const handlePanasSubmit = () => {
    const panasComplete = Object.keys(panasAnswers).length === 20;

    if (!panasComplete) {
      alert('Please complete all 20 PANAS questions before submitting.');
      return;
    }

    setShowPanasResults(true);
    setTimeout(() => {
      document.getElementById('panas-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleEisSubmit = () => {
    const eisComplete = Object.keys(eisAnswers).length === 34;

    if (!eisComplete) {
      alert('Please complete all 34 EIS questions before submitting.');
      return;
    }

    setShowEisResults(true);
    setTimeout(() => {
      document.getElementById('eis-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleBackToTests = () => {
    setSelectedTest(null);
    setShowPanasResults(false);
    setShowEisResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { paScore, naScore } = showPanasResults ? calculatePanasScores() : { paScore: 0, naScore: 0 };
  const { totalScore, factorScores } = showEisResults && isPro ? calculateEisScores() : { totalScore: 0, factorScores: {} };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={newLogo} alt="Kairo" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold">Kairo</h1>
                <p className="text-xs text-muted-foreground">Psychological Assessments</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => setLocation(isPro ? '/pro' : '/free')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {!selectedTest ? (
            // Test Selection View
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Psychological Assessments</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Choose an assessment to understand your emotional state and intelligence through scientifically validated tests.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* PANAS Test Block */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    className="cursor-pointer border-2 hover:border-primary transition-all h-full"
                    onClick={() => setSelectedTest('panas')}
                  >
                    <CardHeader>
                      <div className="bg-primary/10 p-4 rounded-lg w-fit mx-auto mb-4">
                        <Heart className="w-12 h-12 text-primary" />
                      </div>
                      <CardTitle className="text-2xl text-center">PANAS Scale</CardTitle>
                      <CardDescription className="text-center text-base">
                        Check Your Current Mood
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        A quick 20-item questionnaire that measures your current emotional state, providing scores for Positive and Negative Affect.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">20 Questions</Badge>
                          <Badge variant="outline">5-10 mins</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="secondary">✓ Free for All</Badge>
                        </div>
                      </div>
                      <Button className="w-full" size="lg">
                        Take PANAS Test
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* EIS Test Block */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    className="cursor-pointer border-2 hover:border-purple-500 transition-all h-full"
                    onClick={() => setSelectedTest('eis')}
                  >
                    <CardHeader>
                      <div className="bg-purple-500/10 p-4 rounded-lg w-fit mx-auto mb-4">
                        <Brain className="w-12 h-12 text-purple-500" />
                      </div>
                      <CardTitle className="text-2xl text-center">EIS-HPD Scale</CardTitle>
                      <CardDescription className="text-center text-base">
                        Discover Your Emotional Intelligence
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        A comprehensive 34-item assessment measuring your emotional intelligence across 10 key factors including empathy, self-awareness, and motivation.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">34 Questions</Badge>
                          <Badge variant="outline">10-15 mins</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          {!isPro && <Badge variant="secondary"><Lock className="w-3 h-3 mr-1" />Pro Results</Badge>}
                          {isPro && <Badge variant="default">✓ Pro Access</Badge>}
                        </div>
                      </div>
                      <Button className="w-full" size="lg" variant={isPro ? "default" : "secondary"}>
                        Take EIS Test
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                      {!isPro && (
                        <p className="text-xs text-muted-foreground text-center">
                          Detailed results require Pro plan
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </>
          ) : selectedTest === 'panas' ? (
            // PANAS Test View
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={handleBackToTests}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tests
                </Button>
              </div>

              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Heart className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">PANAS Scale</CardTitle>
                      <CardDescription className="text-base">
                        Indicate to what extent you feel this way right now (at the present moment).
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {panasItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 bg-card">
                        <Label className="text-base font-medium mb-3 block">{item.id}. {item.text}</Label>
                        <RadioGroup
                          value={panasAnswers[item.id]?.toString()}
                          onValueChange={(value) => handlePanasChange(item.id, parseInt(value))}
                          className="flex flex-wrap gap-3"
                        >
                          {[
                            { value: 1, label: 'Very Slightly or Not at All' },
                            { value: 2, label: 'A Little' },
                            { value: 3, label: 'Moderately' },
                            { value: 4, label: 'Quite a Bit' },
                            { value: 5, label: 'Extremely' },
                          ].map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value.toString()} id={`panas-${item.id}-${option.value}`} />
                              <Label htmlFor={`panas-${item.id}-${option.value}`} className="cursor-pointer text-sm">
                                {option.value} - {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button
                      size="lg"
                      onClick={handlePanasSubmit}
                      className="px-12 py-4 text-lg"
                      disabled={Object.keys(panasAnswers).length < 20}
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Submit PANAS Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {showPanasResults && (
                <motion.div
                  id="panas-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-2 border-primary">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Heart className="w-6 h-6 text-primary" />
                        Your PANAS Results
                      </CardTitle>
                      <CardDescription>Your current emotional state snapshot</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">Positive Affect</h3>
                            <Badge variant="default" className="text-lg px-3 py-1">{paScore}/50</Badge>
                          </div>
                          <Progress value={(paScore / 50) * 100} className="h-4" />
                          <p className="text-sm text-muted-foreground mt-4">
                            Your Positive Affect score ({paScore}) measures the extent to which you feel enthusiastic, active, and alert. 
                            The average 'momentary' score is 29.7. {paScore >= 29.7 ? 'Your score is above average!' : 'Consider activities that boost positive emotions.'}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">Negative Affect</h3>
                            <Badge variant="secondary" className="text-lg px-3 py-1">{naScore}/50</Badge>
                          </div>
                          <Progress value={(naScore / 50) * 100} className="h-4" />
                          <p className="text-sm text-muted-foreground mt-4">
                            Your Negative Affect score ({naScore}) measures the extent to which you feel distressed, angry, or fearful. 
                            The average 'momentary' score is 14.8. {naScore <= 14.8 ? 'Your score is at or below average.' : 'Consider stress-reduction techniques.'}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'PA Score', value: paScore, color: '#10b981' },
                                { name: 'PA Remaining', value: 50 - paScore, color: '#e5e7eb' },
                              ]}
                              cx="25%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              dataKey="value"
                            >
                              {[
                                { name: 'PA Score', value: paScore, color: '#10b981' },
                                { name: 'PA Remaining', value: 50 - paScore, color: '#e5e7eb' },
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Pie
                              data={[
                                { name: 'NA Score', value: naScore, color: '#f59e0b' },
                                { name: 'NA Remaining', value: 50 - naScore, color: '#e5e7eb' },
                              ]}
                              cx="75%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              dataKey="value"
                            >
                              {[
                                { name: 'NA Score', value: naScore, color: '#f59e0b' },
                                { name: 'NA Remaining', value: 50 - naScore, color: '#e5e7eb' },
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          ) : (
            // EIS Test View
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={handleBackToTests}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tests
                </Button>
              </div>

              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-500/10 p-3 rounded-lg">
                      <Brain className="w-8 h-8 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-2xl">EIS-HPD Scale</CardTitle>
                        {!isPro && <Badge variant="secondary"><Lock className="w-3 h-3 mr-1" />Pro Feature</Badge>}
                      </div>
                      <CardDescription className="text-base">
                        Express your views by selecting one option for each statement.
                        {!isPro && <span className="block mt-2 text-amber-600 font-medium">Note: Detailed results require a Pro plan.</span>}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {eisItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 bg-card">
                        <Label className="text-base font-medium mb-3 block">{item.id}. {item.text}</Label>
                        <RadioGroup
                          value={eisAnswers[item.id]?.toString()}
                          onValueChange={(value) => handleEisChange(item.id, parseInt(value))}
                          className="flex flex-wrap gap-3"
                        >
                          {[
                            { value: 5, label: 'Strongly Agree' },
                            { value: 4, label: 'Agree' },
                            { value: 3, label: 'Uncertain' },
                            { value: 2, label: 'Disagree' },
                            { value: 1, label: 'Strongly Disagree' },
                          ].map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value.toString()} id={`eis-${item.id}-${option.value}`} />
                              <Label htmlFor={`eis-${item.id}-${option.value}`} className="cursor-pointer text-sm">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button
                      size="lg"
                      onClick={handleEisSubmit}
                      className="px-12 py-4 text-lg"
                      disabled={Object.keys(eisAnswers).length < 34}
                    >
                      <Brain className="w-5 h-5 mr-2" />
                      Submit EIS Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {showEisResults && (
                <motion.div
                  id="eis-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {isPro ? (
                    <Card className="border-2 border-purple-500">
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <Brain className="w-6 h-6 text-purple-500" />
                          Your Emotional Intelligence Results
                        </CardTitle>
                        <CardDescription>Complete breakdown of your EQ assessment</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-8">
                        {/* Overall Score */}
                        <div className="text-center space-y-4">
                          <h3 className="text-xl font-semibold">Overall Emotional Intelligence</h3>
                          <div className="flex items-center justify-center gap-4">
                            <Badge 
                              variant={totalScore >= 85 ? 'default' : totalScore >= 52 ? 'secondary' : 'destructive'} 
                              className="text-2xl px-6 py-3"
                            >
                              {totalScore}/170
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className="text-xl px-4 py-2"
                            >
                              {getEisInterpretation(totalScore)}
                            </Badge>
                          </div>
                          <Progress value={(totalScore / 170) * 100} className="h-4 max-w-md mx-auto" />
                          <div className="flex justify-between max-w-md mx-auto text-xs text-muted-foreground">
                            <span>Low (0-51)</span>
                            <span>Normal (52-84)</span>
                            <span>High (85+)</span>
                          </div>
                        </div>

                        {/* Radar Chart */}
                        <div className="mt-8">
                          <h3 className="text-lg font-semibold text-center mb-6">10-Factor Breakdown</h3>
                          <ResponsiveContainer width="100%" height={400}>
                            <RadarChart data={Object.entries(factorScores).map(([factor, score]) => ({
                              factor: factorNames[factor as keyof typeof factorNames],
                              score,
                              benchmark: factorNorms[factor as keyof typeof factorNorms].high,
                            }))}>
                              <PolarGrid />
                              <PolarAngleAxis dataKey="factor" tick={{ fontSize: 12 }} />
                              <PolarRadiusAxis angle={90} domain={[0, 'auto']} />
                              <Radar
                                name="Your Score"
                                dataKey="score"
                                stroke="#8b5cf6"
                                fill="#8b5cf6"
                                fillOpacity={0.6}
                              />
                              <Radar
                                name="High Benchmark"
                                dataKey="benchmark"
                                stroke="#10b981"
                                fill="#10b981"
                                fillOpacity={0.2}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Factor Table */}
                        <div className="mt-8">
                          <h3 className="text-lg font-semibold mb-4">Detailed Factor Analysis</h3>
                          <div className="border rounded-lg overflow-hidden">
                            <table className="w-full">
                              <thead className="bg-muted">
                                <tr>
                                  <th className="px-4 py-3 text-left">Factor</th>
                                  <th className="px-4 py-3 text-center">Your Score</th>
                                  <th className="px-4 py-3 text-center">Interpretation</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(factorScores).map(([factor, score]) => (
                                  <tr key={factor} className="border-t">
                                    <td className="px-4 py-3 font-medium">
                                      {factorNames[factor as keyof typeof factorNames]}
                                    </td>
                                    <td className="px-4 py-3 text-center">{score}</td>
                                    <td className="px-4 py-3 text-center">
                                      <Badge
                                        variant={
                                          getFactorInterpretation(factor as keyof typeof factorNorms, score) === 'High'
                                            ? 'default'
                                            : getFactorInterpretation(factor as keyof typeof factorNorms, score) === 'Normal'
                                            ? 'secondary'
                                            : 'destructive'
                                        }
                                      >
                                        {getFactorInterpretation(factor as keyof typeof factorNorms, score)}
                                      </Badge>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-2 border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <Lock className="w-6 h-6 text-amber-600" />
                          You've Completed the Emotional Intelligence Test!
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <p className="text-lg">
                          To unlock your detailed results, including your overall EQ score, a 10-factor breakdown, and a personalized radar chart, 
                          please upgrade to our Pro plan.
                        </p>
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 space-y-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            What you'll unlock with Pro:
                          </h4>
                          <ul className="space-y-2 ml-7">
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>Overall Emotional Intelligence score and interpretation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>Detailed breakdown of all 10 EQ factors</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>Interactive radar chart visualization</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>Personalized insights and recommendations</span>
                            </li>
                          </ul>
                        </div>
                        <Button
                          size="lg"
                          className="w-full text-lg py-6"
                          onClick={() => setLocation('/select-plan')}
                        >
                          <Sparkles className="w-5 h-5 mr-2" />
                          Upgrade to Pro Now
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
