import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import Footer from '@/components/Footer';

export default function HelpCenter() {
  const [, setLocation] = useLocation();

  const faqs = [
    {
      question: "How to reset your password",
      answer: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email."
    },
    {
      question: "Understanding your EQ score",
      answer: "Your Emotional Quotient (EQ) score measures your emotional intelligence across 10 key factors. Higher scores indicate stronger emotional awareness and management abilities."
    },
    {
      question: "Managing privacy settings",
      answer: "Go to Settings > Privacy to control who can see your profile, journal entries, and assessment results."
    },
    {
      question: "Contacting your mentor or counselor",
      answer: "Visit the Therapists section and select your assigned mentor or counselor to schedule a session or send a message."
    }
  ];

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
          <h1 className="text-4xl md:text-5xl font-bold text-white">Help Center</h1>
          <p className="text-white/80 mt-4">Need assistance? We're here to help.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg text-muted-foreground mb-12">
            You can explore guides, FAQs, and emotional growth tips in our in-app Help Center.
            For technical issues or account help, reach us at{' '}
            <a href="mailto:support@kairo.app" className="text-primary hover:underline">
              support@kairo.app
            </a>
          </p>

          <h2 className="text-2xl font-bold mb-8">Common Topics</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 shadow-sm border"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-primary/5 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4">Still need help?</h3>
            <p className="text-muted-foreground mb-6">
              Our support team is ready to assist you with any questions or concerns.
            </p>
            <Button onClick={() => setLocation('/contact-support')}>
              Contact Support
            </Button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
