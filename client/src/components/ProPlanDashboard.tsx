import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocation } from 'wouter';
import { usePlan } from '@/contexts/PlanContext';
import DailyTip from './DailyTip';
import EQAssessment from './EQAssessment';
import JournalEntry from './JournalEntry';
import MoodTracker from './MoodTracker';
import AIVentRoom from './AIVentRoom';
import HealingCircle from './HealingCircle';
import TherapistCard from './TherapistCard';
import SessionBooking from './SessionBooking';
import CrisisSupport from './CrisisSupport';
import NotificationsCard from './NotificationsCard';
import CalendarView from './CalendarView';
import ProfileDashboard from './ProfileDashboard';
import Settings from './Settings';
import SessionConfirmation from './SessionConfirmation';
import Footer from './Footer';
import { Home, BookOpen, MessageCircle, Users, AlertCircle, Stethoscope, Heart, User, Settings as SettingsIcon, LogOut, TrendingUp, Award, Target, Calendar, BookText, Brain } from 'lucide-react';
import newLogo from '@assets/Screenshot_2025-10-28_at_12.16.32_PM-removebg-preview_1761714308881.png';

export default function ProPlanDashboard() {
  const [, setLocation] = useLocation();
  const { setPlan } = usePlan();
  
  const urlParams = new URLSearchParams(window.location.search);
  const initialTab = urlParams.get('tab') || 'home';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [bookingTherapist, setBookingTherapist] = useState<{ name: string; availability: string } | null>(null);
  const [joinedCircles, setJoinedCircles] = useState<string[]>([]);
  const [sessionConfirmation, setSessionConfirmation] = useState<{
    therapistName: string;
    date: string;
    time: string;
    notes?: string;
  } | null>(null);

  const handleLogout = () => {
    setPlan(null);
    setLocation('/');
  };

  const handleJoinCircle = (circleName: string) => {
    setJoinedCircles([...joinedCircles, circleName]);
    console.log('Joined circle:', circleName);
  };

  //todo: remove mock functionality
  const therapists = [
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
      name: "Dr. Amit Kumar",
      specialization: "Trauma & PTSD",
      bio: "Expert in trauma-focused therapy and EMDR techniques for healing from traumatic experiences.",
      rating: 4.7,
      reviews: 98,
      yearsExperience: 8,
      availability: "Tue-Sat, 10 AM-4 PM IST",
    },
    {
      name: "Dr. Priya Sharma",
      specialization: "Relationship Counseling",
      bio: "Helping couples and individuals navigate relationship challenges with evidence-based approaches.",
      rating: 4.9,
      reviews: 203,
      yearsExperience: 15,
      availability: "Wed-Sun, 3-8 PM IST",
    },
    {
      name: "Dr. Rajesh Mehta",
      specialization: "Stress & Burnout",
      bio: "Specializing in stress management and preventing burnout in high-pressure environments.",
      rating: 4.6,
      reviews: 87,
      yearsExperience: 10,
      availability: "Mon-Wed, 5-9 PM IST",
    }
  ];

  const healingCircles = [
    {
      name: "Anxiety Support Group",
      description: "A supportive space to share experiences and coping strategies for managing anxiety.",
      schedule: "Tuesdays, 7:00 PM IST",
      participants: 18,
      maxParticipants: 25,
    },
    {
      name: "Depression Recovery Circle",
      description: "Share experiences and support each other in the journey of recovery.",
      schedule: "Thursdays, 8:00 PM IST",
      participants: 14,
      maxParticipants: 20,
    },
    {
      name: "Mindfulness & Meditation",
      description: "Learn and practice mindfulness techniques together in a peaceful group setting.",
      schedule: "Fridays, 6:30 PM IST",
      participants: 22,
      maxParticipants: 30,
    },
    {
      name: "Stress Management Workshop",
      description: "Practical strategies for managing daily stress and building resilience.",
      schedule: "Saturdays, 5:00 PM IST",
      participants: 16,
      maxParticipants: 25,
    },
    {
      name: "Young Adults Support",
      description: "A peer support group for young adults navigating life challenges.",
      schedule: "Sundays, 4:00 PM IST",
      participants: 20,
      maxParticipants: 25,
    },
    {
      name: "Career Transition Support",
      description: "Support for professionals going through career changes and transitions.",
      schedule: "Mondays, 6:00 PM IST",
      participants: 12,
      maxParticipants: 20,
    }
  ];

  const streak = 7;
  const latestEQScore = 78;
  const sessionsCompleted = 12;
  const daysActive = 42;
  const journalEntries = 45;

  if (showSettings) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <nav className="border-b bg-card sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={newLogo} alt="Kairo" className="w-10 h-10" />
                <div>
                  <h1 className="text-xl font-bold">Kairo</h1>
                  <Badge variant="default">Pro Plan</Badge>
                </div>
              </div>
              <Button variant="ghost" onClick={() => setShowSettings(false)}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-6 py-8 flex-1">
          <Settings userName="Guest User" userEmail="user@example.com" />
        </div>
        <Footer />
      </div>
    );
  }

  if (showProfile) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <nav className="border-b bg-card sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={newLogo} alt="Kairo" className="w-10 h-10" />
                <div>
                  <h1 className="text-xl font-bold">Kairo</h1>
                  <Badge variant="default">Pro Plan</Badge>
                </div>
              </div>
              <Button variant="ghost" onClick={() => setShowProfile(false)}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-6 py-8 flex-1">
          <ProfileDashboard userName="Guest User" isPro={true} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showCalendar && <CalendarView onClose={() => setShowCalendar(false)} />}

      <nav className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={newLogo} alt="Kairo" className="w-10 h-10" data-testid="img-logo" />
              <div>
                <h1 className="text-xl font-bold" data-testid="text-app-title">Kairo</h1>
                <Badge variant="default" data-testid="badge-plan">Pro Plan</Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                <Award className="w-4 h-4 text-primary" data-testid="icon-streak" />
                <span className="font-semibold text-sm" data-testid="text-streak">{streak} day streak</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="button-profile-menu">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowProfile(true)} data-testid="menu-profile">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowSettings(true)} data-testid="menu-settings">
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} data-testid="menu-logout">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-8 w-full max-w-6xl mx-auto">
            <TabsTrigger value="home" data-testid="tab-home">
              <Home className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="journal" data-testid="tab-journal">
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Journal</span>
            </TabsTrigger>
            <TabsTrigger value="mood" data-testid="tab-mood">
              <Heart className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Mood</span>
            </TabsTrigger>
            <TabsTrigger value="ai" data-testid="tab-ai">
              <MessageCircle className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">AI</span>
            </TabsTrigger>
            <TabsTrigger value="circles" data-testid="tab-circles">
              <Users className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Circles</span>
            </TabsTrigger>
            <TabsTrigger value="therapists" data-testid="tab-therapists">
              <Stethoscope className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Therapy</span>
            </TabsTrigger>
            <TabsTrigger value="crisis" data-testid="tab-crisis">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Crisis</span>
            </TabsTrigger>
            <TabsTrigger value="assessments" data-testid="tab-assessments" onClick={() => setLocation('/assessments')}>
              <Brain className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Assessments</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-bold mb-2" data-testid="text-welcome">Welcome to Kairo Pro</h2>
                <p className="text-muted-foreground" data-testid="text-welcome-subtitle">Your personalized wellness companion</p>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <Card className="p-6" data-testid="card-streak">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold" data-testid="text-streak-count">{streak} Days</p>
                      <p className="text-sm text-muted-foreground">Current Streak</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6" data-testid="card-eq">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold" data-testid="text-eq-score">{latestEQScore}</p>
                      <p className="text-sm text-muted-foreground">Latest EQ Score</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6" data-testid="card-sessions">
                  <div className="flex items-center gap-3">
                    <Target className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold" data-testid="text-session-count">{sessionsCompleted}</p>
                      <p className="text-sm text-muted-foreground">Sessions</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 cursor-pointer hover-elevate" onClick={() => setActiveTab('journal')} data-testid="card-journal">
                  <div className="flex items-center gap-3">
                    <BookText className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold" data-testid="text-journal-count">{journalEntries}</p>
                      <p className="text-sm text-muted-foreground">Journals</p>
                    </div>
                  </div>
                </Card>
              </div>

              <NotificationsCard onViewCalendar={() => setShowCalendar(true)} />

              <DailyTip tip="Remember to practice self-compassion today. Treat yourself with the same kindness you'd offer a good friend." />

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-2 border-primary/20 hover-elevate cursor-pointer" onClick={() => setLocation('/assessments')} data-testid="card-assessments">
                <div className="flex items-start gap-4">
                  <div className="bg-primary p-4 rounded-full">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Take Your Psychological Assessments</h3>
                    <p className="text-muted-foreground mb-4">
                      Track your emotional wellness with scientifically validated assessments. 
                      Complete the PANAS Scale for mood tracking and the EIS-HPD test for comprehensive emotional intelligence analysis with detailed factor breakdowns.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <span>Start Assessments</span>
                      <span className="text-xl">→</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="journal">
            <JournalEntry
              onSave={(entry) => console.log('Journal saved:', entry)}
              showPrompts={true}
              showPreviousEntries={true}
            />
          </TabsContent>

          <TabsContent value="mood">
            <MoodTracker />
          </TabsContent>

          <TabsContent value="ai">
            <AIVentRoom isPro={true} />
          </TabsContent>

          <TabsContent value="circles" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2" data-testid="text-circles-title">Healing Circles</h2>
              <p className="text-muted-foreground" data-testid="text-circles-subtitle">
                Join unlimited healing circles and connect with supportive communities
              </p>
            </div>
            <div className="space-y-4">
              {healingCircles.map((circle, index) => (
                <HealingCircle
                  key={index}
                  {...circle}
                  isPro={true}
                  isJoined={joinedCircles.includes(circle.name)}
                  canJoinMore={true}
                  onJoin={() => handleJoinCircle(circle.name)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="therapists" className="space-y-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2" data-testid="text-therapists-title">Professional Therapists</h2>
              <p className="text-muted-foreground" data-testid="text-therapists-subtitle">
                Choose your therapist and schedule sessions at your convenience
              </p>
            </div>

            {bookingTherapist ? (
              <SessionBooking
                therapistName={bookingTherapist.name}
                availability={bookingTherapist.availability}
                onBook={(booking) => {
                  setSessionConfirmation({
                    therapistName: booking.therapistName,
                    date: booking.date,
                    time: booking.time,
                    notes: booking.notes
                  });
                  setBookingTherapist(null);
                }}
                onCancel={() => setBookingTherapist(null)}
              />
            ) : (
              <>
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5" data-testid="card-get-matched">
                  <h3 className="text-xl font-bold mb-2">Get Matched with the Right Therapist</h3>
                  <p className="text-muted-foreground mb-4">
                    Answer a few questions and we'll recommend therapists that match your needs and preferences.
                  </p>
                  <Button onClick={() => setLocation('/therapist-matching')} data-testid="button-start-matching">
                    Start Matching Process
                  </Button>
                </Card>

                <div className="space-y-4">
                  {therapists.map((therapist, index) => (
                    <TherapistCard
                      key={index}
                      {...therapist}
                      canSchedule={true}
                      onSchedule={() => setBookingTherapist({ name: therapist.name, availability: therapist.availability })}
                    />
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="crisis">
            <CrisisSupport isPro={true} />
          </TabsContent>
        </Tabs>
      </div>

      {sessionConfirmation && (
        <SessionConfirmation
          therapistName={sessionConfirmation.therapistName}
          date={sessionConfirmation.date}
          time={sessionConfirmation.time}
          notes={sessionConfirmation.notes}
          onClose={() => setSessionConfirmation(null)}
        />
      )}

      <Footer />
    </div>
  );
}
