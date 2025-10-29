import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
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
import AIVentRoom from './AIVentRoom';
import HealingCircle from './HealingCircle';
import TherapistCard from './TherapistCard';
import CrisisSupport from './CrisisSupport';
import NotificationsCard from './NotificationsCard';
import CalendarView from './CalendarView';
import ProfileDashboard from './ProfileDashboard';
import Settings from './Settings';
import SessionConfirmation from './SessionConfirmation';
import Footer from './Footer';
import { Home, BookOpen, MessageCircle, Users, AlertCircle, Stethoscope, User, Settings as SettingsIcon, LogOut, Sparkles, Calendar, BookText, Brain } from 'lucide-react';
import newLogo from '@assets/Screenshot_2025-10-28_at_12.16.32_PM-removebg-preview_1761714308881.png';

export default function FreePlanDashboard() {
  const [, setLocation] = useLocation();
  const { setPlan } = usePlan();
  const [hasCompletedEQ, setHasCompletedEQ] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
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

  const handleUpgrade = () => {
    setPlan('pro');
    setLocation('/pro');
  };

  const handleJoinCircle = (circleName: string) => {
    if (joinedCircles.length < 1) {
      setJoinedCircles([...joinedCircles, circleName]);
      console.log('Joined circle:', circleName);
    }
  };

  const handleFreeSessionBooking = () => {
    const randomTherapist = therapists[Math.floor(Math.random() * therapists.length)];
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const dateStr = nextWeek.toISOString().split('T')[0];
    
    setSessionConfirmation({
      therapistName: randomTherapist.name,
      date: dateStr,
      time: '10:00',
      notes: 'This is your complimentary first session. The therapist has been randomly assigned based on availability.'
    });
  };

  //todo: remove mock functionality
  const therapists = [
    {
      name: "Dr. Sarah Patel",
      specialization: "Anxiety & Depression",
      bio: "Specializing in cognitive behavioral therapy with over 10 years of experience.",
      rating: 4.8,
      reviews: 156,
      yearsExperience: 12,
      availability: "Mon-Fri, 2-6 PM IST",
    },
    {
      name: "Dr. Amit Kumar",
      specialization: "Trauma & PTSD",
      bio: "Expert in trauma-focused therapy and EMDR techniques.",
      rating: 4.7,
      reviews: 98,
      yearsExperience: 8,
      availability: "Tue-Sat, 10 AM-4 PM IST",
    },
    {
      name: "Dr. Priya Sharma",
      specialization: "Relationship Counseling",
      bio: "Helping couples and individuals navigate relationship challenges.",
      rating: 4.9,
      reviews: 203,
      yearsExperience: 15,
      availability: "Wed-Sun, 3-8 PM IST",
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
    }
  ];

  const daysActive = 42;
  const journalEntries = 24;

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
                  <p className="text-xs text-muted-foreground">Free Plan</p>
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
                  <p className="text-xs text-muted-foreground">Free Plan</p>
                </div>
              </div>
              <Button variant="ghost" onClick={() => setShowProfile(false)}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-6 py-8 flex-1">
          <ProfileDashboard userName="Guest User" isPro={false} />
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
                <p className="text-xs text-muted-foreground" data-testid="text-plan-type">Free Plan</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="default" onClick={handleUpgrade} data-testid="button-upgrade">
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
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
          <TabsList className="grid grid-cols-7 w-full max-w-5xl mx-auto">
            <TabsTrigger value="home" data-testid="tab-home">
              <Home className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="journal" data-testid="tab-journal">
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Journal</span>
            </TabsTrigger>
            <TabsTrigger value="vent" data-testid="tab-vent">
              <MessageCircle className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Vent</span>
            </TabsTrigger>
            <TabsTrigger value="circles" data-testid="tab-circles">
              <Users className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Circles</span>
            </TabsTrigger>
            <TabsTrigger value="crisis" data-testid="tab-crisis">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Crisis</span>
            </TabsTrigger>
            <TabsTrigger value="consultations" data-testid="tab-consultations">
              <Stethoscope className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Consult</span>
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
                <h2 className="text-3xl font-bold mb-2" data-testid="text-welcome">Welcome to Kairo</h2>
                <p className="text-muted-foreground" data-testid="text-welcome-subtitle">Your journey to emotional wellness</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-6" data-testid="card-days-active">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold" data-testid="text-days-count">{daysActive}</p>
                      <p className="text-sm text-muted-foreground">Days Active</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 cursor-pointer hover-elevate" onClick={() => setActiveTab('journal')} data-testid="card-journal-entries">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <BookText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold" data-testid="text-entries-count">{journalEntries}</p>
                      <p className="text-sm text-muted-foreground">Journal Entries</p>
                    </div>
                  </div>
                </Card>
              </div>

              <NotificationsCard onViewCalendar={() => setShowCalendar(true)} isPro={false} />

              <DailyTip />

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-2 border-primary/20 hover-elevate cursor-pointer" onClick={() => setLocation('/assessments')} data-testid="card-assessments">
                <div className="flex items-start gap-4">
                  <div className="bg-primary p-4 rounded-full">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Take Your Psychological Assessments</h3>
                    <p className="text-muted-foreground mb-4">
                      Understand your current emotional state and emotional intelligence through scientifically validated assessments. 
                      Complete the PANAS Scale to check your mood, and explore the EIS-HPD test to discover your emotional intelligence.
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
              showPrompts={false}
              showPreviousEntries={true}
            />
          </TabsContent>

          <TabsContent value="vent">
            <AIVentRoom isPro={false} />
          </TabsContent>

          <TabsContent value="circles" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2" data-testid="text-circles-title">Healing Circles</h2>
              <p className="text-muted-foreground" data-testid="text-circles-subtitle">
                Join 1 healing circle per month with the Free plan
              </p>
            </div>
            <div className="space-y-4">
              {healingCircles.map((circle, index) => (
                <HealingCircle
                  key={index}
                  {...circle}
                  isPro={false}
                  isJoined={joinedCircles.includes(circle.name)}
                  canJoinMore={joinedCircles.length < 1}
                  onJoin={() => handleJoinCircle(circle.name)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="crisis">
            <CrisisSupport isPro={false} />
          </TabsContent>

          <TabsContent value="consultations" className="space-y-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2" data-testid="text-consultations-title">Paid Consultations</h2>
              <p className="text-muted-foreground mb-4" data-testid="text-consultations-subtitle">
                Professional Therapists - Connect with licensed mental health professionals. Choose your own therapist and schedule sessions at your convenience.
              </p>
              <Card className="p-6 bg-primary/5" data-testid="card-free-session">
                <h3 className="font-semibold text-lg mb-2">First Session Free!</h3>
                <p className="text-muted-foreground mb-4">
                  Your first therapy session is completely free. A therapist will be randomly assigned to you.
                </p>
                <Button onClick={handleFreeSessionBooking} data-testid="button-book-free">Book Your Free Session</Button>
              </Card>
            </div>

            <div className="space-y-4">
              {therapists.map((therapist, index) => (
                <TherapistCard
                  key={index}
                  {...therapist}
                  canSchedule={false}
                />
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5" data-testid="card-pro-features">
              <h3 className="text-xl font-bold mb-3">Pro Plan Features</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Choose your own therapist based on specialization and availability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Schedule unlimited therapy sessions at discounted rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Message your therapist between sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Access to premium therapists and specialists</span>
                </li>
              </ul>
              <Button onClick={handleUpgrade} data-testid="button-upgrade-consult">
                Upgrade to Pro
              </Button>
            </Card>
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
