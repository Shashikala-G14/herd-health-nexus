import { Shield, Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="bg-primary p-2 rounded-lg">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AgriShield</h1>
            <p className="text-sm text-muted-foreground">Farm Biosecurity Platform</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#dashboard" className="text-foreground hover:text-primary transition-colors">
            Dashboard
          </a>
          <a href="#assessment" className="text-foreground hover:text-primary transition-colors">
            Risk Assessment
          </a>
          <a href="#training" className="text-foreground hover:text-primary transition-colors">
            Training
          </a>
          <a href="#compliance" className="text-foreground hover:text-primary transition-colors">
            Compliance
          </a>
          <a href="#alerts" className="text-foreground hover:text-primary transition-colors">
            Alerts
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs px-1">
              3
            </Badge>
          </Button>
          
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4" />
          </Button>

          <Button className="md:hidden" variant="ghost" size="sm">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;