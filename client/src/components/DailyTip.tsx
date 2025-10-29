import { Card } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface DailyTipProps {
  tip?: string;
}

export default function DailyTip({ tip }: DailyTipProps) {
  const defaultTip = "Take a few deep breaths. Inhale for 4 counts, hold for 4, exhale for 4. Notice how your body relaxes.";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-[#A1E3F9]/20 to-[#D1F8EF]/20 border-[#A1E3F9]/30" data-testid="card-daily-tip">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Lightbulb className="w-6 h-6 text-primary" data-testid="icon-lightbulb" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2" data-testid="text-tip-title">Daily Wellness Tip</h3>
            <p className="text-muted-foreground" data-testid="text-tip-content">{tip || defaultTip}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
