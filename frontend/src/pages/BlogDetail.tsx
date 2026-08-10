// Path: frontend/src/pages/BlogDetail.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsBySlug } from '../api/news';
import { NewsArticle } from '../types';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import GarnetGlossyInteriorEmulsion from '../assets/images/news/garnet-launch.png';
import dealerNews from '../assets/images/news/dealer-network.jpg';
import Expo from '../assets/images/news/builders-expo.jpg';

// Same filename-based mapping as components/home/NewsSection.tsx - matches
// against the DB's `featuredImage` filename (e.g. "builders-expo"), not the
// slug, so this stays correct even if slugs change independently of images.
const NEWS_IMAGES: Record<string, string> = {
  'garnet-launch': GarnetGlossyInteriorEmulsion,
  'dealer-network': dealerNews,
  'builders-expo': Expo,
};

function getNewsImage(article: NewsArticle): string {
  const filename = article.featuredImage
    ?.split('/')
    .pop()
    ?.replace(/\.[^/.]+$/, '');
  return (filename && NEWS_IMAGES[filename]) || dealerNews;
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    getNewsBySlug(slug)
      .then(setArticle)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader label="Loading article..." />;
  if (error || !article) return <ErrorMessage message={error || 'Article not found'} />;

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <img src={getNewsImage(article)} alt={article.title} className="mb-6 h-64 w-full rounded-xl object-cover" />
      <h1 className="mb-2 text-3xl font-bold text-navy">{article.title}</h1>
      <p className="mb-6 text-sm text-navy/50">
        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''} {article.tag && `· ${article.tag}`}
      </p>
      <p className="whitespace-pre-line text-navy/80">{article.content}</p>
    </div>
  );
}