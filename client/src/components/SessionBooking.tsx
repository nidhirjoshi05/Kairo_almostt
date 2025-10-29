import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SessionBookingProps {
  therapistName: string;
  availability?: string;
  onBook?: (booking: any) => void;
  onCancel?: () => void;
}

export default function SessionBooking({ therapistName, availability = "Mon-Fri, 9AM-5PM", onBook, onCancel }: SessionBookingProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const availableTimeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBook?.({ therapistName, date, time, notes });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6" data-testid="card-booking">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2" data-testid="text-booking-title">
            Book Session with {therapistName}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Available: {availability}</span>
          </div>
        </div>

        <div className="mb-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Available Time Slots
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {availableTimeSlots.map((slot) => (
              <Badge
                key={slot}
                variant="outline"
                className="justify-center py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setTime(slot)}
                data-testid={`timeslot-${slot}`}
              >
                {slot}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Click a time slot to select it, or enter your own preferred time below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date">Preferred Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              data-testid="input-date"
            />
          </div>

          <div>
            <Label htmlFor="time">Preferred Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              data-testid="input-time"
            />
          </div>

          <div>
            <Label htmlFor="notes">Session Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any specific topics or concerns you'd like to discuss..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              data-testid="input-notes"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1" data-testid="button-book">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Confirm Booking
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
