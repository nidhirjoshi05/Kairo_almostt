import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Smile, Meh, Frown, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

const moods = [
  { icon: Smile, label: 'Happy', value: 'happy', color: 'text-green-500' },
  { icon: Meh, label: 'Neutral', value: 'neutral', color: 'text-yellow-500' },
  { icon: Frown, label: 'Sad', value: 'sad', color: 'text-blue-500' },
];

//todo: remove mock functionality
const writingPrompts = [
  "What brought you joy today?",
  "What challenged you today, and how did you respond?",
  "What are you grateful for right now?",
  "Describe a moment when you felt proud of yourself recently.",
  "What emotions are you experiencing right now, and why?",
];

interface Entry {
  id: number;
  content: string;
  mood: string;
  date: string;
}

interface JournalEntryProps {
  onSave?: (entry: { content: string; mood: string }) => void;
  showPrompts?: boolean;
  showPreviousEntries?: boolean;
}

export default function JournalEntry({ onSave, showPrompts = false, showPreviousEntries = true }: JournalEntryProps) {
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [saved, setSaved] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  //todo: remove mock functionality
  const [previousEntries] = useState<Entry[]>([
    { id: 1, content: "Had a productive day at work. Feeling accomplished.", mood: "happy", date: "2025-10-27" },
    { id: 2, content: "Dealing with some anxiety about upcoming deadlines.", mood: "sad", date: "2025-10-26" },
    { id: 3, content: "Spent time with family. Feeling grateful and content.", mood: "happy", date: "2025-10-25" },
  ]);

  const handleSave = () => {
    if (content.trim()) {
      onSave?.({ content, mood: selectedMood });
      setSaved(true);
      setTimeout(() => {
        setContent('');
        setSelectedMood('');
        setSaved(false);
        setSelectedPrompt(null);
      }, 2000);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    setContent(content + (content ? '\n\n' : '') + prompt + '\n');
  };

  const getMoodIcon = (mood: string) => {
    const moodData = moods.find(m => m.value === mood);
    if (!moodData) return null;
    const Icon = moodData.icon;
    return <Icon className={`w-4 h-4 ${moodData.color}`} />;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6" data-testid="card-journal">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 p-3 rounded-lg">
            <BookOpen className="w-6 h-6 text-primary" data-testid="icon-journal" />
          </div>
          <div>
            <h2 className="text-2xl font-bold" data-testid="text-journal-title">Journal Entry</h2>
            <p className="text-muted-foreground" data-testid="text-journal-subtitle">Express your thoughts and feelings</p>
          </div>
        </div>

        <div className="space-y-6">
          {showPrompts && (
            <div>
              <label className="text-sm font-medium mb-3 block" data-testid="text-prompts-label">Writing Prompts</label>
              <div className="flex flex-wrap gap-2">
                {writingPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePromptClick(prompt)}
                    className="text-xs"
                    data-testid={`button-prompt-${index}`}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-3 block" data-testid="text-mood-label">How are you feeling today?</label>
            <div className="flex gap-3">
              {moods.map((mood) => (
                <Button
                  key={mood.value}
                  variant={selectedMood === mood.value ? 'default' : 'outline'}
                  className="flex-1 flex items-center gap-2"
                  onClick={() => setSelectedMood(mood.value)}
                  data-testid={`button-mood-${mood.value}`}
                >
                  <mood.icon className="w-5 h-5" />
                  {mood.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Textarea
              placeholder="What's on your mind today? Write freely about your thoughts, feelings, or experiences..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
              data-testid="input-journal-content"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={!content.trim() || saved}
            className="w-full"
            data-testid="button-save-journal"
          >
            {saved ? 'Saved!' : 'Save Entry'}
          </Button>
        </div>
      </Card>

      {showPreviousEntries && (
        <Card className="p-6" data-testid="card-previous-entries">
          <h3 className="text-xl font-bold mb-4" data-testid="text-previous-title">Previous Entries</h3>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {previousEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-muted rounded-lg"
                  data-testid={`entry-${entry.id}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getMoodIcon(entry.mood)}
                      <span className="text-xs text-muted-foreground capitalize">{entry.mood}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {entry.date}
                    </div>
                  </div>
                  <p className="text-sm">{entry.content}</p>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      )}
    </div>
  );
}
