import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const newsApiKey = Deno.env.get('NEWSAPI_KEY');
    
    if (!newsApiKey) {
      console.error('NEWSAPI_KEY is not configured');
      throw new Error('News API key is not configured');
    }

    console.log('Fetching cybersecurity news from NewsAPI...');

    // Fetch cybersecurity-related news from reputable sources
    // Keywords related to cybersecurity topics + source-specific terms
    const query = '(cybersecurity OR hacking OR malware OR "data breach" OR ransomware OR vulnerability OR exploit OR phishing) AND (security OR cyber OR threat)';
    
    // Target domains for quality cybersecurity news
    const domains = 'bleepingcomputer.com,darkreading.com,thehackernews.com,packetstormsecurity.com,wired.com,arstechnica.com,securityweek.com,krebsonsecurity.com';
    
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&domains=${domains}&language=en&sortBy=publishedAt&pageSize=30`;

    const response = await fetch(url, {
      headers: {
        'X-Api-Key': newsApiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('NewsAPI error:', errorText);
      throw new Error(`NewsAPI returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(`Fetched ${data.articles?.length || 0} articles successfully`);

    // Transform and filter the articles
    const articles = (data.articles || []).map((article: any) => ({
      title: article.title,
      description: article.description,
      source: article.source?.name || 'Unknown Source',
      publishedAt: article.publishedAt,
      url: article.url,
      imageUrl: article.urlToImage,
    })).filter((article: any) => 
      // Filter out articles with missing essential data
      article.title && article.description && article.url
    );

    return new Response(JSON.stringify({ articles }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error fetching news:', errorMessage);
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        articles: [] 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
