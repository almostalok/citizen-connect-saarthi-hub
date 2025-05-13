
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
import { AlertTriangle, BarChart3, CheckCircle, Clock, Phone, Users, Heart, FileText, Star, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSection, setActiveSection] = useState("dashboard");
  // Track if component is mounted to prevent state updates after unmounting
  const isMounted = useRef(true);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: `Tab changed to ${value}`,
      description: `You are now viewing the ${value} dashboard`,
    });
  };

  // Update active section based on URL hash
  useEffect(() => {
    // Set up the ref
    isMounted.current = true;
    
    const handleHashChange = () => {
      if (!isMounted.current) return;
      
      const hash = window.location.hash.replace('#', '');
      console.log("Hash changed to:", hash);
      
      if (hash) {
        setActiveSection(hash);
        // Reset to overview tab when changing sections
        if (hash === "dashboard") {
          setActiveTab("overview");
        }
      } else {
        // Default to dashboard if no hash
        setActiveSection("dashboard");
      }
    };

    // Set initial section from URL if present
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Cleanup
    return () => {
      isMounted.current = false;
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // If activeSection changes, log it to help with debugging
  useEffect(() => {
    console.log("Active section changed to:", activeSection);
  }, [activeSection]);

  // Render component based on active section
  const renderActiveComponent = () => {
    console.log("Rendering active component for section:", activeSection);
    
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <Tabs defaultValue={activeTab} value={activeTab} className="w-full" onValueChange={handleTabChange}>
              <TabsList className="w-full justify-start mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sos">Emergency SOS</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
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
          </>
        );
      case "complaints":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Complaint Management</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <OneTapComplaint />
              <ComplaintStatus />
            </div>
          </div>
        );
      case "requests":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Community Requests</h2>
            <CrowdRequests />
          </div>
        );
      case "crowdfunding":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Crowdfunding Campaigns</h2>
            <FundingCampaigns />
          </div>
        );
      case "emergency":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Emergency Services</h2>
            <EmergencySOS />
          </div>
        );
      case "schemes":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Government Schemes</h2>
            <GovernmentSchemes />
          </div>
        );
      case "budget":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Budget Transparency</h2>
            <BudgetTransparency />
          </div>
        );
      case "karma":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Karma Points</h2>
            <KarmaPoints />
          </div>
        );
      case "notices":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Notices & Alerts</h2>
            <NoticeBoard />
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Account Settings</h2>
            <div className="border rounded-lg p-6">
              <p className="text-muted-foreground">Manage your profile, preferences, and notification settings here.</p>
            </div>
          </div>
        );
      default:
        console.log("Section not found:", activeSection);
        return (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold">Section not found</h2>
            <p className="text-muted-foreground mt-2">The requested section does not exist.</p>
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to SAARTHI</h1>
          <p className="text-muted-foreground">
            Your unified government services and feedback platform
          </p>
        </div>
        
        {renderActiveComponent()}
      </div>
    </Layout>
  );
};

export default Index;
