import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import ChallengesPricing from "./pages/ChallengesPricing";
import RulesPage from "./pages/Rules";
import PayoutsPage from "./pages/PayoutsPage";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardLayout from "./components/DashboardLayout";
import DashboardOverview from "./pages/dashboard/Overview";
import MyAccounts from "./pages/dashboard/MyAccounts";
import Objectives from "./pages/dashboard/Objectives";
import Trades from "./pages/dashboard/Trades";
import Analytics from "./pages/dashboard/Analytics";
import DashboardPayouts from "./pages/dashboard/DashboardPayouts";
import Certificates from "./pages/dashboard/Certificates";
import Learning from "./pages/dashboard/Learning";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import Support from "./pages/dashboard/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/challenges" element={<ChallengesPricing />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/payouts" element={<PayoutsPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="accounts" element={<MyAccounts />} />
            <Route path="objectives" element={<Objectives />} />
            <Route path="trades" element={<Trades />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="payouts" element={<DashboardPayouts />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="learning" element={<Learning />} />
            <Route path="settings" element={<DashboardSettings />} />
            <Route path="support" element={<Support />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
