'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme, ThemeProvider } from 'next-themes';
import { Button } from '@/components/ui/button';

function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="hover:bg-accent/50"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function ThemeToggle() {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <ThemeToggleButton />
    </ThemeProvider>
  );
}