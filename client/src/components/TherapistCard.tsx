import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Star, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface TherapistCardProps {
  name: string;
  specialization: string;
  bio: string;
  rating: number;
  reviews: number;
  yearsExperience: number;
  availability?: string;
  canSchedule?: boolean;
  onSchedule?: () => void;
}

export default function TherapistCard({
  name,
  specialization,
  bio,
  rating,
  reviews,
  yearsExperience,
  availability,
  canSchedule = false,
  onSchedule
}: TherapistCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 hover-elevate" data-testid="card-therapist">
        <div className="flex gap-4">
          <Avatar className="w-16 h-16" data-testid="avatar-therapist">
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-bold mb-1" data-testid="text-therapist-name">{name}</h3>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="secondary" data-testid="badge-specialization">{specialization}</Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold" data-testid="text-rating">{rating.toFixed(1)}</span>
                  <span className="text-muted-foreground" data-testid="text-reviews">({reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Award className="w-4 h-4" />
                  <span data-testid="text-experience">{yearsExperience} years</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2" data-testid="text-therapist-bio">
              {bio}
            </p>
            
            {availability && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" data-testid="icon-clock" />
                <span data-testid="text-availability">{availability}</span>
              </div>
            )}

            {canSchedule ? (
              <Button
                onClick={onSchedule}
                className="w-full"
                data-testid="button-schedule"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Session
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground italic" data-testid="text-view-only">
                View only - Upgrade to Pro to schedule sessions
              </p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
