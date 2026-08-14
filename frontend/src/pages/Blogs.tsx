// Path: frontend/src/pages/Blogs.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNews } from '../api/news';
import { NewsArticle } from '../types';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import { getNewsImage } from '../components/home/NewsSection';

export default function Blogs() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getNews()
      .then(setNews)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading articles..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="mb-8 text-3xl font-bold text-navy">News & Blogs</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {news.map((article) => (
          <Link key={article.id} to={`/blogs/${article.slug}`} className="overflow-hidden rounded-xl border border-navy/10 hover:shadow-lg">
            <img src={getNewsImage(article)} alt={article.title} className="h-40 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-bold text-navy">{article.title}</h3>
              <p className="mt-1 text-sm text-navy/60">{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}