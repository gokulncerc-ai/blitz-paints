// Path: backend/prisma/newsSeed.ts
// Run with: pnpm run seed:news
// Adds/updates the 3 media-coverage news items (Manorama News, Big TV,
// S TV Channel) for the "Blitz Performance Coatings" launch. Upserted on
// slug, so re-running this is always safe.
//
// videoUrl stores the filename the frontend maps to its bundled video
// asset (see NEWS_VIDEOS in frontend/src/components/home/NewsSection.tsx) -
// the actual .mp4 files live in the frontend repo, not on this server, so
// this is a lookup key, not a real hosted URL.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface NewsSeed {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string | null;
    videoUrl: string | null;
    tag: string;
    isPublished: boolean;
    publishedAt: Date;
}

const news: NewsSeed[] = [
    {
        title: 'Blitz Performance Coatings Launches - Featured on Manorama News',
        slug: 'blitz-performance-coatings-manorama-news',
        excerpt:
            'Blitz Performance Coatings, our latest innovation, launched at the Kulappully, Shoranur manufacturing facility - covered live by Manorama News.',
        content:
            'We are proud to share the launch of "Blitz Performance Coatings", the latest innovation from Blitz Paints Pvt. Ltd. Launched at our manufacturing facility in Kulappully, Shoranur, Blitz Performance Coatings represents a new benchmark in durability, protection, and performance.\n\n' +
            'A proud moment for the entire Blitz family as we continue to paint a future driven by performance and trust. Watch the Manorama News coverage and join us in celebrating this milestone.',
        featuredImage: null,
        videoUrl: '/videos/manorama_news.mp4',
        tag: 'Media Coverage',
        isPublished: true,
        publishedAt: new Date('2026-08-01'),
    },
    {
        title: 'In the Spotlight on BIG TV',
        slug: 'blitz-performance-coatings-bigtv-news',
        excerpt:
            'Big TV features the launch of "Blitz Performance Coatings", another milestone in our journey of delivering innovative, high-performance coating solutions.',
        content:
            'A proud moment for Blitz Paints Pvt. Ltd. as the launch of "Blitz Performance Coatings" was featured on Big TV.\n\n' +
            'This feature marks another significant step in our journey of delivering innovative coating solutions that set new standards in performance and durability. As we expand our footprint in the industry, such recognitions inspire us to continue pushing boundaries and creating products that customers can trust.\n\n' +
            'Thank you to Big TV for highlighting our story and to our valued customers and partners for being part of our success.',
        featuredImage: null,
        videoUrl: '/videos/bigtv_news.mp4',
        tag: 'Media Coverage',
        isPublished: true,
        publishedAt: new Date('2026-08-03'),
    },
    {
        title: 'Blitz Performance Coatings Showcased on S TV Channel',
        slug: 'blitz-performance-coatings-stv-news',
        excerpt:
            'S TV Channel highlights the launch of Blitz Performance Coatings, spotlighting our commitment to innovation, quality, and high-performance coatings.',
        content:
            'The launch of Blitz Performance Coatings by Blitz Paints Pvt. Ltd. has been showcased on S TV Channel, highlighting our commitment to innovation, quality, and high-performance coating solutions.\n\n' +
            'A heartfelt thank you to S TV Channel and everyone who continues to support our journey towards excellence.',
        featuredImage: null,
        videoUrl: '/videos/stvchannel.mp4',
        tag: 'Media Coverage',
        isPublished: true,
        publishedAt: new Date('2026-08-05'),
    },
];

async function main() {
    for (const n of news) {
        await prisma.news.upsert({
            where: { slug: n.slug },
            update: {
                title: n.title,
                excerpt: n.excerpt,
                content: n.content,
                featuredImage: n.featuredImage,
                videoUrl: n.videoUrl,
                tag: n.tag,
                isPublished: n.isPublished,
                publishedAt: n.publishedAt,
            },
            create: {
                title: n.title,
                slug: n.slug,
                excerpt: n.excerpt,
                content: n.content,
                featuredImage: n.featuredImage,
                videoUrl: n.videoUrl,
                tag: n.tag,
                isPublished: n.isPublished,
                publishedAt: n.publishedAt,
            },
        });
        console.log(`Upserted news: ${n.title}`);
    }

    console.log('News seed complete');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });