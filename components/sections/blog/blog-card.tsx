import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  published?: boolean;
  tags: string[];
  metaDescription?: string;
  keywords?: string;
  coverImage?: string | null;
}

export function BlogCard({ title, description, date, slug, published = true, coverImage }: BlogCardProps) {
  return (
    <Link href={`/blogs/${slug}`}>
      <Card className={`relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl rounded-none ${!published ? "opacity-60" : ""} border-b-4 border-transparent hover:border-b-cyan-700 cursor-pointer`}>
        {coverImage && (
          <div className="relative w-full h-64">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            {!published && (
              <span className="text-xs bg-muted px-2 py-1">Draft</span>
            )}
          </div>
          <CardDescription className="text-base">{date}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
