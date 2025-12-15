import { Shield, RefreshCw, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
  lastUpdated: Date | null;
}

const Header = ({ onRefresh, isLoading, lastUpdated }: HeaderProps) => {
  return (
    <header className="relative mb-10">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Logo and title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="p-3 rounded-xl bg-primary/20 border border-primary/30 animate-glow-pulse">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-primary tracking-wider">
                  CYBERSEC_DASHBOARD_v1.0
                </span>
              </div>
              <h1 className="font-mono text-3xl md:text-4xl font-bold">
                <span className="text-foreground">Security</span>{" "}
                <span className="cyber-gradient">News</span>
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Real-time cybersecurity intelligence feed
              </p>
            </div>
          </div>

          {/* Refresh button and status */}
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <div className="text-xs text-muted-foreground font-mono">
                <span className="text-primary/60">Last sync:</span>{" "}
                {lastUpdated.toLocaleTimeString()}
              </div>
            )}
            <Button
              onClick={onRefresh}
              disabled={isLoading}
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary font-mono"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              {isLoading ? "Syncing..." : "Refresh"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
