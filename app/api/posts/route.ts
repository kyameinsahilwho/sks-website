import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { title, content, published } = await request.json();
    
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
    try {
      const id = request.url.split('/').pop();
      const { title, content, published } = await request.json();
      
      const post = await prisma.post.update({
        where: { id },
        data: { title, content, published },
      });
  
      return NextResponse.json(post);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
  }
  
  export async function DELETE(request: Request) {
    try {
      const id = request.url.split('/').pop();
      
      await prisma.post.delete({
        where: { id },
      });
  
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
  }

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}