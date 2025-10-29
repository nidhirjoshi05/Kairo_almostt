import DualOptionPage from '../DualOptionPage';
import { PlanProvider } from '@/contexts/PlanContext';

export default function DualOptionPageExample() {
  return (
    <PlanProvider>
      <DualOptionPage />
    </PlanProvider>
  );
}
