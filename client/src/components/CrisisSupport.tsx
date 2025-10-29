import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, MessageSquare, AlertCircle, MapPin, Building, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const helplines = [
  {
    name: "KIRAN Mental Health Helpline",
    number: "1800-599-0019",
    description: "24/7 toll-free helpline by Ministry of Social Justice"
  },
  {
    name: "Vandrevala Foundation",
    number: "1860-2662-345",
    description: "Free 24x7 helpline for mental health support"
  },
  {
    name: "iCall Helpline",
    number: "9152987821",
    description: "Professional counseling via phone and email"
  }
];

//todo: remove mock functionality
const facilities = {
  rehab: [
    { name: "Hope Rehabilitation Center", location: "Mumbai, Maharashtra", distance: "2.3 km", phone: "022-1234-5678" },
    { name: "Serenity Recovery Centre", location: "Andheri, Mumbai", distance: "5.1 km", phone: "022-8765-4321" },
  ],
  hospitals: [
    { name: "KEM Hospital - Psychiatry Dept", location: "Parel, Mumbai", distance: "3.7 km", phone: "022-2413-6051" },
    { name: "Fortis Hospital Mental Health", location: "Mulund, Mumbai", distance: "8.2 km", phone: "022-6754-3210" },
  ],
  ngos: [
    { name: "Connecting NGO", location: "Bandra, Mumbai", distance: "4.5 km", phone: "022-2642-7896" },
    { name: "Sangath Mental Health", location: "Colaba, Mumbai", distance: "6.8 km", phone: "022-2218-5858" },
  ]
};

interface CrisisSupportProps {
  isPro?: boolean;
}

export default function CrisisSupport({ isPro = false }: CrisisSupportProps) {
  const [location, setLocation] = useState('');

  return (
    <div className="space-y-6">
      <Card className="p-6 border-destructive/50" data-testid="card-crisis">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-destructive/10 p-3 rounded-lg">
            <AlertCircle className="w-6 h-6 text-destructive" data-testid="icon-alert" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2" data-testid="text-crisis-title">Crisis Support</h2>
            <p className="text-muted-foreground mb-4" data-testid="text-crisis-subtitle">
              If you're in immediate danger or experiencing a mental health crisis, please reach out for help immediately. You are not alone, and support is available 24/7.
            </p>
            <p className="text-sm text-muted-foreground" data-testid="text-crisis-description">
              This section provides immediate access to crisis helplines, emergency contacts, and nearby mental health facilities. Help is just a call away.
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {helplines.map((helpline, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-muted"
              data-testid={`helpline-${index}`}
            >
              <h3 className="font-semibold mb-1" data-testid={`text-helpline-name-${index}`}>{helpline.name}</h3>
              <p className="text-sm text-muted-foreground mb-3" data-testid={`text-helpline-desc-${index}`}>
                {helpline.description}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => window.open(`tel:${helpline.number}`)}
                  data-testid={`button-call-${index}`}
                >
                  <Phone className="w-4 h-4" />
                  Call {helpline.number}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {isPro && (
          <div className="mt-6 p-4 bg-primary/5 rounded-lg" data-testid="card-notify-therapist">
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Notify Your Therapist</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Your assigned therapist will be notified about your crisis situation and will reach out to you as soon as possible.
                </p>
                <Button size="sm" variant="outline" data-testid="button-notify-therapist">
                  Send Alert to Therapist
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-center font-semibold" data-testid="text-emergency-note">
            <strong>Emergency:</strong> If you're experiencing a medical emergency, please call 112 or visit your nearest hospital immediately.
          </p>
        </div>
      </Card>

      <Card className="p-6" data-testid="card-find-facilities">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 p-3 rounded-lg">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Find Nearby Facilities</h3>
            <p className="text-sm text-muted-foreground">Locate mental health support centers near you</p>
          </div>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Enter your location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            data-testid="input-location"
          />
        </div>

        <Tabs defaultValue="hospitals">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hospitals" data-testid="tab-hospitals">
              <Building className="w-4 h-4 mr-2" />
              Hospitals
            </TabsTrigger>
            <TabsTrigger value="rehab" data-testid="tab-rehab">
              <Heart className="w-4 h-4 mr-2" />
              Rehab Centers
            </TabsTrigger>
            <TabsTrigger value="ngos" data-testid="tab-ngos">
              <MapPin className="w-4 h-4 mr-2" />
              NGOs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hospitals" className="space-y-3 mt-4">
            {facilities.hospitals.map((facility, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg" data-testid={`hospital-${index}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{facility.name}</h4>
                  <span className="text-xs text-muted-foreground">{facility.distance}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{facility.location}</p>
                <Button size="sm" variant="outline" onClick={() => window.open(`tel:${facility.phone}`)}>
                  <Phone className="w-3 h-3 mr-2" />
                  {facility.phone}
                </Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="rehab" className="space-y-3 mt-4">
            {facilities.rehab.map((facility, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg" data-testid={`rehab-${index}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{facility.name}</h4>
                  <span className="text-xs text-muted-foreground">{facility.distance}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{facility.location}</p>
                <Button size="sm" variant="outline" onClick={() => window.open(`tel:${facility.phone}`)}>
                  <Phone className="w-3 h-3 mr-2" />
                  {facility.phone}
                </Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="ngos" className="space-y-3 mt-4">
            {facilities.ngos.map((facility, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg" data-testid={`ngo-${index}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{facility.name}</h4>
                  <span className="text-xs text-muted-foreground">{facility.distance}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{facility.location}</p>
                <Button size="sm" variant="outline" onClick={() => window.open(`tel:${facility.phone}`)}>
                  <Phone className="w-3 h-3 mr-2" />
                  {facility.phone}
                </Button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
