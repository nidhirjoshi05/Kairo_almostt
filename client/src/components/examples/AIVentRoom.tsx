import AIVentRoom from '../AIVentRoom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AIVentRoomExample() {
  return (
    <div className="p-6 max-w-4xl">
      <Tabs defaultValue="free">
        <TabsList className="mb-4">
          <TabsTrigger value="free">Free Plan</TabsTrigger>
          <TabsTrigger value="pro">Pro Plan</TabsTrigger>
        </TabsList>
        <TabsContent value="free">
          <AIVentRoom isPro={false} messageLimit={5} />
        </TabsContent>
        <TabsContent value="pro">
          <AIVentRoom isPro={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
