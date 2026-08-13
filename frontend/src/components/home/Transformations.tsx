import { useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import review1 from '../../assets/vedio/review1.mp4';
import review2 from '../../assets/vedio/review2.mp4';
import review3 from '../../assets/vedio/review3.mp4';

interface CustomerReview {
  id: string;
  src: string;
  title: string;
  quote: string;
  name: string;
  location: string;
}

const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'review-1',
    src: review1,
    title: 'Quality Paint at an Affordable Cost',
    quote:
      "Blitz Paints impressed me with its quality and affordable cost. I’m very satisfied with the result and believe it’s a great choice for painting your home.",
    name: 'Murali',
    location: 'Krishna Kripa Travels, Kailiyad',
  },
  {
    id: 'review-2',
    src: review2,
    title: 'High Quality with a Beautiful Finish',
    quote:
      "I chose Blitz Paints after considering different options and recommendations. This is the second time I’m using Blitz, and I’m very satisfied with its quality, adhesion, finish, and reasonable coverage.",
    name: 'Aravindakshan',
    location: 'Blitz Paints Customer',
  },
  {
    id: 'review-3',
    src: review3,
    title: "A Beautiful Home, A Choice We're Truly Satisfied With",
    quote:
      "We were confused about which brand to choose, but Blitz gave us a better result than we expected. The overall experience was excellent, and my entire family is very happy with how our home looks.",
    name: 'Aadhi',
    location: 'Shornur',
  },
];

export default function Transformations() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  function handlePlayClick(id: string) {
    const video = videoRefs.current[id];
    if (!video) return;
    video.play();
  }

  function scrollByCard(direction: 'left' | 'right') {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.firstElementChild as HTMLElement | null;
    const step = (card?.clientWidth ?? 320) + 24; // card width + gap
    container.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
        {/* Fixed heading, left */}
        <div className="flex flex-col justify-between">
          <h2 className="text-4xl font-bold leading-tight text-navy lg:text-[42px]">
            What our clients say about us!
          </h2>
        </div>

        {/* Scrollable review cards */}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CUSTOMER_REVIEWS.map((review) => {
            const isPlaying = playingId === review.id;

            return (
              <div
                key={review.id}
                className="w-[320px] shrink-0 snap-start overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-black">
                  <video
                    ref={(el) => {
                      videoRefs.current[review.id] = el;
                    }}
                    src={review.src}
                    controls={isPlaying}
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                    onPlay={() => setPlayingId(review.id)}
                    onPause={() => setPlayingId(null)}
                    onEnded={() => setPlayingId(null)}
                  />

                  {!isPlaying && (
                    <button
                      onClick={() => handlePlayClick(review.id)}
                      aria-label={`Play ${review.name}'s review`}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy shadow-lg transition hover:scale-105">
                        <FaPlay size={18} className="ml-1" />
                      </span>
                    </button>
                  )}
                </div>

                <div className="p-5">
                  <span className="mb-1 block font-serif text-5xl leading-none text-accent/25">"</span>
                  <p className="mb-6 text-sm leading-relaxed text-navy/70">{review.quote}</p>
                  <p className="text-sm font-semibold text-navy">
                    {review.name}
                    <span className="font-normal text-navy/50"> , {review.location}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nav arrows - bottom right corner, all screen sizes */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => scrollByCard('left')}
          aria-label="Previous review"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy transition hover:bg-navy hover:text-white"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={() => scrollByCard('right')}
          aria-label="Next review"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy transition hover:bg-navy hover:text-white"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}