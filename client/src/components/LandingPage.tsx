import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import kairoLogo from '@assets/Logo_Kairo_Final-removebg-preview_1761680007331.png';
import { Brain, Heart, Shield, Users, Sparkles, Target, Quote } from 'lucide-react';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const [, setLocation] = useLocation();

  const testimonials = [
    {
      quote: "Kairo didn't just help me manage my emotions — it helped me understand them.",
      text: "I used to think I was just \"bad at handling stress.\" Kairo's daily reflections and guided EQ exercises helped me notice my emotional patterns. Now, I don't run from tough days — I learn from them.",
      author: "Meera Sharma",
      role: "MBA Student, 22"
    },
    {
      quote: "The Vent Room feels like talking to a friend who really listens.",
      text: "When I feel anxious or overwhelmed, I open Kairo. The AI Consoling Agent responds with calm and compassion — never robotic, always kind. It's become my go-to emotional anchor.",
      author: "Rohit Patel",
      role: "NGO Volunteer, 28"
    },
    {
      quote: "Kairo made my team emotionally stronger — and surprisingly, more productive.",
      text: "As a manager, I've tried many wellness tools, but none built trust like Kairo. Our team uses the mood tracker and Healing Circles every week — conflicts dropped, collaboration rose.",
      author: "Arjun Mehta",
      role: "Project Manager, 35"
    },
    {
      quote: "It's like having emotional analytics for my students.",
      text: "I'm a school counselor, and Kairo helps me monitor emotional growth in ways I never could before. The dashboards and EQ tests give clarity that conversations alone can't.",
      author: "Kavita Rao",
      role: "School Counselor, 42"
    },
    {
      quote: "I never thought technology could feel this human.",
      text: "Kairo's AI isn't just smart — it's emotionally aware. The tone changes with my mood, and the insights feel personal, not generic. It's like therapy, reflection, and motivation rolled into one.",
      author: "Sana Ahmed",
      role: "Graduate Student Abroad, 25"
    },
    {
      quote: "Kairo taught me that growth doesn't mean perfection — it means awareness.",
      text: "It's not an app you just 'use'; it's a space that grows with you. My EQ journey feels real, measurable, and deeply personal.",
      author: "Anonymous",
      role: "Corporate Wellness Program Member, 29"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a3a52] via-[#2d5a8f] to-[#3d6a9f] min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <img 
              src={kairoLogo} 
              alt="Kairo" 
              className="w-40 h-40 mx-auto mb-8 drop-shadow-2xl"
              data-testid="img-kairo-logo"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            data-testid="text-hero-title"
          >
            Find Calm, Anytime, Anywhere
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light"
            data-testid="text-hero-subtitle"
          >
            Your personal companion for emotional wellness and mental health support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              onClick={() => setLocation('/services')}
              className="bg-gradient-to-r from-[#4a7cb8] to-[#5d8fc9] hover:from-[#3d6a9f] hover:to-[#4a7cb8] text-white text-lg px-12 py-6 rounded-full shadow-2xl font-semibold border-2 border-white/30 transition-all duration-300"
              data-testid="button-begin-journey"
            >
              Begin Your Journey
            </Button>
          </motion.div>
        </div>
      </div>

      {/* About Kairo Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30" id="about">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-about-title">
              About Kairo – Your Emotional Growth Companion
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Kairo comes from Kairos</strong> — the ancient Greek word for "the right moment."
              </p>
              <p>
                It's that pause between feeling and understanding, where growth truly happens.
              </p>
              <p>
                Kairo exists to help people find that pause — to reflect, heal, and transform.
              </p>
              <p className="text-xl font-medium text-foreground pt-4">
                In a world that moves too fast for emotions, Kairo offers a space to slow down.
              </p>
              <p>
                We combine <strong className="text-foreground">Artificial Intelligence</strong>, <strong className="text-foreground">Emotional Intelligence</strong>, and <strong className="text-foreground">Human Connection</strong> to help individuals understand their emotions, strengthen resilience, and build meaningful relationships.
              </p>
              <p>
                Our platform isn't just another therapy app — it's an <strong className="text-foreground">emotional ecosystem</strong>.
              </p>
              <p>
                From AI-driven reflection and mood tracking to real mentors and Healing Circles, Kairo empowers you to grow emotionally, one insight at a time.
              </p>
              <p className="text-xl font-semibold text-foreground pt-4">
                Because emotional well-being isn't a luxury — it's a lifelong skill.
              </p>
            </div>
          </motion.div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl p-8 shadow-lg"
              data-testid="section-vision"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To become the world's leading Emotional Intelligence Platform, empowering individuals, organizations, and communities to cultivate empathy, self-awareness, and mental resilience — creating a future where technology drives emotional well-being and personal transformation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl p-8 shadow-lg"
              data-testid="section-mission"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To enhance global emotional well-being by integrating artificial intelligence, emotional intelligence and human connection. Kairo aims to provide a personalized, data-driven, and compassionate platform that helps individuals build self-awareness, emotional resilience, and meaningful relationships through continuous emotional growth.
              </p>
            </motion.div>
          </div>

          {/* What Makes Kairo Different */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 mb-20"
          >
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">What Makes Kairo Different</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">✓</span>
                <p className="text-muted-foreground">A mood-adaptive interface that feels with you, not at you.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">✓</span>
                <p className="text-muted-foreground">A compassionate AI Consoling Agent that truly listens.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">✓</span>
                <p className="text-muted-foreground">Real mentors and peer communities that offer genuine support.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">✓</span>
                <p className="text-muted-foreground">Gamified EQ growth — measure your emotional progress like fitness goals.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">✓</span>
                <p className="text-muted-foreground">A safety net that blends AI, therapy, and crisis care.</p>
              </div>
            </div>
            <p className="text-center text-lg font-medium mt-8 text-foreground">
              Kairo isn't about fixing emotions. It's about understanding them — and finding growth in every feeling.
            </p>
          </motion.div>

          {/* Understanding Mental Health */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 md:p-12 mb-12"
            data-testid="section-understanding"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Understanding Mental Health</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Mental health encompasses our emotional, psychological, and social well-being. It affects how we think, feel, and act. Just like physical health, mental health exists on a spectrum and can change throughout our lives.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Good mental health isn't just the absence of mental illness—it's about feeling capable, resilient, and able to cope with life's challenges. It's okay to not be okay, and seeking support is a sign of strength, not weakness.
            </p>
          </motion.div>

          {/* Signs You Need Help */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary/5 rounded-2xl p-8 md:p-12"
            data-testid="section-signs"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Signs You May Need Help</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Persistent feelings of sadness, anxiety, or emptiness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Difficulty concentrating or making decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Changes in sleep patterns or appetite</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Loss of interest in activities you once enjoyed</span>
                </li>
              </ul>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Withdrawal from friends and family</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Extreme mood swings or irritability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Difficulty coping with daily stress</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Thoughts of self-harm or suicide</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                If you're experiencing any of these signs, you're not alone. Help is available.
              </p>
              <Button
                onClick={() => setLocation('/services')}
                size="lg"
                className="bg-primary hover:bg-primary/90"
                data-testid="button-get-help"
              >
                Get Help Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from people who found their emotional growth journey with Kairo
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Quote className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold text-lg mb-3 text-foreground leading-snug">
                  {testimonial.quote}
                </h4>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {testimonial.text}
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
