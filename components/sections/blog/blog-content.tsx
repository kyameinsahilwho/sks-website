interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {content.split('\n').map((paragraph, index) => {
        if (paragraph.startsWith('## ')) {
          return (
            <h2 key={index} className="mt-8 mb-4 text-2xl font-bold">
              {paragraph.replace('## ', '')}
            </h2>
          );
        }
        if (paragraph.startsWith('- ')) {
          return (
            <li key={index} className="ml-6">
              {paragraph.replace('- ', '')}
            </li>
          );
        }
        if (paragraph.trim()) {
          return (
            <p key={index} className="mb-4 text-muted-foreground">
              {paragraph}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}