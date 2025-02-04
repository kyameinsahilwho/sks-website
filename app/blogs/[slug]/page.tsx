import { notFound } from 'next/navigation';
import { BlogContent } from '@/components/sections/blog/blog-content';
import type { Metadata } from 'next';
import { Playfair_Display } from "next/font/google";
import { BlogPost } from "@/lib/blog";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600"] });

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
    const posts: BlogPost[] = await response.json();
    return posts?.filter(post => post.published).map((post) => ({
      slug: post.slug,
    })) || [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params.slug}`);
    const post: BlogPost = await response.json();
    if (!post) return { title: 'Post Not Found' };
    
    const description = post.metaDescription || post.content;
    
    return {
      title: post.title,
      description,
      keywords: post.keywords, // assuming post.tags is string[]
      authors: [{ name: 'Sahil Kumar Singh' }],
      publisher: 'Sahil Kumar Singh',
      openGraph: {
        title: post.title,
        description,
        type: 'article',
        publishedTime: new Date(post.createdAt).toISOString(),
        url: `/blogs/${post.slug}`,
        images: [
          {
            url: post.coverImage || '/default-blog-image.jpg',
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        tags: post.tags || [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description,
        images: [post.coverImage || '/default-blog-image.jpg'],
      },
      alternates: {
        canonical: `/blogs/${post.slug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return { title: 'Error' };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params.slug}`);
    const post: BlogPost = await response.json();
    
    if (!post || !post.published) {
      notFound();
    }

    return (
      <article className={`container py-8 ${playfair.className} antialiased`}>
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <div className="mb-8 text-gray-600 text-xl">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <BlogContent content={post.content} />
      </article>
    );
  } catch (error) {
    console.error('Error in BlogPostPage:', error);
    notFound();
  }
}
