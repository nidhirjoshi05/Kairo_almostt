import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface HealingCircleProps {
  name: string;
  description: string;
  schedule: string;
  participants: number;
  maxParticipants: number;
  isJoined?: boolean;
  onJoin?: () => void;
  isPro?: boolean;
  canJoinMore?: boolean;
}

export default function HealingCircle({
  name,
  description,
  schedule,
  participants,
  maxParticipants,
  isJoined = false,
  onJoin,
  isPro = false,
  canJoinMore = true
}: HealingCircleProps) {
  const isDisabled = isJoined || participants >= maxParticipants || (!isPro && !canJoinMore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-6 hover-elevate" data-testid="card-healing-circle">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2" data-testid="text-circle-name">{name}</h3>
              <p className="text-muted-foreground text-sm" data-testid="text-circle-description">{description}</p>
            </div>
            <Badge variant={isJoined ? 'default' : 'secondary'} data-testid="badge-status">
              {isJoined ? 'Joined' : 'Available'}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" data-testid="icon-calendar" />
              <span data-testid="text-schedule">{schedule}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" data-testid="icon-users" />
              <span data-testid="text-participants">{participants}/{maxParticipants} participants</span>
            </div>
          </div>

          {!isPro && !canJoinMore && !isJoined && (
            <p className="text-sm text-muted-foreground italic" data-testid="text-limit-message">
              Free plan allows 1 circle per month. Upgrade to Pro for unlimited access.
            </p>
          )}

          <Button
            onClick={onJoin}
            disabled={isDisabled}
            className="w-full"
            variant={isJoined ? 'secondary' : 'default'}
            data-testid="button-join"
          >
            {isJoined ? 'Joined' : participants >= maxParticipants ? 'Full' : !canJoinMore && !isPro ? 'Limit Reached' : 'Join Circle'}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
