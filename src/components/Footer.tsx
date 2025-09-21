import { Shield, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-secondary/20 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-lg">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">AgriShield</h3>
                <p className="text-sm text-muted-foreground">Farm Biosecurity Platform</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering farmers with comprehensive digital solutions for robust 
              biosecurity management and livestock protection.
            </p>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Platform</h4>
            <div className="space-y-2">
              <a href="#dashboard" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="#assessment" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Risk Assessment
              </a>
              <a href="#training" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Training Modules
              </a>
              <a href="#compliance" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Compliance Tracking
              </a>
              <a href="#alerts" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Alert System
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Resources</h4>
            <div className="space-y-2">
              <a href="#guides" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Best Practice Guides
              </a>
              <a href="#regulations" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Regulatory Framework
              </a>
              <a href="#support" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Support Center
              </a>
              <a href="#community" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Community Forum
              </a>
              <a href="#api" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                API Documentation
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">support@agrishield.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Global Agriculture Center</span>
              </div>
            </div>
            
            <div className="pt-4">
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 AgriShield. All rights reserved. Supporting global livestock biosecurity.
          </p>
          
          <div className="flex space-x-6">
            <a href="#privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#accessibility" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;