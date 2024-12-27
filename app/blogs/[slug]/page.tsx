import { getBlogPost, getAllBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BlogHeader } from '@/components/sections/blog/blog-header';
import { BlogContent } from '@/components/sections/blog/blog-content';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.slug);
    if (!post) return { title: 'Post Not Found' };
    
    return {
      title: `${post.title} | Sahil Kumar Singh`,
      description: post.description,
    };
  } catch (error) {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getBlogPost(params.slug);
    
    if (!post) {
      notFound();
    }

    return (
      <article className="container max-w-3xl py-12">
        <BlogHeader title={post.title} date={post.date} />
        <BlogContent content={post.content} />
      </article>
    );
  } catch (error) {
    notFound();
  }
}