import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClientLayout } from "@/components/ClientLayout";
import NotFound from "@/pages/not-found";
import TransactionHistory from "@/pages/transaction-history";

function Router() {
  return (
    <Switch>
      <Route path="/" component={TransactionHistory} />
      <Route path="/transaction-history" component={TransactionHistory} />
      <Route path="/bank-management" component={() => <div>Bank Management Page</div>} />
      <Route path="/coin-exchange" component={() => <div>Coin Exchange Page</div>} />
      <Route path="/team-management" component={() => <div>Team Management Page</div>} />
      <Route path="/settings" component={() => <div>Settings Page</div>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ClientLayout>
          <Toaster />
          <Router />
        </ClientLayout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
