import { BlogCard } from "@/components/sections/blog/blog-card";
import { getAllBlogPosts } from "@/lib/blog";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600"] });

export default async function BlogsPage() {
  try {
    const blogPosts = await getAllBlogPosts();
    console.log('Fetched blog posts with IDs:', blogPosts.map(p => p.slug)); // Debug log

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
                  date={post.createdAt.toLocaleDateString()}
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
    throw error; // This will trigger the error boundary
  }
}