import 'highlight.js/styles/github-dark.css';

interface BlogContentProps {
  content: React.ReactNode;
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert prose-pre:bg-muted prose-pre:border prose-pre:border-border max-w-none">
      {content}
    </div>
  );
}