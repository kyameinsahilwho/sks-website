import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: any; // Changed to accept compiled MDX
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const { content: compiledContent } = await compileMDX({
          source: content,
          options: { 
            parseFrontmatter: true,
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                rehypeHighlight
              ],
            }
          }
        });

        return {
          slug,
          title: data.title,
          description: data.description,
          date: data.date,
          content: compiledContent
        };
    })
  );

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const { content: compiledContent } = await compileMDX({
      source: content,
      options: { 
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            rehypeHighlight
          ],
        }
      }
    });

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      content: compiledContent
    };
  } catch {
    return undefined;
  }
}