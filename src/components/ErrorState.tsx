import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <Card className="card-gradient border-destructive/30">
      <CardContent className="p-8 text-center">
        <div className="inline-flex p-3 rounded-xl bg-destructive/10 border border-destructive/30 mb-4">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <h3 className="font-mono text-xl font-bold text-foreground mb-2">
          Connection Error
        </h3>
        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
          {error || "Unable to fetch the latest security news. Please check your connection and try again."}
        </p>
        <Button
          onClick={onRetry}
          variant="outline"
          className="border-primary/50 text-primary hover:bg-primary/10"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
};

export default ErrorState;
