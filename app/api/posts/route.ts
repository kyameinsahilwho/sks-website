import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';
import { z } from 'zod';

const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean(),
  coverImage: z.string().optional(),
});

const PostUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  content: z.string().min(1, "Content is required").optional(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  coverImage: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validated = PostSchema.parse(data);
    const slug = generateSlug(validated.title);
    
    const post = await prisma.post.create({
      data: {
        ...validated,
        slug,
      },
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
    const { slug, ...updateData } = data;
    
    const validated = PostUpdateSchema.parse(updateData);
    const newSlug = validated.title ? generateSlug(validated.title) : slug;
    
    const post = await prisma.post.update({
      where: { slug },
      data: {
        ...validated,
        ...(validated.title && { slug: newSlug }),
      },
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
    const { slug } = await request.json();
    
    await prisma.post.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: `Failed to delete post: ${error}` }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      select: {
        slug: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
        metaDescription: true,
        coverImage: true,
        keywords: true,
        tags: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' }, 
      { status: 500 }
    );
  }
}