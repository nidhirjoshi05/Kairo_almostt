import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type PlanType = 'free' | 'pro' | null;

interface PlanContextType {
  plan: PlanType;
  setPlan: (plan: PlanType) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlanState] = useState<PlanType>(() => {
    const saved = localStorage.getItem('kairo-plan');
    return (saved as PlanType) || null;
  });

  useEffect(() => {
    if (plan) {
      localStorage.setItem('kairo-plan', plan);
    } else {
      localStorage.removeItem('kairo-plan');
    }
  }, [plan]);

  const setPlan = (newPlan: PlanType) => {
    setPlanState(newPlan);
  };

  return (
    <PlanContext.Provider value={{ plan, setPlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}
