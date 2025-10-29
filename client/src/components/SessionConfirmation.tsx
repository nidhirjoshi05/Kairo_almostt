import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Calendar as CalendarIcon, Clock, User, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface SessionConfirmationProps {
  therapistName: string;
  date: string;
  time: string;
  notes?: string;
  onClose: () => void;
}

export default function SessionConfirmation({ 
  therapistName, 
  date, 
  time, 
  notes, 
  onClose 
}: SessionConfirmationProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
    >
      <Card className="max-w-lg w-full p-6">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Session Confirmed!</h2>
          <p className="text-muted-foreground">
            Your therapy session has been successfully scheduled
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <User className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Therapist</p>
              <p className="font-semibold">{therapistName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <CalendarIcon className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-semibold">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <Clock className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-semibold">{time}</p>
            </div>
          </div>

          {notes && (
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <FileText className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Session Notes</p>
                <p className="text-sm">{notes}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Note:</strong> A confirmation email has been sent to your registered email address. 
            Please check your calendar for the session details.
          </p>
        </div>

        <Button onClick={onClose} className="w-full" size="lg">
          Close
        </Button>
      </Card>
    </motion.div>
  );
}
