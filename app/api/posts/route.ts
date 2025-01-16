import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { isValidObjectId } from '@/lib/utils';

const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  published: z.boolean(),
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validated = PostSchema.parse(data);
    
    const post = await prisma.post.create({
      data: validated,
    });

    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: `Failed to create post: ${error}` }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid post ID format' }, 
        { status: 400 }
      );
    }

    const validated = PostSchema.parse(updateData);
    
    const post = await prisma.post.update({
      where: { id },
      data: validated,
    });

    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: `Failed to update post: ${error}` }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid post ID format' }, 
        { status: 400 }
      );
    }

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: `Failed to delete post: ${error}` }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    console.log('API: Fetched posts:', posts); // Debug log
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' }, 
      { status: 500 }
    );
  }
}