import { ExternalLink, Calendar, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
  index: number;
}

const NewsCard = ({
  title,
  description,
  source,
  publishedAt,
  url,
  imageUrl,
  index,
}: NewsCardProps) => {
  // Format the date for display
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = new Date(publishedAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card
      className="group card-gradient border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Optional image */}
      {imageUrl && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Hide broken images
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        </div>
      )}

      <CardHeader className="pb-3">
        {/* Source badge */}
        <div className="flex items-center justify-between mb-2">
          <Badge
            variant="outline"
            className="border-primary/50 text-primary bg-primary/10 font-mono text-xs"
          >
            <Newspaper className="w-3 h-3 mr-1" />
            {source}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
            <span className="text-primary/60">•</span>
            <span>{formattedTime}</span>
          </div>
        </div>

        {/* Title */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group/link"
        >
          <h3 className="font-mono text-lg font-semibold leading-tight text-foreground group-hover/link:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </a>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>

        {/* Read more link */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium text-sm transition-colors group/read"
        >
          <span>Read full article</span>
          <ExternalLink className="w-4 h-4 transition-transform group-hover/read:translate-x-1" />
        </a>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
