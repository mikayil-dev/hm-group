import { marked } from 'marked';

export function parseMarkdown(markdown: string): string {
  return marked.parse(markdown.replaceAll('\n', '<br>')) as string;
}
