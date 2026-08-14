import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNews } from '../../api/news';
import { NewsArticle } from '../../types';
import Loader from '../ui/Loader';
import ErrorMessage from '../ui/ErrorMessage';
import GarnetGlossyInteriorEmulsion from '../../assets/images/news/garnet-launch.png';
import dealerNews from '../../assets/images/news/dealer-network.jpg';
import Expo from '../../assets/images/news/builders-expo.jpg';
import press1 from '../../assets/vedio/manorama_news.mp4';
import press2 from '../../assets/vedio/bigtv_news.mp4';
import press3 from '../../assets/vedio/stvchannel.mp4';

// Static image thumbnails, keyed by the filename found in `featuredImage`.
const NEWS_IMAGES: Record<string, string> = {
  'garnet-launch': GarnetGlossyInteriorEmulsion,
  'dealer-network': dealerNews,
  'builders-expo': Expo,
};

// Press-coverage video clips, keyed by the filename found in `videoUrl`.
const NEWS_VIDEOS: Record<string, string> = {
  'manorama-news': press1,
  'big-tv-news': press2,
  'stv-channel-news': press3,
};

export function getNewsImage(article: NewsArticle): string {
  const filename = article.featuredImage
    ?.split('/')
    .pop()
    ?.replace(/\.[^/.]+$/, '');
  return (filename && NEWS_IMAGES[filename]) || dealerNews;
}

/** Returns the bundled video source for an article's videoUrl, or null if it has none / isn't recognised. */
export function getNewsVideo(article: NewsArticle): string | null {
  const filename = article.videoUrl
    ?.split('/')
    .pop()
    ?.replace(/\.[^/.]+$/, '');
  return (filename && NEWS_VIDEOS[filename]) || null;
}

/**
 * Renders the correct preview for a news article - a <video> for
 * press-coverage clips, an <img> for everything else. Shared between
 * NewsSection (homepage) and Blogs (listing page) so both always show a
 * real preview instead of duplicating the image/video logic per page.
 *
 * For videos: preload="metadata" alone leaves most browsers showing a
 * blank/black box, since only header info (duration, dimensions) gets
 * fetched - no actual frame is decoded until playback starts. Nudging
 * `currentTime` slightly once metadata loads forces the browser to decode
 * and paint a real frame, giving a proper thumbnail with no extra poster
 * image asset needed.
 */
export function NewsThumbnail({ article, className }: { article: NewsArticle; className?: string }) {
  const videoSrc = getNewsVideo(article);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoSrc) return;
    const video = videoRef.current;
    if (!video) return;

    const paintFirstFrame = () => {
      try {
        video.currentTime = 0.1;
      } catch {
        // Some browsers throw if the video isn't ready yet - safe to ignore,
        // the thumbnail just falls back to whatever frame loads naturally.
      }
    };

    video.addEventListener('loadedmetadata', paintFirstFrame);
    return () => video.removeEventListener('loadedmetadata', paintFirstFrame);
  }, [videoSrc]);

  if (videoSrc) {
    return (
      <video
        ref={videoRef}
        src={videoSrc}
        aria-label={article.title}
        muted
        playsInline
        preload="metadata"
        className={className}
      />
    );
  }

  return <img src={getNewsImage(article)} alt={article.title} className={className} />;
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
              <NewsThumbnail
                article={article}
                className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
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