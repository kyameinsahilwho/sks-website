interface BlogHeaderProps {
  title: string;
  date: string;
}

export function BlogHeader({ title, date }: BlogHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="mb-2 text-4xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{date}</p>
    </header>
  );
}