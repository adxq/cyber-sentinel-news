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

    // Fetch cybersecurity-related news
    // We search for keywords related to cybersecurity topics
    const query = 'cybersecurity OR hacking OR malware OR "data breach" OR ransomware';
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=20`;

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
