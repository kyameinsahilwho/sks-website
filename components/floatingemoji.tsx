'use client';

const FloatingEmoji = ({ emoji, initialX, initialY, delay }: { 
  emoji: string;
  initialX: number;
  initialY: number;
  delay: number;
}) => {
  return (
    <div
      className="absolute pointer-events-none select-none opacity-20"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        animation: `float 20s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {emoji}
    </div>
  );
};

export default FloatingEmoji;