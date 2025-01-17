import { notFound } from 'next/navigation';
import { getAllBlogPosts, getBlogPost } from '@/lib/blog';
import { BlogContent } from '@/components/sections/blog/blog-content';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts();
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
    const post = await getBlogPost(params.slug);
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
        publishedTime: post.createdAt.toISOString(),
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
    const post = await getBlogPost(params.slug);
    
    if (!post || !post.published) {
      notFound();
    }

    return (
      <article className="container py-8">
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <div className="mb-8 text-gray-600">
          {post.createdAt.toLocaleDateString()}
        </div>
        <BlogContent content={post.content} />
      </article>
    );
  } catch (error) {
    console.error('Error in BlogPostPage:', error);
    notFound();
  }
}
