import { Shield, AlertTriangle, BookOpen, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EducationalSection = () => {
  const insights = [
    {
      icon: Shield,
      title: "Stay Protected",
      description:
        "Understanding current threats helps you recognize and avoid potential attacks.",
    },
    {
      icon: AlertTriangle,
      title: "Early Warning",
      description:
        "News about vulnerabilities allows you to patch systems before exploitation.",
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description:
        "Cybersecurity evolves daily. Regular updates keep your knowledge current.",
    },
    {
      icon: Globe,
      title: "Global Awareness",
      description:
        "Threats cross borders. International news provides complete threat landscape.",
    },
  ];

  return (
    <section className="mb-12">
      <Card className="card-gradient border-primary/30 glow-border overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/20">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-mono text-xl font-bold text-foreground">
                Why Stay Updated?
              </h2>
              <p className="text-muted-foreground text-sm">
                The importance of cybersecurity awareness
              </p>
            </div>
          </div>

          <p className="text-secondary-foreground leading-relaxed mb-6">
            In today's digital landscape, staying informed about cybersecurity
            news is essential for everyone—from students to professionals.
            Cyber threats evolve rapidly, and new vulnerabilities are discovered
            daily. By following reputable security news sources, you can:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <insight.icon className="w-5 h-5 text-primary mb-2" />
                <h3 className="font-mono font-semibold text-foreground text-sm mb-1">
                  {insight.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-mono font-semibold">
                Educational Note:
              </span>{" "}
              This dashboard aggregates news from public APIs for educational
              purposes only. Always verify information from multiple sources
              before taking action.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default EducationalSection;
