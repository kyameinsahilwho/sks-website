import { BlogCard } from "@/components/sections/blog/blog-card";
import { getAllBlogPosts } from "@/lib/blog";

export default async function BlogsPage() {
  try {
    const blogPosts = await getAllBlogPosts();
    console.log('Fetched blog posts with IDs:', blogPosts.map(p => p.id)); // Debug log

    if (!blogPosts || blogPosts.length === 0) {
      return (
        <div className="container py-12">
          <h1 className="mb-8 text-4xl font-bold">Blog</h1>
          <p>No blog posts found.</p>
        </div>
      );
    }

    return (
      <div className="container py-12">
        <h1 className="mb-8 text-4xl font-bold">Blog</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts
            .filter(post => post.published)
            .map((post) => {
              const plainDescription = post.content
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                .replace(/[#*`_~]/g, '')
                .substring(0, 150) + '...';

              return (
                <BlogCard 
                  key={post.id} 
                  id={post.id.toString()} // Ensure ID is a string
                  title={post.title}
                  description={plainDescription}
                  date={post.createdAt.toLocaleDateString()}
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