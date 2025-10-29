import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation } from 'wouter';
import { usePlan } from '@/contexts/PlanContext';
import kairoLogo from '@assets/Logo_Kairo_Final-removebg-preview_1761680007331.png';
import { ArrowLeft } from 'lucide-react';

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { plan } = usePlan();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', loginData);
    const destination = plan === 'pro' ? '/pro' : plan === 'free' ? '/free' : '/select-plan';
    setLocation(destination);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup:', signupData);
    const destination = plan === 'pro' ? '/pro' : plan === 'free' ? '/free' : '/select-plan';
    setLocation(destination);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#2d5a8f] via-[#4a7cb8] to-[#5d8fc9] flex items-start justify-center p-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        <Button
          variant="ghost"
          onClick={() => setLocation('/select-plan')}
          className="absolute -left-2 top-0 text-white hover:bg-white/10 mb-4"
          data-testid="button-back"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <div className="text-center mb-8 mt-12">
          <img 
            src={kairoLogo} 
            alt="Kairo" 
            className="w-24 h-24 mx-auto mb-4"
            data-testid="img-logo"
          />
          <h1 className="text-3xl font-bold text-white mb-2" data-testid="text-auth-title">Welcome to Kairo</h1>
          <p className="text-white/80" data-testid="text-auth-subtitle">Your journey to wellness begins here</p>
        </div>

        <Card className="p-6">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" data-testid="tab-login">Login</TabsTrigger>
              <TabsTrigger value="signup" data-testid="tab-signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    data-testid="input-login-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    data-testid="input-login-password"
                  />
                </div>
                <Button type="submit" className="w-full" data-testid="button-login">
                  Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Your full name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    required
                    data-testid="input-signup-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                    data-testid="input-signup-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                    data-testid="input-signup-password"
                  />
                </div>
                <Button type="submit" className="w-full" data-testid="button-signup">
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
}
