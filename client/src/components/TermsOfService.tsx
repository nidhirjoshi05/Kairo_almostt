import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

export default function TermsOfService() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white">Terms of Service</h1>
          <p className="text-white/80 mt-4">Effective date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Welcome to Kairo. By accessing or using our app, you agree to the following terms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Use of Service</h2>
          <p className="text-muted-foreground mb-6">
            Kairo is a platform for emotional growth, self-awareness, and well-being. It is not a substitute for medical or psychological treatment.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Eligibility</h2>
          <p className="text-muted-foreground mb-6">
            Users must be at least 13 years old. For minors, parental consent is required.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. User Conduct</h2>
          <p className="text-muted-foreground mb-6">
            Do not misuse or exploit Kairo's services. You agree not to upload harmful, offensive, or false content.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Subscriptions and Payments</h2>
          <p className="text-muted-foreground mb-6">
            Premium features are billed monthly or annually. All payments are secure and non-refundable once activated.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Limitation of Liability</h2>
          <p className="text-muted-foreground mb-6">
            Kairo provides guidance and support tools, not clinical diagnoses. We are not liable for any decisions made based on app content.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Termination</h2>
          <p className="text-muted-foreground mb-6">
            We may suspend or terminate accounts that violate these terms or compromise user safety.
          </p>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              If you have any questions about our Terms of Service, please contact us at{' '}
              <a href="mailto:hello@kairo.app" className="text-primary hover:underline">
                hello@kairo.app
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
