import { ArrowRight, Shield, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/farm-biosecurity-hero.jpg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-primary/5 to-background py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Protect Your Farm with 
                <span className="text-primary"> Smart Biosecurity</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Comprehensive digital platform empowering farmers to implement, monitor, 
                and sustain robust biosecurity practices for healthier livestock and increased productivity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </div>

            {/* Key Features */}
            <div className="grid sm:grid-cols-3 gap-4 pt-8">
              <div className="flex items-center space-x-3">
                <div className="bg-success/10 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Risk Assessment</p>
                  <p className="text-xs text-muted-foreground">Custom tools</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-info/10 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Training Modules</p>
                  <p className="text-xs text-muted-foreground">Interactive learning</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-warning/10 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Real-time Monitoring</p>
                  <p className="text-xs text-muted-foreground">24/7 alerts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <Card className="overflow-hidden">
              <img 
                src={heroImage} 
                alt="Modern farm with biosecurity technology"
                className="w-full h-auto rounded-lg"
              />
            </Card>
            
            {/* Floating Stats Card */}
            <Card className="absolute bottom-4 left-4 p-4 bg-card/95 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">99.2% Compliance Rate</p>
                  <p className="text-xs text-muted-foreground">Across 1,200+ farms</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;