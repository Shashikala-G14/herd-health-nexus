import { Shield, Users, BarChart3, Bell, Globe, Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Risk Assessment Tools",
      description: "Customizable assessment tools based on local epidemiological conditions and farm-specific risk factors.",
      color: "text-primary bg-primary/10"
    },
    {
      icon: Users,
      title: "Interactive Training",
      description: "Comprehensive training modules tailored for pig and poultry production systems with certification tracking.",
      color: "text-info bg-info/10"
    },
    {
      icon: BarChart3,
      title: "Compliance Tracking",
      description: "Monitor progress toward regulatory compliance and disease-free compartment recognition.",
      color: "text-success bg-success/10"
    },
    {
      icon: Bell,
      title: "Real-time Alerts",
      description: "Instant notifications for disease outbreaks, biosecurity breaches, and compliance deadlines.",
      color: "text-warning bg-warning/10"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Platform available in multiple languages to ensure accessibility across diverse farming communities.",
      color: "text-accent-blue bg-accent-blue/10"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Optimized for mobile devices to ensure access in remote and rural areas with limited connectivity.",
      color: "text-secondary-dark bg-secondary/10"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Comprehensive Biosecurity Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform provides end-to-end solutions for farm-level biosecurity management, 
            empowering farmers with the tools they need to protect their livestock and livelihood.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Additional Benefits Section */}
        <div className="mt-16 bg-primary/5 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Expected Outcomes
            </h3>
            <p className="text-muted-foreground">
              Transforming farm biosecurity management for better health, productivity, and sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-success" />
              </div>
              <h4 className="font-semibold text-foreground">Enhanced Awareness</h4>
              <p className="text-sm text-muted-foreground">
                Improved farmer education and awareness on biosecurity best practices
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="bg-info/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="h-8 w-8 text-info" />
              </div>
              <h4 className="font-semibold text-foreground">Better Risk Management</h4>
              <p className="text-sm text-muted-foreground">
                Improved risk management and self-assessment capabilities at farm level
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="bg-warning/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-warning" />
              </div>
              <h4 className="font-semibold text-foreground">Stakeholder Collaboration</h4>
              <p className="text-sm text-muted-foreground">
                Stronger collaboration across the livestock ecosystem
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;