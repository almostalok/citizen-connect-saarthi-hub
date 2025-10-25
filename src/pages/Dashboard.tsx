import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { AlertTriangle, CheckCircle, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/");
      } else {
        setUser(session.user);
        fetchUserRole(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/");
      } else {
        setUser(session.user);
        fetchUserRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      setUserRole(data?.role || null);
    } catch (error: any) {
      console.error("Error fetching user role:", error);
      toast({
        title: "Error",
        description: "Could not fetch user role",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="h-8 w-64 bg-muted rounded animate-pulse" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Welcome, {user?.user_metadata?.full_name || "User"}
          </h1>
          <p className="text-muted-foreground">
            {userRole === "authority" 
              ? "Manage and resolve civic issues in your jurisdiction"
              : "Report and track civic issues in your community"
            }
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Active Issues"
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
            title="Pending Issues"
            value="17"
            icon={<Clock className="h-4 w-4 text-yellow-500" />}
            description="Avg. resolution: 5 days"
          />
          <StatsCard
            title="Community Members"
            value="2,584"
            icon={<Users className="h-4 w-4 text-blue-500" />}
            description="Active citizens"
          />
        </div>
      </div>
    </Layout>
  );
}
