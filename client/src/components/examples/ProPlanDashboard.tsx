import ProPlanDashboard from '../ProPlanDashboard';
import { PlanProvider } from '@/contexts/PlanContext';

export default function ProPlanDashboardExample() {
  return (
    <PlanProvider>
      <ProPlanDashboard />
    </PlanProvider>
  );
}
