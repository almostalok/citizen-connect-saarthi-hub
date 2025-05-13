import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera, Mic, Send, MapPin, FileText, AlertCircle, Clock, User, Building2, MapPin as MapPinIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

// Google Maps type definitions
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
        Circle: new (options: any) => any;
        Animation: {
          DROP: any;
        };
      };
    };
    initMap: () => void;
  }
}

// Knowledge Park, Greater Noida coordinates
const KNOWLEDGE_PARK_COORDS = {
  lat: 28.4744,
  lng: 77.5040
};

interface ComplaintStatus {
  id: string;
  title: string;
  type: string;
  location: string;
  assignedTo: string;
  department: string;
  startTime: Date;
  status: 'pending' | 'in-progress' | 'resolved';
}

export function OneTapComplaint() {
  const [isRecording, setIsRecording] = useState(false);
  const [complaintText, setComplaintText] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [showBriefComplaint, setShowBriefComplaint] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState<ComplaintStatus | null>(null);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
  const [briefComplaint, setBriefComplaint] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    contactNumber: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (showMap) {
      // Initialize map when dialog opens
      const initMap = () => {
        const map = new window.google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: KNOWLEDGE_PARK_COORDS,
          zoom: 15,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        // Add marker
        new window.google.maps.Marker({
          position: KNOWLEDGE_PARK_COORDS,
          map: map,
          title: "Knowledge Park, Greater Noida",
          animation: window.google.maps.Animation.DROP,
        });

        // Add circle to show area
        new window.google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map,
          center: KNOWLEDGE_PARK_COORDS,
          radius: 500, // 500 meters radius
        });
      };

      // Wait for Google Maps to load
      if (window.google && window.google.maps) {
        initMap();
      } else {
        window.initMap = initMap;
      }
    }
  }, [showMap]);

  useEffect(() => {
    if (currentComplaint) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentComplaint]);

  const formatTimeLeft = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const showComplaintStatus = (complaintData: Partial<ComplaintStatus>) => {
    const newComplaint: ComplaintStatus = {
      id: Math.random().toString(36).substr(2, 9),
      title: complaintData.title || "Quick Complaint",
      type: complaintData.type || "General",
      location: "Knowledge Park, Greater Noida",
      assignedTo: "Rajesh Kumar",
      department: "Public Works Department",
      startTime: new Date(),
      status: 'pending',
      ...complaintData
    };
    setCurrentComplaint(newComplaint);
    setShowStatusDialog(true);
  };

  const handleSubmitComplaint = () => {
    if (!complaintText.trim()) {
      toast({
        title: "Error",
        description: "Please enter your complaint details",
        variant: "destructive",
      });
      return;
    }
    
    showComplaintStatus({
      title: complaintText,
      type: "Quick Complaint"
    });
    
    setComplaintText("");
  };

  const handleSubmitBriefComplaint = () => {
    if (!briefComplaint.title || !briefComplaint.description || !briefComplaint.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    showComplaintStatus({
      title: briefComplaint.title,
      type: briefComplaint.category,
    });

    setBriefComplaint({
      title: "",
      description: "",
      category: "",
      priority: "",
      contactNumber: "",
    });
    setShowBriefComplaint(false);
  };

  return (
    <div className="space-y-4">
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
          <Dialog>
            <DialogTrigger asChild>
              <div className="text-xs text-muted-foreground cursor-pointer hover:text-primary transition-colors">
                <span className="font-medium text-green-600">Location detected: </span>
                <span className="flex items-center">
                  Knowledge Park, Greater Noida
                  <MapPin className="h-3 w-3 ml-1" />
                </span>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Live Location - Knowledge Park, Greater Noida</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <div id="map" className="w-full h-[400px] rounded-lg" />
                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Location Details:</p>
                  <ul className="space-y-1">
                    <li>• Knowledge Park, Greater Noida, Uttar Pradesh</li>
                    <li>• Coordinates: 28.4744° N, 77.5040° E</li>
                    <li>• Area: Approximately 500m radius</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={handleSubmitComplaint}>
            <Send className="h-4 w-4 mr-2" />
            Submit
          </Button>
        </CardFooter>
      </Card>

      {/* Brief Complaint Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              <span>Detailed Complaint</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBriefComplaint(true)}
            >
              File New Complaint
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Brief Complaint Dialog */}
      <Dialog open={showBriefComplaint} onOpenChange={setShowBriefComplaint}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>File a Detailed Complaint</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Complaint Title *</Label>
              <Input
                id="title"
                placeholder="Enter a brief title for your complaint"
                value={briefComplaint.title}
                onChange={(e) => setBriefComplaint({ ...briefComplaint, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={briefComplaint.category}
                onValueChange={(value) => setBriefComplaint({ ...briefComplaint, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="sanitation">Sanitation</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={briefComplaint.priority}
                onValueChange={(value) => setBriefComplaint({ ...briefComplaint, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about your complaint"
                value={briefComplaint.description}
                onChange={(e) => setBriefComplaint({ ...briefComplaint, description: e.target.value })}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                type="tel"
                placeholder="Enter your contact number"
                value={briefComplaint.contactNumber}
                onChange={(e) => setBriefComplaint({ ...briefComplaint, contactNumber: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span>Fields marked with * are required</span>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowBriefComplaint(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmitBriefComplaint}>
                Submit Complaint
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Complaint Status Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Complaint Status</DialogTitle>
          </DialogHeader>
          {currentComplaint && (
            <div className="space-y-6 mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{currentComplaint.title}</h3>
                    <p className="text-sm text-muted-foreground">Complaint ID: {currentComplaint.id}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{formatTimeLeft(timeLeft)}</span>
                  </div>
                </div>

                <Progress value={(24 * 60 * 60 - timeLeft) / (24 * 60 * 60) * 100} className="h-2" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Type</span>
                    </div>
                    <p className="text-sm">{currentComplaint.type}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Location</span>
                    </div>
                    <p className="text-sm">{currentComplaint.location}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Assigned To</span>
                    </div>
                    <p className="text-sm">{currentComplaint.assignedTo}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Department</span>
                    </div>
                    <p className="text-sm">{currentComplaint.department}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <span className={cn(
                      "text-sm px-2 py-1 rounded-full",
                      currentComplaint.status === 'pending' && "bg-yellow-100 text-yellow-800",
                      currentComplaint.status === 'in-progress' && "bg-blue-100 text-blue-800",
                      currentComplaint.status === 'resolved' && "bg-green-100 text-green-800"
                    )}>
                      {currentComplaint.status.charAt(0).toUpperCase() + currentComplaint.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
