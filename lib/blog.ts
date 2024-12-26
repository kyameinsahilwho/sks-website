interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "The Art of Digital Design",
    description: "Exploring the principles of creating meaningful digital experiences.",
    date: "March 15, 2024",
    slug: "art-of-digital-design",
    content: `
      Digital design is more than just making things look pretty—it's about creating meaningful experiences that resonate with users. In this post, we'll explore the fundamental principles that guide effective digital design.

      ## Understanding User Needs
      The first step in any design process is understanding your users. What are their goals? What problems are they trying to solve? How can your design make their lives easier?

      ## Visual Hierarchy
      Good design guides users through content effortlessly. This is achieved through careful consideration of:
      - Typography
      - Color
      - Space
      - Contrast

      ## Consistency
      Maintaining consistency in design elements helps users navigate your interface intuitively. This includes consistent:
      - Color schemes
      - Typography
      - Button styles
      - Spacing
    `,
  },
  {
    title: "Photography in the Digital Age",
    description: "How technology is shaping modern photography.",
    date: "March 10, 2024",
    slug: "photography-digital-age",
    content: `
      The digital revolution has transformed photography in countless ways. From smartphone cameras to advanced editing software, the tools available to photographers have never been more powerful or accessible.

      ## The Democratization of Photography
      Digital technology has made photography more accessible than ever. Anyone with a smartphone can now capture and share moments instantly.

      ## New Creative Possibilities
      Digital tools have opened up new creative possibilities:
      - HDR imaging
      - Computational photography
      - AI-powered editing
      - Mobile post-processing

      ## The Future of Photography
      As technology continues to evolve, we can expect even more innovations in how we capture and share images.
    `,
  },
  {
    title: "Creative Process Unveiled",
    description: "A behind-the-scenes look at my creative workflow.",
    date: "March 5, 2024",
    slug: "creative-process",
    content: `
      Every creative professional has their own unique workflow. In this post, I'll share my personal approach to creative projects and the tools I use to bring ideas to life.

      ## Phase 1: Research & Inspiration
      Before starting any project, it's crucial to:
      - Gather reference materials
      - Study similar works
      - Understand the context
      - Define clear goals

      ## Phase 2: Ideation & Sketching
      The initial creative phase involves:
      - Brainstorming sessions
      - Quick sketches
      - Mind mapping
      - Concept development

      ## Phase 3: Execution & Refinement
      The final phase focuses on:
      - Detailed implementation
      - Feedback integration
      - Quality control
      - Final polish
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}