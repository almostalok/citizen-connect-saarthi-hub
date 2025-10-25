import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Urban Issue Reporter
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Empowering citizens to report civic problems and track their resolution
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/auth/citizen">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <Users className="h-5 w-5" />
                I'm a Citizen
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/auth/authority">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                <CheckCircle className="h-5 w-5" />
                I'm an Authority
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <MapPin className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Geo-Tagged Reporting</CardTitle>
              <CardDescription>
                Report issues with precise location data and visual evidence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Add photos and descriptions</li>
                <li>• Pinpoint exact location</li>
                <li>• Track issue status</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <AlertTriangle className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Community Voting</CardTitle>
              <CardDescription>
                Prioritize issues through community engagement and voting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Vote on severity</li>
                <li>• See priority rankings</li>
                <li>• Community feedback</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <CheckCircle className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Transparency & Accountability</CardTitle>
              <CardDescription>
                Track resolution progress and ensure municipal accountability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Real-time status updates</li>
                <li>• Resolution tracking</li>
                <li>• Performance metrics</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary">2,584</div>
            <div className="text-sm text-muted-foreground mt-2">Active Citizens</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary">143</div>
            <div className="text-sm text-muted-foreground mt-2">Issues Resolved</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary">92%</div>
            <div className="text-sm text-muted-foreground mt-2">Resolution Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary">5 days</div>
            <div className="text-sm text-muted-foreground mt-2">Avg. Response Time</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t">
        <p className="text-center text-sm text-muted-foreground">
          © 2025 Urban Issue Reporter. Building better communities together.
        </p>
      </footer>
    </div>
  );
}
