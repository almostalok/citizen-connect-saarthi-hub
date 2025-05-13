
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  BarChart3,
  FileText,
  Heart,
  Home,
  MapPin,
  Phone,
  Settings,
  Star,
  ThumbsUp,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  notifications?: number;
};

export function SidebarNav() {
  const [activeItem, setActiveItem] = useState("");
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(isMobile);
  const { toast } = useToast();

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  // Set initial active item based on URL hash
  useEffect(() => {
    const updateActiveItemFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveItem(hash || "dashboard"); // Default to dashboard if no hash
    };
    
    // Initial setup
    updateActiveItemFromHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', updateActiveItemFromHash);
    
    return () => {
      window.removeEventListener('hashchange', updateActiveItemFromHash);
    };
  }, []);

  const items: NavItem[] = [
    {
      title: "Dashboard",
      href: "#dashboard",
      icon: Home,
    },
    {
      title: "Complaints",
      href: "#complaints",
      icon: AlertCircle,
      notifications: 5,
    },
    {
      title: "Requests",
      href: "#requests",
      icon: ThumbsUp,
    },
    {
      title: "Crowdfunding",
      href: "#crowdfunding",
      icon: Heart,
    },
    {
      title: "Emergency",
      href: "#emergency",
      icon: Phone,
    },
    {
      title: "Schemes",
      href: "#schemes",
      icon: FileText,
    },
    {
      title: "Budget",
      href: "#budget",
      icon: BarChart3,
    },
    {
      title: "Karma Points",
      href: "#karma",
      icon: Star,
    },
    {
      title: "Notices",
      href: "#notices",
      icon: Bell,
      notifications: 3,
    },
  ];

  const handleNavClick = (item: string, href: string) => {
    const section = href.replace("#", "");
    setActiveItem(section);
    
    // Update the URL hash
    window.location.hash = section;
    
    toast({
      title: `Navigated to ${item}`,
      description: `You are now viewing the ${item} section`,
    });
  };

  return (
    <div
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && (
          <span className="text-lg font-bold text-gov-blue">SAARTHI</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <MapPin className="h-4 w-4" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="flex-1 py-4 overflow-auto">
        <nav className="space-y-1 px-2">
          {items.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                activeItem === item.href.replace('#', '')
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
              onClick={() => handleNavClick(item.title, item.href)}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {item.notifications && (
                  <span className="notification-badge">{item.notifications}</span>
                )}
              </div>
              {!collapsed && <span className="ml-3">{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-sidebar-border">
        <Link
          to="#settings"
          className={cn(
            "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
            activeItem === "settings"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          )}
          onClick={() => handleNavClick("Settings", "#settings")}
        >
          <Settings className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Settings</span>}
        </Link>
      </div>
    </div>
  );
}
