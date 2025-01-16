import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
});

export function parseMarkdown(content: string): string {
  return md.render(content);
}
