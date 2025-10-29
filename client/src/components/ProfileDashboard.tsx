import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, Calendar, Users, BookOpen, Heart, TrendingUp, Lightbulb, Mail, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface ProfileDashboardProps {
  userName?: string;
  isPro?: boolean;
}

export default function ProfileDashboard({ userName = "Guest User", isPro = false }: ProfileDashboardProps) {
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedName, setEditedName] = useState(userName);
  const [editedEmail, setEditedEmail] = useState("user@example.com");
  const [currentUserName, setCurrentUserName] = useState(userName);
  const [currentEmail, setCurrentEmail] = useState("user@example.com");

  const stats = {
    journalEntries: 24,
    moodEntries: 45,
    circlesJoined: isPro ? 3 : 1,
    sessionsCompleted: 8,
    daysActive: 42,
  };

  const recentActivity = [
    { type: 'journal', text: 'Added journal entry', time: '2 hours ago' },
    { type: 'mood', text: 'Logged mood as "Good"', time: '5 hours ago' },
    { type: 'circle', text: 'Joined Mindfulness Circle', time: '1 day ago' },
  ];

  const wellnessTips = [
    "Try deep breathing for 5 minutes daily to reduce stress",
    "Maintain a consistent sleep schedule for better mental health",
    "Practice gratitude by writing 3 things you're thankful for each day",
  ];

  const handleSaveProfile = () => {
    setCurrentUserName(editedName);
    setCurrentEmail(editedEmail);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleOpenEditDialog = () => {
    setEditedName(currentUserName);
    setEditedEmail(currentEmail);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6" data-testid="card-profile-info">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl">
              {currentUserName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1" data-testid="text-user-name">{currentUserName}</h2>
            <p className="text-sm text-muted-foreground mb-2">{currentEmail}</p>
            <Badge variant={isPro ? 'default' : 'secondary'} data-testid="badge-plan">
              {isPro ? 'Pro Plan' : 'Free Plan'}
            </Badge>
          </div>
          <Button variant="outline" data-testid="button-edit-profile" onClick={handleOpenEditDialog}>
            <User className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg" data-testid="stat-days">
            <div className="text-2xl font-bold text-primary">{stats.daysActive}</div>
            <div className="text-xs text-muted-foreground mt-1">Days Active</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg" data-testid="stat-journal">
            <div className="text-2xl font-bold text-primary">{stats.journalEntries}</div>
            <div className="text-xs text-muted-foreground mt-1">Journal Entries</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg" data-testid="stat-mood">
            <div className="text-2xl font-bold text-primary">{stats.moodEntries}</div>
            <div className="text-xs text-muted-foreground mt-1">Mood Logs</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg" data-testid="stat-circles">
            <div className="text-2xl font-bold text-primary">{stats.circlesJoined}</div>
            <div className="text-xs text-muted-foreground mt-1">Circles Joined</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg" data-testid="stat-sessions">
            <div className="text-2xl font-bold text-primary">{stats.sessionsCompleted}</div>
            <div className="text-xs text-muted-foreground mt-1">Sessions</div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6" data-testid="card-recent-activity">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Recent Activity
          </h3>
          <ScrollArea className="h-[200px]">
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg" data-testid={`activity-${index}`}>
                  <div className="bg-primary/10 p-2 rounded">
                    {activity.type === 'journal' && <BookOpen className="w-4 h-4 text-primary" />}
                    {activity.type === 'mood' && <Heart className="w-4 h-4 text-primary" />}
                    {activity.type === 'circle' && <Users className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="p-6" data-testid="card-wellness-tips">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Wellness Tips for You
          </h3>
          <div className="space-y-3">
            {wellnessTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-primary/5 rounded-lg border-l-4 border-primary"
                data-testid={`tip-${index}`}
              >
                <p className="text-sm">{tip}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {!isPro && (
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5" data-testid="card-upgrade-prompt">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Unlock More Features with Pro</h3>
            <p className="text-muted-foreground mb-4">
              Get unlimited mood tracking, personalized insights, and choose your own therapist
            </p>
            <Button data-testid="button-upgrade">Upgrade to Pro</Button>
          </div>
        </Card>
      )}

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your personal information below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
