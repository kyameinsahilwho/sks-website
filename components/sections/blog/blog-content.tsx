import 'highlight.js/styles/github-dark.css';

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-slate max-w-none">
      {content.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}