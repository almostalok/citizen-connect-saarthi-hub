
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Complaint {
  id: string;
  title: string;
  department: string;
  date: string;
  status: "pending" | "in-progress" | "resolved";
  progress: number;
}

export function ComplaintStatus() {
  const complaints: Complaint[] = [
    {
      id: "C-2023-0512",
      title: "Pothole on MG Road",
      department: "Public Works",
      date: "2 days ago",
      status: "in-progress",
      progress: 60,
    },
    {
      id: "C-2023-0498",
      title: "Street light not working",
      department: "Electrical",
      date: "5 days ago",
      status: "resolved",
      progress: 100,
    },
    {
      id: "C-2023-0523",
      title: "Garbage not collected",
      department: "Sanitation",
      date: "1 day ago",
      status: "pending",
      progress: 20,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "in-progress":
        return "status-progress";
      case "resolved":
        return "status-resolved";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recent Complaints</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="p-3 border rounded-lg hover:bg-accent/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{complaint.title}</div>
                  <div className="text-xs text-muted-foreground flex items-center mt-1">
                    <span>{complaint.department}</span>
                    <span className="mx-2">•</span>
                    <span>{complaint.date}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span
                    className={`${getStatusClass(complaint.status)} mr-2`}
                  >
                    {complaint.status.replace("-", " ")}
                  </span>
                  {getStatusIcon(complaint.status)}
                </div>
              </div>
              <div className="mt-2">
                <Progress value={complaint.progress} className="h-1" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
