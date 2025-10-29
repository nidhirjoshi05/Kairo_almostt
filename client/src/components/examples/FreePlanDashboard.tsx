import FreePlanDashboard from '../FreePlanDashboard';
import { PlanProvider } from '@/contexts/PlanContext';

export default function FreePlanDashboardExample() {
  return (
    <PlanProvider>
      <FreePlanDashboard />
    </PlanProvider>
  );
}
