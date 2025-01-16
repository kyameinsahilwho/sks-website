import 'highlight.js/styles/github-dark.css';
import { parseMarkdown } from '@/lib/markdown';

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  const htmlContent = parseMarkdown(content);
  
  return (
    <div 
      className="prose prose-slate dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}