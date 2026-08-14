// Path: frontend/src/pages/BlogDetail.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsBySlug } from '../api/news';
import { NewsArticle } from '../types';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import { getNewsImage, getNewsVideo } from '../components/home/NewsSection';

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

  const videoSrc = getNewsVideo(article);

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      {videoSrc ? (
        <video
          src={videoSrc}
          controls
          playsInline
          preload="metadata"
          className="mb-6 h-64 sm:h-80 w-full rounded-xl bg-black object-contain"
        >
          Your browser does not support video playback.
        </video>
      ) : (
        <img
          src={getNewsImage(article)}
          alt={article.title}
          className="mb-6 h-64 w-full rounded-xl object-cover"
        />
      )}

      <h1 className="mb-2 text-3xl font-bold text-navy">{article.title}</h1>
      <p className="mb-6 text-sm text-navy/50">
        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''} {article.tag && `· ${article.tag}`}
      </p>
      <p className="whitespace-pre-line text-navy/80">{article.content}</p>
    </div>
  );
}