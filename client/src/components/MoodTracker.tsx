import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Smile, Meh, Frown, TrendingDown, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

const moodOptions = [
  { label: 'Great', value: 'great', icon: '😊', color: 'bg-green-500' },
  { label: 'Good', value: 'good', icon: '🙂', color: 'bg-green-400' },
  { label: 'Okay', value: 'okay', icon: '😐', color: 'bg-yellow-500' },
  { label: 'Low', value: 'low', icon: '😔', color: 'bg-orange-500' },
  { label: 'Bad', value: 'bad', icon: '😢', color: 'bg-red-500' },
];

interface MoodEntry {
  id: number;
  mood: string;
  note: string;
  date: string;
  time: string;
}

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  //todo: remove mock functionality
  const [moodHistory] = useState<MoodEntry[]>([
    { id: 1, mood: 'good', note: 'Had a productive meeting at work', date: '2025-10-27', time: '2:30 PM' },
    { id: 2, mood: 'okay', note: 'Feeling a bit tired but managing', date: '2025-10-27', time: '10:15 AM' },
    { id: 3, mood: 'great', note: 'Morning meditation helped me feel centered', date: '2025-10-26', time: '8:00 AM' },
    { id: 4, mood: 'low', note: 'Struggling with some anxiety', date: '2025-10-25', time: '6:45 PM' },
  ]);

  const handleSave = () => {
    if (selectedMood) {
      console.log('Mood logged:', { mood: selectedMood, note });
      setSaved(true);
      setTimeout(() => {
        setSelectedMood('');
        setNote('');
        setSaved(false);
      }, 2000);
    }
  };

  const getMoodData = (moodValue: string) => {
    return moodOptions.find(m => m.value === moodValue);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6" data-testid="card-mood-tracker">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Heart className="w-6 h-6 text-primary" data-testid="icon-heart" />
          </div>
          <div>
            <h2 className="text-2xl font-bold" data-testid="text-mood-title">Track Your Mood</h2>
            <p className="text-muted-foreground" data-testid="text-mood-subtitle">Log how you're feeling throughout the day</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-3 block" data-testid="text-mood-label">How are you feeling right now?</label>
            <div className="grid grid-cols-5 gap-3">
              {moodOptions.map((mood) => (
                <Button
                  key={mood.value}
                  variant={selectedMood === mood.value ? 'default' : 'outline'}
                  className="flex flex-col gap-2 h-auto py-4"
                  onClick={() => setSelectedMood(mood.value)}
                  data-testid={`button-mood-${mood.value}`}
                >
                  <span className="text-3xl">{mood.icon}</span>
                  <span className="text-sm">{mood.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block" data-testid="text-note-label">What's contributing to this mood?</label>
            <Textarea
              placeholder="Optional: Add a note about what's influencing your mood today..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[120px]"
              data-testid="input-mood-note"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={!selectedMood || saved}
            className="w-full"
            data-testid="button-save-mood"
          >
            {saved ? 'Mood Logged!' : 'Log Mood'}
          </Button>
        </div>
      </Card>

      <Card className="p-6" data-testid="card-mood-history">
        <h3 className="text-xl font-bold mb-4" data-testid="text-history-title">Recent Mood History</h3>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {moodHistory.map((entry) => {
              const moodData = getMoodData(entry.mood);
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-muted rounded-lg"
                  data-testid={`mood-entry-${entry.id}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{moodData?.icon}</span>
                      <span className="font-medium capitalize">{entry.mood}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {entry.date} at {entry.time}
                    </div>
                  </div>
                  {entry.note && <p className="text-sm text-muted-foreground">{entry.note}</p>}
                </motion.div>
              );
            })}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
