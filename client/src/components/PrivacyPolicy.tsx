import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white">Privacy Policy</h1>
          <p className="text-white/80 mt-4">Last updated: {new Date().toLocaleDateString()}</p>
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
            At Kairo, we respect your privacy and are committed to protecting your personal and emotional well-being data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our app, website, or services.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-muted-foreground mb-4">We collect the following:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Personal details (name, email, phone number) for account creation.</li>
            <li>Emotional insights from your journal entries, AI interactions, or EQ assessments — always anonymized and encrypted.</li>
            <li>Device and app usage data (e.g., session duration, feature usage) to improve user experience.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>To personalize your emotional growth journey and provide tailored recommendations.</li>
            <li>To improve app performance and features.</li>
            <li>To send updates, insights, or reminders related to your emotional progress.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Data Protection</h2>
          <p className="text-muted-foreground mb-6">
            We use industry-standard encryption, secure servers, and regular audits to ensure your information remains safe and private.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Your Rights</h2>
          <p className="text-muted-foreground mb-6">
            You can request to access, update, or delete your data anytime by contacting{' '}
            <a href="mailto:privacy@kairo.app" className="text-primary hover:underline">
              privacy@kairo.app
            </a>
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Changes to Policy</h2>
          <p className="text-muted-foreground mb-6">
            We may update this policy periodically. Updates will always be posted here with a revised "Last Updated" date.
          </p>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              If you have any questions about our Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@kairo.app" className="text-primary hover:underline">
                privacy@kairo.app
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
