"use client";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const wallpapers = [
  {
    id: 1,
    src: "/images/wall1.webp",
    alt: "Minimal aesthetic wallpaper 1",
  },
  {
    id: 2,
    src: "/images/wall2.webp",
    alt: "Minimal aesthetic wallpaper 2",
  },
  {
    id: 3,
    src: "/images/wall3.webp",
    alt: "Minimal aesthetic wallpaper 3",
  },
  {
    id: 4,
    src: "/images/wall4.webp",
    alt: "Minimal aesthetic wallpaper 4",
  },
  {
    id: 5,
    src: "/images/wall5.webp",
    alt: "Minimal aesthetic wallpaper 5",
  },
  {
    id: 6,
    src: "/images/wall6.webp",
    alt: "Minimal aesthetic wallpaper 6",
  },
  {
    id: 7,
    src: "/images/wall7.webp",
    alt: "Minimal aesthetic wallpaper 7",
  },
  {
    id: 8,
    src: "/images/wall8.webp",
    alt: "Minimal aesthetic wallpaper 8",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function WallpapersPage() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-background to-muted/20">
      <div
        className="absolute inset-0 opacity-[0.5] animate-float-fast"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #808080 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "center center",
        }}
      />

      <div className="container relative py-12 space-y-8">
        <div className="space-y-2 text-center max-w-[42rem] mx-auto mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            🖼️ Wallpaper Collection
          </h1>
          <p className="text-muted-foreground">
            A curated collection of aesthetic wallpapers <u>from me</u> for your
            devices
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {wallpapers.map((wallpaper) => (
            <motion.div
              key={wallpaper.id}
              variants={item}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="relative aspect-[9/16] group"
            >
              <Card className="overflow-hidden h-full border-none bg-background/50 backdrop-blur-sm">
                <Image
                  src={wallpaper.src}
                  alt={wallpaper.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                  <Button variant="secondary" size="icon" asChild>
                    <a href={wallpaper.src} download={wallpaper.alt} className="flex items-center justify-center">
                      <Download className="h-4 w-4 text-black" />
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
