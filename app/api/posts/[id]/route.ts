import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isValidObjectId } from '@/lib/utils';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!isValidObjectId(params.id)) {
      return NextResponse.json(
        { error: 'Invalid post ID format' }, 
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
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
