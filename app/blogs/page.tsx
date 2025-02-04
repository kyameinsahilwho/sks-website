import { BlogCard } from "@/components/sections/blog/blog-card";
import { Playfair_Display } from "next/font/google";
import { BlogPost } from "@/lib/blog";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600"] });

export default async function BlogsPage() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
    const blogPosts: BlogPost[] = await response.json();
    
    if (!blogPosts || blogPosts.length === 0) {
      return (
        <div className={`container py-12 ${playfair.className} antialiased`}>
          <h1 className="mb-8 text-4xl font-bold">Blogs</h1>
          <p>No blog posts found.</p>
        </div>
      );
    }

    return (
      <div className={`container py-12 ${playfair.className} antialiased`}>
        <h1 className="mb-8 text-4xl font-bold">Blogs</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts
            .filter(post => post.published)
            .map((post) => {
              const description = post.metaDescription || post.content
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                .replace(/[#*`_~]/g, '')
                .substring(0, 150) + '...';

              return (
                <BlogCard 
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  description={description}
                  date={new Date(post.createdAt).toLocaleDateString()}
                  tags={post.tags}
                  coverImage={post.coverImage}
                />
              );
            })}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in BlogsPage:', error);
    return (
      <div className={`container py-12 ${playfair.className} antialiased`}>
        <h1 className="mb-8 text-4xl font-bold">Blogs</h1>
        <p>Failed to load blog posts.</p>
      </div>
    );
  }
}