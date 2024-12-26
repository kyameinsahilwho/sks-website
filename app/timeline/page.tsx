"use client";

import { Timeline } from "@/components/sections/timeline/timeline-item";

const timelineData = [
  {
    title: "2023",
    content: (
      <div className="prose dark:prose-invert">
        <p>Started working on personal projects and expanding portfolio.</p>
      </div>
    ),
  },
  {
    title: "2019",
    content: (
      <div className="prose dark:prose-invert">
        <p>Began working with clients worldwide on various creative projects.</p>
      </div>
    ),
  },
  {
    title: "2017",
    content: (
      <div className="prose dark:prose-invert">
        <p>Completed degree in Digital Arts and Design.</p>
      </div>
    ),
  },
  
  
];

export default function TimelinePage() {
  return (
    <div className="min-h-screen w-full">
      <Timeline data={timelineData} />
    </div>
  );
}