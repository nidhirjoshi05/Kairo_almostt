import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Notification {
  id: number;
  type: 'session' | 'circle' | 'reminder';
  title: string;
  message: string;
  time: string;
  daysLeft?: number;
}

//todo: remove mock functionality
const notifications: Notification[] = [
  { id: 1, type: 'session', title: 'Upcoming Session', message: 'Session with Dr. Sarah Patel', time: 'Today, 3:00 PM', daysLeft: 0 },
  { id: 2, type: 'circle', title: 'Circle Today', message: 'Anxiety Support Group starts in 2 hours', time: 'Today, 7:00 PM', daysLeft: 0 },
  { id: 3, type: 'session', title: 'Session Reminder', message: 'Follow-up with Dr. Priya Sharma', time: 'Tomorrow, 4:00 PM', daysLeft: 1 },
  { id: 4, type: 'reminder', title: 'Mood Check-in', message: "Don't forget to log your mood today", time: 'Pending', daysLeft: 0 },
];

interface NotificationsCardProps {
  onViewCalendar?: () => void;
  isPro?: boolean;
}

export default function NotificationsCard({ onViewCalendar, isPro = true }: NotificationsCardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'session': return <Calendar className="w-4 h-4" />;
      case 'circle': return <Users className="w-4 h-4" />;
      case 'reminder': return <Bell className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getColor = (daysLeft?: number) => {
    if (daysLeft === 0) return 'text-destructive';
    if (daysLeft === 1) return 'text-orange-500';
    return 'text-primary';
  };

  const filteredNotifications = isPro 
    ? notifications 
    : notifications.filter(n => n.type === 'circle');

  return (
    <Card className="p-6" data-testid="card-notifications">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Reminders & Notifications</h3>
            <p className="text-sm text-muted-foreground">
              {isPro ? 'Stay on track with your wellness journey' : 'Stay updated on circle activities'}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onViewCalendar} data-testid="button-view-calendar">
          <Calendar className="w-4 h-4 mr-2" />
          Calendar
        </Button>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-muted rounded-lg"
              data-testid={`notification-${notification.id}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`mt-1 ${getColor(notification.daysLeft)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
                {notification.daysLeft !== undefined && notification.daysLeft <= 2 && (
                  <Badge variant={notification.daysLeft === 0 ? 'destructive' : 'secondary'} className="text-xs">
                    {notification.daysLeft === 0 ? 'Today' : `${notification.daysLeft}d left`}
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
