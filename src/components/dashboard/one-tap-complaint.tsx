
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera, Mic, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function OneTapComplaint() {
  const [isRecording, setIsRecording] = useState(false);
  const [complaintText, setComplaintText] = useState("");
  const { toast } = useToast();

  const handleSubmitComplaint = () => {
    if (!complaintText.trim()) {
      toast({
        title: "Error",
        description: "Please enter your complaint details",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Complaint Submitted",
      description: "Your complaint has been auto-routed to the Public Works Department",
    });
    
    setComplaintText("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <span>One-Tap AI Complaint</span>
          <span className="ml-2 text-xs bg-gov-blue/10 text-gov-blue px-2 py-1 rounded">AI-Powered</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Describe your issue (e.g., 'There's a large pothole on MG Road')"
            value={complaintText}
            onChange={(e) => setComplaintText(e.target.value)}
            className="w-full"
          />
          
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Camera className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full relative",
                isRecording && "border-red-500"
              )}
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic className="h-4 w-4" />
              {isRecording && (
                <span className="absolute h-2 w-2 rounded-full bg-red-500 top-1 right-1"></span>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-muted-foreground">
          <span className="font-medium text-green-600">Location detected: </span>
          Sector 15, Gurugram
        </div>
        <Button onClick={handleSubmitComplaint}>
          <Send className="h-4 w-4 mr-2" />
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
