import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Lock, Moon, Globe, Shield } from 'lucide-react';

interface SettingsProps {
  userName?: string;
  userEmail?: string;
}

export default function Settings({ userName = "Guest User", userEmail = "user@example.com" }: SettingsProps) {
  const [notifications, setNotifications] = useState({
    sessions: true,
    circles: true,
    reminders: true,
    newsletter: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    activityVisible: false,
  });

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="p-6" data-testid="card-settings">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 p-3 rounded-lg">
            <SettingsIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Profile Information
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={userName} data-testid="input-name" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={userEmail} data-testid="input-email" />
                </div>
                <Button variant="outline" data-testid="button-save-profile">
                  Save Changes
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Change Password
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" data-testid="input-current-password" />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" data-testid="input-new-password" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" data-testid="input-confirm-password" />
                </div>
                <Button variant="outline" data-testid="button-change-password">
                  Update Password
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sessions-notif">Session Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get notified about upcoming therapy sessions</p>
                  </div>
                  <Switch 
                    id="sessions-notif" 
                    checked={notifications.sessions}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sessions: checked })}
                    data-testid="switch-sessions"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="circles-notif">Circle Notifications</Label>
                    <p className="text-sm text-muted-foreground">Stay updated on healing circle activities</p>
                  </div>
                  <Switch 
                    id="circles-notif" 
                    checked={notifications.circles}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, circles: checked })}
                    data-testid="switch-circles"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reminders-notif">Daily Reminders</Label>
                    <p className="text-sm text-muted-foreground">Mood check-ins and journal prompts</p>
                  </div>
                  <Switch 
                    id="reminders-notif" 
                    checked={notifications.reminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, reminders: checked })}
                    data-testid="switch-reminders"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newsletter-notif">Newsletter</Label>
                    <p className="text-sm text-muted-foreground">Wellness tips and platform updates</p>
                  </div>
                  <Switch 
                    id="newsletter-notif" 
                    checked={notifications.newsletter}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newsletter: checked })}
                    data-testid="switch-newsletter"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Privacy Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="profile-visible">Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">Allow others to see your profile</p>
                  </div>
                  <Switch 
                    id="profile-visible" 
                    checked={privacy.profileVisible}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
                    data-testid="switch-profile-visible"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="activity-visible">Activity Status</Label>
                    <p className="text-sm text-muted-foreground">Show when you're active</p>
                  </div>
                  <Switch 
                    id="activity-visible" 
                    checked={privacy.activityVisible}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, activityVisible: checked })}
                    data-testid="switch-activity-visible"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Appearance
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle dark theme</p>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  data-testid="switch-dark-mode"
                />
              </div>
            </div>

            <Separator />

            <div className="pt-4">
              <Button variant="destructive" className="w-full" data-testid="button-delete-account">
                Delete Account
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-2">
                This action cannot be undone
              </p>
            </div>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
