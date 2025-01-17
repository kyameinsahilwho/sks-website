import path from 'path';
import prisma from './prisma';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  metaDescription?: string | null;
  keywords?: string | null;
  coverImage?: string | null;

}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return posts;
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    throw error;
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
      },
    });
    
    if (!post) {
      return null;
    }

    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}