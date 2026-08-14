// Path: frontend/src/types/news.types.ts
// Mirrors backend/src/models/news.model.ts

export interface NewsArticle {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featuredImage: string | null;
    videoUrl: string | null;
    tag: string | null;
    isPublished: boolean;
    publishedAt: string | null;
    createdAt: string;
}