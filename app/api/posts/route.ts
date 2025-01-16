import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

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
    const id = request.url.split('/').pop();
    const data = await request.json();
    const validated = PostSchema.parse(data);
    
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
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch posts: ${error}` }, { status: 500 });
  }
}