import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { ArrowLeft, Heart } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Feedback() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-[#1a3a52] to-[#2d5a8f] py-16">
        <div className="container mx-auto px-6">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="text-white hover:bg-white/10 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Feedback</h1>
          <p className="text-white/80 mt-4">Your voice helps Kairo evolve.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-card rounded-2xl p-12 shadow-lg">
            <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Share Your Thoughts</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Share your thoughts, suggestions, or stories at{' '}
              <a href="mailto:feedback@kairo.app" className="text-primary hover:underline font-medium">
                feedback@kairo.app
              </a>
              {' '}or via the in-app feedback form.
            </p>
            <p className="text-muted-foreground mb-8">
              Every message is read by our team — because your emotional growth journey helps shape ours too.
            </p>

            <div className="space-y-4 max-w-md mx-auto">
              <a href="mailto:feedback@kairo.app">
                <Button size="lg" className="w-full">
                  Send Feedback via Email
                </Button>
              </a>
              <p className="text-sm text-muted-foreground">
                Or provide feedback directly through the app for faster response
              </p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-bold mb-2">Feature Requests</h3>
              <p className="text-sm text-muted-foreground">
                Tell us about features you'd like to see in Kairo
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-bold mb-2">Bug Reports</h3>
              <p className="text-sm text-muted-foreground">
                Help us improve by reporting any issues you encounter
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-bold mb-2">Success Stories</h3>
              <p className="text-sm text-muted-foreground">
                Share how Kairo has helped you on your journey
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
