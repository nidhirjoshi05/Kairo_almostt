import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { usePlan } from '@/contexts/PlanContext';
import therapistSession from '@assets/generated_images/Therapist_video_session_illustration_d3ba7d9c.png';
import counselorLaptop from '@assets/generated_images/Friendly_counselor_on_laptop_c61e16f3.png';
import { ArrowLeft } from 'lucide-react';

export default function DualOptionPage() {
  const [, setLocation] = useLocation();
  const { setPlan } = usePlan();
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  const handleProClick = () => {
    setPlan('pro');
    setLocation('/auth');
  };

  const handleFreeClick = () => {
    setPlan('free');
    setLocation('/auth');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-8 left-8 z-20">
        <Button
          variant="ghost"
          onClick={() => setLocation('/')}
          className="hover-elevate"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="grid md:grid-cols-2 min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ 
            opacity: 1, 
            x: hoveredSide === 'left' ? 0 : hoveredSide === 'right' ? -20 : 0,
            scale: hoveredSide === 'left' ? 1.02 : hoveredSide === 'right' ? 0.98 : 1
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onMouseEnter={() => setHoveredSide('left')}
          onMouseLeave={() => setHoveredSide(null)}
          className="bg-gradient-to-br from-[#2d5a8f] to-[#4a7cb8] flex items-center justify-center p-12 relative cursor-pointer"
        >
          <div className="max-w-lg text-center text-white space-y-6 relative z-10">
            <motion.img 
              src={therapistSession} 
              alt="Therapist Session" 
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl mb-8"
              animate={{ scale: hoveredSide === 'left' ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              data-testid="img-therapist-session"
            />
            <h2 className="text-4xl font-bold" data-testid="text-pro-title">
              Regular consultations with experts of your choice
            </h2>
            <p className="text-xl text-white/90 font-light" data-testid="text-pro-subtitle">
              Professional help, scheduled your way.
            </p>
            <Button
              size="lg"
              onClick={handleProClick}
              className="bg-white text-[#2d5a8f] hover:bg-white/90 text-lg px-10 py-6 rounded-full mt-8"
              data-testid="button-pro-start"
            >
              Get Started with Pro
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ 
            opacity: 1, 
            x: hoveredSide === 'right' ? 0 : hoveredSide === 'left' ? 20 : 0,
            scale: hoveredSide === 'right' ? 1.02 : hoveredSide === 'left' ? 0.98 : 1
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onMouseEnter={() => setHoveredSide('right')}
          onMouseLeave={() => setHoveredSide(null)}
          className="bg-gradient-to-br from-[#6fa8dc] to-[#8ec5e8] flex items-center justify-center p-12 relative cursor-pointer"
        >
          <div className="max-w-lg text-center text-foreground space-y-6 relative z-10">
            <motion.img 
              src={counselorLaptop} 
              alt="Counselor" 
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl mb-8"
              animate={{ scale: hoveredSide === 'right' ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              data-testid="img-counselor"
            />
            <h2 className="text-4xl font-bold" data-testid="text-free-title">
              Free All-India Emergency Mental Health Helpline
            </h2>
            <p className="text-xl text-foreground/80 font-light" data-testid="text-free-subtitle">
              Immediate help for anyone in need.
            </p>
            <Button
              size="lg"
              onClick={handleFreeClick}
              className="bg-[#2d5a8f] text-white hover:bg-[#2d5a8f]/90 text-lg px-10 py-6 rounded-full mt-8"
              data-testid="button-free-start"
            >
              Get Started with Free
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
