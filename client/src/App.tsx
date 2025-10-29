import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PlanProvider } from "@/contexts/PlanContext";
import LandingPage from "@/components/LandingPage";
import ServicesComparison from "@/components/ServicesComparison";
import AuthPage from "@/components/AuthPage";
import DualOptionPage from "@/components/DualOptionPage";
import FreePlanDashboard from "@/components/FreePlanDashboard";
import ProPlanDashboard from "@/components/ProPlanDashboard";
import Assessments from "@/components/Assessments";
import TherapistMatchingQuestionnaire from "@/components/TherapistMatchingQuestionnaire";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import TermsOfService from "@/components/TermsOfService";
import HelpCenter from "@/components/HelpCenter";
import ContactSupport from "@/components/ContactSupport";
import Feedback from "@/components/Feedback";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/services" component={ServicesComparison} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/select-plan" component={DualOptionPage} />
      <Route path="/free" component={FreePlanDashboard} />
      <Route path="/pro" component={ProPlanDashboard} />
      <Route path="/assessments" component={Assessments} />
      <Route path="/therapist-matching" component={TherapistMatchingQuestionnaire} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/help-center" component={HelpCenter} />
      <Route path="/contact-support" component={ContactSupport} />
      <Route path="/feedback" component={Feedback} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PlanProvider>
          <Toaster />
          <Router />
        </PlanProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
