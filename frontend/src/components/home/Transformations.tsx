// Path: frontend/src/components/home/Transformations.tsx
// Fetches before/after project photos from the backend.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../api/projects';
import { ProjectItem } from '../../types';
import Loader from '../ui/Loader';
import ErrorMessage from '../ui/ErrorMessage';
import review1 from '../../assets/vedio/review1.mp4';
import review2 from '../../assets/vedio/review2.mp4';
import review3 from '../../assets/vedio/review3.mp4';

export default function Transformations() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const CUSTOMER_REVIEWS = [
    { id: 'review-1', src: review1, title: 'Customer Review' },
    { id: 'review-2', src: review2, title: 'Customer Review' },
    { id: 'review-3', src: review3, title: 'Customer Review' },
  ];

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* CUSTOMER REVIEWS - VIDEO TESTIMONIALS */}
      <section className="mt-20">
        <h2 className="mb-8 font-inter text-3xl font-bold text-[#2E1B66]">
          Customer Reviews
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="overflow-hidden rounded-[16px] border border-gray-100 bg-white shadow-sm"
            >
              <video
                src={review.src}
                controls
                playsInline
                preload="metadata"
                className="h-64 w-full bg-black object-contain"
              />

              <div className="p-4">
                <p className="font-inter text-[15px] font-semibold text-[#2E1B66]">
                  {review.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}