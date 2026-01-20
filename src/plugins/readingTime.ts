import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';
import type { Root } from 'mdast';
import type { ReadTimeResults } from 'reading-time';

interface AstroData {
  astro?: {
    frontmatter?: Record<string, unknown>;
  };
}

export function remarkReadingTime() {
  return function (tree: Root, { data }: { data: AstroData }) {
    const textOnPage = toString(tree);
    const readingTime: ReadTimeResults = getReadingTime(textOnPage);

    if (data?.astro?.frontmatter) {
      data.astro.frontmatter.minutesRead = readingTime.text;
    }
  };
}
