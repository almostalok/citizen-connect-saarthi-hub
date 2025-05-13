
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
import { AlertTriangle, BarChart3, CheckCircle, Clock, Users } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to SAARTHI</h1>
          <p className="text-muted-foreground">
            Your unified government services and feedback platform
          </p>
        </div>

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

        <div id="schemes" className="grid gap-6 md:grid-cols-2">
          <GovernmentSchemes />
          <NoticeBoard />
        </div>

        <div id="budget" className="grid gap-6 md:grid-cols-2">
          <BudgetTransparency />
          <KarmaPoints />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
