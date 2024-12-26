import { getBlogPost, blogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BlogHeader } from '@/components/sections/blog/blog-header';
import { BlogContent } from '@/components/sections/blog/blog-content';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} | Sahil Kumar Singh`,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-3xl py-12">
      <BlogHeader title={post.title} date={post.date} />
      <BlogContent content={post.content} />
    </article>
  );
}