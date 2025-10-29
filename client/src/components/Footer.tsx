import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLocation } from 'wouter';
import kairoLogo from '@assets/Logo_Kairo_Final-removebg-preview_1761680007331.png';

export default function Footer() {
  const [, setLocation] = useLocation();

  return (
    <footer className="bg-gradient-to-br from-[#1a3a52] to-[#2d5a8f] text-white mt-auto" data-testid="footer">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={kairoLogo} alt="Kairo" className="w-10 h-10" />
              <span className="font-bold text-xl">Kairo</span>
            </div>
            <p className="text-sm text-white/80 mb-4">
              Your emotional growth companion. Combining AI, emotional intelligence, and human connection.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:scale-110 transition p-2 rounded-full bg-white/10" data-testid="link-facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:scale-110 transition p-2 rounded-full bg-white/10" data-testid="link-twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:scale-110 transition p-2 rounded-full bg-white/10" data-testid="link-instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:scale-110 transition p-2 rounded-full bg-white/10" data-testid="link-linkedin">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setLocation('/')} className="text-white/80 hover:text-white transition" data-testid="link-about">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setLocation('/services')} className="text-white/80 hover:text-white transition" data-testid="link-get-started">
                  Get Started
                </button>
              </li>
              <li>
                <button onClick={() => setLocation('/assessments')} className="text-white/80 hover:text-white transition">
                  Assessments
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setLocation('/help-center')} className="text-white/80 hover:text-white transition" data-testid="link-help-center">
                  Help Center
                </button>
              </li>
              <li>
                <button onClick={() => setLocation('/contact-support')} className="text-white/80 hover:text-white transition" data-testid="link-contact">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => setLocation('/privacy-policy')} className="text-white/80 hover:text-white transition" data-testid="link-privacy">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setLocation('/terms-of-service')} className="text-white/80 hover:text-white transition" data-testid="link-terms">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setLocation('/feedback')} className="text-white/80 hover:text-white transition" data-testid="link-feedback">
                  Feedback
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5" />
                <div>
                  <div className="text-white/70 text-xs">General Inquiries</div>
                  <a href="mailto:hello@kairo.app" className="text-white/90 hover:text-white transition" data-testid="link-email">
                    hello@kairo.app
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5" />
                <div>
                  <div className="text-white/70 text-xs">Technical Support</div>
                  <a href="mailto:support@kairo.app" className="text-white/90 hover:text-white transition">
                    support@kairo.app
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5" />
                <div>
                  <div className="text-white/70 text-xs">Crisis Helpline</div>
                  <a href="tel:1800-599-0019" className="text-white/90 hover:text-white transition" data-testid="link-phone">
                    1800-599-0019
                  </a>
                </div>
              </li>
            </ul>
            <p className="text-xs text-white/70 mt-4">
              Response time: 24-48 hours, Monday to Saturday
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/80">
          <p data-testid="text-copyright">&copy; {new Date().getFullYear()} Kairo. All rights reserved. Your emotional well-being matters.</p>
        </div>
      </div>
    </footer>
  );
}
