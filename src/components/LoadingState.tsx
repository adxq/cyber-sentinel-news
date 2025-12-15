import { Loader2, Shield } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 animate-glow-pulse">
          <Shield className="w-12 h-12 text-primary" />
        </div>
        <Loader2 className="absolute -bottom-2 -right-2 w-6 h-6 text-primary animate-spin" />
      </div>
      <p className="font-mono text-primary mt-6 text-lg">
        Fetching security intel...
      </p>
      <p className="text-muted-foreground text-sm mt-2">
        Connecting to news sources
      </p>
      <div className="flex gap-1 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingState;
