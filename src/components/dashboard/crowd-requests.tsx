
import { ThumbsUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface CrowdRequest {
  id: string;
  title: string;
  description: string;
  supporters: number;
  goal: number;
  category: string;
}

export function CrowdRequests() {
  const requests: CrowdRequest[] = [
    {
      id: "R-2023-0045",
      title: "New Park in Sector 10",
      description: "Request for development of a community park with play area",
      supporters: 358,
      goal: 500,
      category: "Parks & Recreation",
    },
    {
      id: "R-2023-0062",
      title: "Traffic Signal at City Junction",
      description: "Install traffic lights at the busy intersection",
      supporters: 782,
      goal: 1000,
      category: "Traffic Management",
    },
    {
      id: "R-2023-0078",
      title: "Public Library Renovation",
      description: "Modernize the central library facilities",
      supporters: 215,
      goal: 300,
      category: "Education",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Community Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => {
            const percentage = Math.round((request.supporters / request.goal) * 100);
            
            return (
              <div
                key={request.id}
                className="p-3 border rounded-lg hover:bg-accent/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{request.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {request.category}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">
                      {request.supporters}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="mb-1 text-xs flex justify-between">
                    <span>{request.supporters} supporters</span>
                    <span>{request.goal - request.supporters} needed</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
                <div className="mt-3 flex justify-end">
                  <Button variant="outline" size="sm" className="h-8">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Support
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
