import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { RoughNotation } from "react-rough-notation";
export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background">
      <div className="absolute opacity-60 inset-0 pointer-events-none z-10">
        <svg
          className="absolute animate-float-slow top-32 left-1/2 md:left-1/4 w-20 h-20"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient
              id="hexGradient"
              x1="0% "
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#FFD700", stopOpacity: 0.8 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#DAA520", stopOpacity: 0.6 }}
              />
            </linearGradient>
          </defs>

          {/* Hexagon */}
          <path
            d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z"
            fill="#FFFACD"
            stroke="url(#hexGradient)"
            strokeWidth="2"
          />

          {/* Diagonals */}
          <line
            x1="15"
            y1="30"
            x2="85"
            y2="70"
            stroke="#FFD700"
            strokeWidth="1"
            opacity="0.6"
          />
          <line
            x1="15"
            y1="70"
            x2="85"
            y2="30"
            stroke="#FFD700"
            strokeWidth="1"
            opacity="0.6"
          />
          <line
            x1="50"
            y1="10"
            x2="50"
            y2="90"
            stroke="#FFD700"
            strokeWidth="1"
            opacity="0.6"
          />
        </svg>

        <svg
          className="absolute animate-float-fast bottom-1/3 right-1/4 w-24 h-24"
          viewBox="-50 -50 100 100"
        >
          <defs>
            <linearGradient
              id="heartGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#FF6B6B", stopOpacity: 0.9 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#FF0066", stopOpacity: 0.7 }}
              />
            </linearGradient>
          </defs>
          <polygon
            points="0,-20 -20,-40 -40,-20 -40,0 0,40 40,0 40,-20 20,-40"
            fill="url(#heartGradient)"
          />
        </svg>
        <svg
          className="absolute animate-float-medium top-1/3 right-1/2 w-28 h-28 text-primary/20"
          viewBox="0 0 100 100"
        >
          {/* Outer eye shape */}
          <ellipse cx="50" cy="50" rx="45" ry="30" fill="currentColor" />

          {/* Iris */}
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="currentColor"
            strokeWidth="2"
            stroke="currentColor"
          />

          {/* Pupil */}
          <circle
            cx="50"
            cy="50"
            r="8"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          />

          {/* Detail lines */}
          <path
            d="M10,50 Q50,80 90,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M10,50 Q50,20 90,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(195, 42%, 85%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(195, 42%, 85%) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "center center",
        }}  
      />

      <div className="container relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
        <h1 className="font-pacifico text-4xl sm:text-5xl md:text-6xl">
          Welcome to My{" "}
          <RoughNotation
            type="highlight"
            show={true}
            color="#10EF8F30"
            strokeWidth={1}
            animationDuration={800}
            order="1"
          >
            Creative Space
          </RoughNotation>
        </h1>
        <p className="mt-9 text-justify max-w-2xl text-lg text-muted-foreground">
          Hi, I'm{" "}
          <RoughNotation
            type="underline"
            show={true}
            color="grey"
            strokeWidth={2}
            animationDuration={800}
            order="2"
          >
            Sahil Kumar Singh
          </RoughNotation>
          . This is where I share my journey through art, blogs, mathematics and
          creativity. Explore my work, read my thoughts, and join me on my
          adventure.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="gap-2 group transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
          >
            <Link href="/about" className="flex items-center">
              Read Me
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="
              shadow-[0px_2px_4px_rgba(0,0,0,0.1)]
              transition-all duration-300 ease-in-out 
              hover:scale-105 
              hover:bg-primary 
              hover:text-primary-foreground
              hover:shadow-[0px_4px_8px_rgba(0,0,0,0.15),0px_16px_32px_rgba(0,0,0,0.1)]
              active:shadow-[0px_2px_4px_rgba(0,0,0,0.1)]
            "
          >
            <Link href="/reach-out">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
