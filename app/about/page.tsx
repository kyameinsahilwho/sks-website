import { Palette, Code, Lightbulb, Camera } from "lucide-react";
import { SkillCard } from "@/components/sections/about/skill-card";

const skills = [
  {
    title: "Visual Design",
    description: "Creating beautiful and intuitive user interfaces with attention to detail.",
    icon: <Palette className="h-8 w-8" />,
  },
  {
    title: "Development",
    description: "Building robust and scalable applications using modern technologies.",
    icon: <Code className="h-8 w-8" />,
  },
  {
    title: "Creative Direction",
    description: "Leading projects with a clear vision and innovative approach.",
    icon: <Lightbulb className="h-8 w-8" />,
  },
  {
    title: "Photography",
    description: "Capturing moments and creating visual stories through the lens.",
    icon: <Camera className="h-8 w-8" />,
  },
];

export default function AboutPage() {
  return (
    <div className="container py-12">
      <h1 className="mb-8 text-4xl font-bold">About Me</h1>
      <div className="mb-12 max-w-2xl">
        <p className="text-lg text-muted-foreground">
          I'm a passionate creative professional with a love for design, development, and visual arts. 
          Through my work, I strive to create meaningful experiences that inspire and engage.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill) => (
          <SkillCard key={skill.title} {...skill} />
        ))}
      </div>
    </div>
  );
}