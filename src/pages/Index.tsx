
import { Layout } from "@/components/layout/layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { OneTapComplaint } from "@/components/dashboard/one-tap-complaint";
import { ComplaintStatus } from "@/components/dashboard/complaint-status";
import { CrowdRequests } from "@/components/dashboard/crowd-requests";
import { FundingCampaigns } from "@/components/dashboard/funding-campaigns";
import { EmergencySOS } from "@/components/dashboard/emergency-sos";
import { GovernmentSchemes } from "@/components/dashboard/government-schemes";
import { BudgetTransparency } from "@/components/dashboard/budget-transparency";
import { KarmaPoints } from "@/components/dashboard/karma-points";
import { NoticeBoard } from "@/components/dashboard/notice-board";
import { AlertTriangle, BarChart3, CheckCircle, Clock, Phone, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: `Tab changed to ${value}`,
      description: `You are now viewing the ${value} dashboard`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6" id="dashboard">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to SAARTHI</h1>
          <p className="text-muted-foreground">
            Your unified government services and feedback platform
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sos">Emergency SOS</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Active Complaints"
                value="28"
                icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
                description="5 new since last login"
              />
              <StatsCard
                title="Resolved Issues"
                value="143"
                icon={<CheckCircle className="h-4 w-4 text-green-500" />}
                description="92% resolution rate"
              />
              <StatsCard
                title="Pending Requests"
                value="17"
                icon={<Clock className="h-4 w-4 text-yellow-500" />}
                description="Avg. resolution: 5 days"
              />
              <StatsCard
                title="Community Support"
                value="2,584"
                icon={<Users className="h-4 w-4 text-blue-500" />}
                description="Active citizens"
              />
            </div>
          </TabsContent>
          <TabsContent value="sos" className="animate-fade-in">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Emergency Response"
                value="5 min"
                icon={<Phone className="h-4 w-4 text-red-500" />}
                description="Average response time"
              />
              <StatsCard
                title="Emergency Calls"
                value="53"
                icon={<AlertTriangle className="h-4 w-4 text-yellow-500" />}
                description="In the last 24 hours"
              />
              <StatsCard
                title="Emergency Services"
                value="3"
                icon={<CheckCircle className="h-4 w-4 text-green-500" />}
                description="Police, Ambulance, Fire"
              />
              <StatsCard
                title="SOS Activations"
                value="124"
                icon={<Users className="h-4 w-4 text-blue-500" />}
                description="This month"
              />
            </div>
            <div className="mt-6">
              <EmergencySOS />
            </div>
          </TabsContent>
        </Tabs>

        <div id="complaints" className="grid gap-6 md:grid-cols-2">
          <OneTapComplaint />
          <ComplaintStatus />
        </div>

        <div id="requests" className="grid gap-6 md:grid-cols-2">
          <CrowdRequests />
          <div className="grid gap-6">
            <EmergencySOS />
          </div>
        </div>

        <div id="crowdfunding" className="pt-4">
          <FundingCampaigns />
        </div>

        <div id="emergency" className="pt-4">
          <EmergencySOS />
        </div>

        <div id="schemes" className="grid gap-6 md:grid-cols-2">
          <GovernmentSchemes />
          <NoticeBoard />
        </div>

        <div id="budget" className="grid gap-6 md:grid-cols-2">
          <BudgetTransparency />
          <KarmaPoints />
        </div>
        
        <div id="karma" className="pt-4">
          <KarmaPoints />
        </div>
        
        <div id="notices" className="pt-4">
          <NoticeBoard />
        </div>
        
        <div id="settings" className="pt-4">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <p className="text-muted-foreground">Manage your profile, preferences, and notification settings here.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
