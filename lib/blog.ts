import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import prisma from './prisma';
import { isValidObjectId } from './utils';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
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

    return posts.map(post => ({
      ...post,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  if (!isValidObjectId(id)) {
    return null;
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    
    if (!post) return null;

    return {
      ...post,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}