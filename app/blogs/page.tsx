import { BlogCard } from "@/components/sections/blog/blog-card";
import { blogPosts } from "@/lib/blog";

export default function BlogsPage() {
  return (
    <div className="container py-12">
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}