import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Check, X, ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

export default function ServicesComparison() {
  const [, setLocation] = useLocation();

  const freeFeatures = [
    'AI Consoling Agent (Vent Room)',
    'Daily Mood Tracking',
    'Journal Entries',
    'PANAS Assessment (Free)',
    'Join One Healing Circle per Month',
    'Access to Crisis Support Resources',
    'One Free Consultation Session',
    'Basic Emotional Wellness Tips'
  ];

  const proFeatures = [
    'Everything in Free Plan',
    'Unlimited Healing Circles',
    'Professional Therapist Matching',
    'Unlimited Therapy Sessions',
    'Full EQ Assessment with Detailed Results',
    'Advanced Mood Analytics & Graphs',
    'Writing Prompts for Journaling',
    'Priority Crisis Support',
    'Personal Dashboard with Insights',
    'Session Reminders & Notifications'
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a3a52] via-[#2d5a8f] to-[#3d6a9f] py-20">
        <div className="absolute top-8 left-8 z-20">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Choose Your Emotional Growth Path
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 max-w-3xl mx-auto mb-12"
          >
            Whether you're starting your journey or ready to dive deep, Kairo has a plan that fits your needs.
          </motion.p>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl p-8 shadow-lg border-2 border-muted"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Free Plan</h2>
                <p className="text-muted-foreground">Start your journey with essential tools</p>
                <div className="mt-6">
                  <span className="text-5xl font-bold">₹0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => setLocation('/select-plan')}
                className="w-full"
                size="lg"
                variant="outline"
              >
                Start with Free
              </Button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 shadow-xl border-2 border-primary relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                RECOMMENDED
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Pro Plan</h2>
                <p className="text-muted-foreground">Unlock your full emotional potential</p>
                <div className="mt-6">
                  <span className="text-5xl font-bold">₹499</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className={index === 0 ? 'font-semibold' : 'text-muted-foreground'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => setLocation('/select-plan')}
                className="w-full"
                size="lg"
              >
                Start with Pro
              </Button>
            </motion.div>
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">
              Not sure which plan is right for you? Both plans give you access to our supportive community.
            </p>
            <Button
              onClick={() => setLocation('/select-plan')}
              size="lg"
              variant="outline"
            >
              Continue to Plan Selection
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
