
import { Heart, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface Campaign {
  id: string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  backers: number;
  image: string;
  daysLeft: number;
}

export function FundingCampaigns() {
  const campaigns: Campaign[] = [
    {
      id: "F-2023-0078",
      title: "Support War Veterans",
      description: "Help veterans with medical expenses and rehabilitation",
      raised: 125000,
      goal: 200000,
      backers: 328,
      image: "https://placekitten.com/300/200", // Placeholder
      daysLeft: 15,
    },
    {
      id: "F-2023-0085",
      title: "Rural School Technology",
      description: "Provide computers to underprivileged schools",
      raised: 85000,
      goal: 150000,
      backers: 213,
      image: "https://placekitten.com/301/200", // Placeholder
      daysLeft: 22,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Crowdfunding Campaigns</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {campaigns.map((campaign) => {
            const percentage = Math.round((campaign.raised / campaign.goal) * 100);
            
            return (
              <div
                key={campaign.id}
                className="border rounded-lg overflow-hidden card-hover"
              >
                <div
                  className="h-36 bg-cover bg-center"
                  style={{ backgroundImage: `url(${campaign.image})` }}
                ></div>
                <div className="p-3">
                  <h3 className="font-medium">{campaign.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {campaign.description}
                  </p>
                  
                  <div className="mt-3">
                    <div className="mb-1 text-xs flex justify-between">
                      <span>₹{campaign.raised.toLocaleString()}</span>
                      <span>{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <div className="text-xs">
                      <span className="font-medium">{campaign.backers} backers</span>
                      <span className="mx-2">•</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                    <Button size="sm" className="h-8">
                      <Heart className="h-3 w-3 mr-1" />
                      Donate
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
