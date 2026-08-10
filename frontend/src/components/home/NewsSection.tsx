import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNews } from '../../api/news';
import { NewsArticle } from '../../types';
import Loader from '../ui/Loader';
import ErrorMessage from '../ui/ErrorMessage';
import GarnetGlossyInteriorEmulsion from '../../assets/images/news/garnet-launch.png';
import dealerNews from '../../assets/images/news/dealer-network.jpg';
import Expo from '../../assets/images/news/builders-expo.jpg';

const NEWS_IMAGES: Record<string, string> = {
  'garnet-launch': GarnetGlossyInteriorEmulsion,
  'dealer-network': dealerNews,
  'builders-expo': Expo,
};

export function getNewsImage(article: NewsArticle): string {
  const filename = article.featuredImage
    ?.split('/')
    .pop()
    ?.replace(/\.[^/.]+$/, '');
  return (filename && NEWS_IMAGES[filename]) || dealerNews;
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getNews()
      .then(setNews)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-navy">Latest News & Updates</h2>
        <Link to="/blogs" className="font-semibold text-accent hover:underline">
          View All News →
        </Link>
      </div>

      {loading && <Loader label="Loading news..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-3">
          {news.slice(0, 3).map((article) => (
            <div key={article.id} className="flex items-center gap-4 p-4 overflow-hidden rounded-xl border border-navy/10">
              <img
                src={getNewsImage(article)}
                alt={article.title}
                className="h-16 w-16 flex-shrink-0 rounded-lg object-cover" // Small thumbnail size
              />
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-3 text-xs text-navy/50">
                  <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''}</span>
                  {article.tag && <span className="font-semibold text-accent">{article.tag}</span>}
                </div>
                <h3 className="mb-2 font-bold text-navy text-sm">{article.title}</h3>
                <Link to={`/blogs/${article.slug}`} className="text-xs font-semibold text-accent hover:underline">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}