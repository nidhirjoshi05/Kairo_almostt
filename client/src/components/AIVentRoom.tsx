import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIVentRoomProps {
  isPro?: boolean;
}

export default function AIVentRoom({ isPro = false }: AIVentRoomProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm here to listen. Feel free to share what's on your mind.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: "I hear you. That sounds challenging. Remember, it's okay to feel this way, and you're taking a positive step by sharing. Would you like to talk more about this?",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Card className="p-6 flex flex-col h-[600px]" data-testid="card-ai-chat">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-lg">
            <MessageCircle className="w-6 h-6 text-primary" data-testid="icon-message" />
          </div>
          <div>
            <h2 className="text-2xl font-bold" data-testid="text-chat-title">
              {isPro ? 'AI Consoling Agent' : 'AI Vent Room'}
            </h2>
            <p className="text-muted-foreground text-sm" data-testid="text-chat-subtitle">
              {isPro ? 'Unlimited conversations with your AI companion' : 'A safe space to express yourself'}
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 pr-4 mb-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              data-testid={`message-${message.id}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          data-testid="input-message"
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim()}
          size="icon"
          data-testid="button-send"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
