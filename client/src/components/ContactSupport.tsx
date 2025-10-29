import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { ArrowLeft, Mail, Clock, MessageSquare } from 'lucide-react';
import Footer from '@/components/Footer';

export default function ContactSupport() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white">Contact Support</h1>
          <p className="text-white/80 mt-4">We'd love to hear from you.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card rounded-lg p-8 shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-xl">General Queries</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                For general questions and information
              </p>
              <a 
                href="mailto:hello@kairo.app"
                className="text-primary hover:underline font-medium"
              >
                hello@kairo.app
              </a>
            </div>

            <div className="bg-card rounded-lg p-8 shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-xl">Technical Help</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                For technical issues and account assistance
              </p>
              <a 
                href="mailto:support@kairo.app"
                className="text-primary hover:underline font-medium"
              >
                support@kairo.app
              </a>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-8 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-xl">Response Time</h3>
            </div>
            <p className="text-muted-foreground">
              Within 24–48 hours, Monday to Saturday
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              You can also reach us through the in-app "Contact Support" option for faster help.
            </p>
          </div>

          <div className="bg-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need Immediate Crisis Support?</h3>
            <p className="text-muted-foreground mb-6">
              If you're experiencing a mental health emergency, please contact our crisis helpline immediately.
            </p>
            <a href="tel:1800-599-0019" className="text-2xl font-bold text-primary">
              1800-599-0019
            </a>
            <p className="text-sm text-muted-foreground mt-4">Available 24/7</p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
