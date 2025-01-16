import { getBlogPost, getAllBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BlogHeader } from '@/components/sections/blog/blog-header';
import { BlogContent } from '@/components/sections/blog/blog-content';

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts();
    return posts?.filter(post => post.published).map((post) => ({
      id: post.id.toString(), // Ensure ID is converted to string
    })) || [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.id);
    if (!post || !post.published) return { title: 'Post Not Found' };
    
    return {
      title: `${post.title} | Sahil Kumar Singh`,
      description: post.content.substring(0, 160),
    };
  } catch (error) {
    return { title: 'Error' };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getBlogPost(params.id);
    
    if (!post || !post.published) {
      notFound();
    }

    return (
      <article className="container max-w-3xl py-12">
        <BlogHeader 
          title={post.title} 
          date={new Date(post.createdAt).toLocaleDateString()} 
        />
        <BlogContent content={post.content} />
      </article>
    );
  } catch (error) {
    notFound();
  }
}
