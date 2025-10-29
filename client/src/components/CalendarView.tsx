import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar, Users, Stethoscope, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface CalendarEvent {
  id: number;
  date: string;
  type: 'session' | 'circle';
  title: string;
  time: string;
}

//todo: remove mock functionality
const events: CalendarEvent[] = [
  { id: 1, date: '2025-10-28', type: 'session', title: 'Dr. Sarah Patel', time: '3:00 PM' },
  { id: 2, date: '2025-10-28', type: 'circle', title: 'Anxiety Support', time: '7:00 PM' },
  { id: 3, date: '2025-10-29', type: 'session', title: 'Dr. Priya Sharma', time: '4:00 PM' },
  { id: 4, date: '2025-10-31', type: 'circle', title: 'Mindfulness Group', time: '6:30 PM' },
];

interface CalendarViewProps {
  onClose?: () => void;
}

export default function CalendarView({ onClose }: CalendarViewProps) {
  const [currentMonth] = useState(new Date(2025, 9, 1)); // October 2025

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventsForDate = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${year}-${month}-${dayStr}`;
    return events.filter(e => e.date === dateStr);
  };

  const days = getDaysInMonth();
  const today = 28; // Mock today as Oct 28

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50" data-testid="modal-calendar">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl"
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={onClose} data-testid="button-back" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h2 className="text-2xl font-bold" data-testid="text-calendar-title">
                <Calendar className="w-6 h-6 inline mr-2" />
                Your Schedule
              </h2>
            </div>
            <Button variant="ghost" onClick={onClose} data-testid="button-close">
              Close
            </Button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-sm p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const dayEvents = day ? getEventsForDate(day) : [];
              const isToday = day === today;

              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border rounded-lg ${
                    day ? 'bg-card hover:bg-muted/50' : 'bg-muted/20'
                  } ${isToday ? 'border-primary border-2' : ''}`}
                  data-testid={day ? `calendar-day-${day}` : `calendar-empty-${index}`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-semibold mb-2 ${isToday ? 'text-primary' : ''}`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded ${
                              event.type === 'session' ? 'bg-primary/20 text-primary' : 'bg-secondary/50'
                            }`}
                            data-testid={`event-${event.id}`}
                          >
                            <div className="flex items-center gap-1">
                              {event.type === 'session' ? (
                                <Stethoscope className="w-3 h-3" />
                              ) : (
                                <Users className="w-3 h-3" />
                              )}
                              <span className="truncate">{event.title}</span>
                            </div>
                            <div className="text-[10px] opacity-75">{event.time}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary/20 rounded" />
              <span>Therapy Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-secondary/50 rounded" />
              <span>Healing Circles</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
