import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    <Card className={`overflow-hidden transition-colors hover:bg-accent/10 ${!published ? "opacity-60" : ""}`}>
      {coverImage && (
        <img src={coverImage} alt={title} className="w-full h-48 object-cover" />
      )}
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>{title}</CardTitle>
          {!published && (
            <span className="text-xs bg-muted px-2 py-1 rounded">Draft</span>
          )}
        </div>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>
        <div className="flex justify-between items-center">
          
          <Button asChild variant="ghost" className="group gap-2">
            <Link href={`/blogs/${slug}`}>
              Read More 
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}