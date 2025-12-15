import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import EducationalSection from "@/components/EducationalSection";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

// Type definition for news articles
interface NewsArticle {
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
}

const Index = () => {
  // State management for the news dashboard
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  /**
   * Fetches cybersecurity news from our backend edge function.
   * The edge function handles the NewsAPI call securely with the API key.
   */
  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the edge function using Supabase's functions.invoke method
      // This is the recommended way to call edge functions
      const { data, error: fnError } = await supabase.functions.invoke(
        "fetch-security-news"
      );

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      // Update state with fetched articles
      setArticles(data?.articles || []);
      setLastUpdated(new Date());
    } catch (err: any) {
      console.error("Error fetching news:", err);
      setError(err.message || "Failed to fetch news");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div className="min-h-screen bg-background">
      {/* Scanline overlay effect */}
      <div className="fixed inset-0 scanline pointer-events-none z-50" />

      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header with refresh button */}
        <Header
          onRefresh={fetchNews}
          isLoading={isLoading}
          lastUpdated={lastUpdated}
        />

        {/* Educational section about cybersecurity awareness */}
        <EducationalSection />

        {/* News section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-mono text-xl font-bold text-foreground">
              <span className="text-primary">&gt;</span> Latest Intelligence
            </h2>
            {articles.length > 0 && (
              <span className="font-mono text-sm text-muted-foreground">
                {articles.length} articles found
              </span>
            )}
          </div>

          {/* Loading state */}
          {isLoading && <LoadingState />}

          {/* Error state */}
          {!isLoading && error && (
            <ErrorState error={error} onRetry={fetchNews} />
          )}

          {/* News grid */}
          {!isLoading && !error && articles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <NewsCard
                  key={`${article.url}-${index}`}
                  title={article.title}
                  description={article.description}
                  source={article.source}
                  publishedAt={article.publishedAt}
                  url={article.url}
                  imageUrl={article.imageUrl}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !error && articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-mono">
                No articles found. Try refreshing the page.
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border/50 text-center">
          <p className="text-muted-foreground text-sm font-mono">
            <span className="text-primary">Security News Dashboard</span> •
            Educational purposes only
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2">
            Data sourced from public news APIs. Always verify from official
            sources.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
