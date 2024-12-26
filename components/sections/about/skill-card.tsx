'use client';

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface SkillCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function SkillCard({ title, description, icon }: SkillCardProps) {
  return (
    <div className="transform transition-all duration-200 hover:-translate-y-1">
      <Card className="h-full bg-card/50 backdrop-blur">
        <CardHeader>
          <div className="mb-2 text-primary/80">{icon}</div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}