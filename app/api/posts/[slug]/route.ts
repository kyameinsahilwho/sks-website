import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
      select: {
        slug: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
        metaDescription: true,
        keywords: true,
        tags: true,
        coverImage: true,
      }
    });
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' }, 
      { status: 500 }
    );
  }
}
