import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blogposts = defineCollection({
  loader: glob({
    pattern: '**/*.{mdx,md}',
    base: 'modules/blog/content/blogposts/',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      lastMaintained: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z.coerce.date().optional(),
      ),
      author: z.preprocess(
        (val) => val ?? undefined,
        z
          .object({
            name: z.string(),
            img: image().optional(),
          })
          .default({ name: 'Anon' }),
      ),
      cover: z.preprocess(
        (val) => (val === '' ? undefined : val),
        image().optional(),
      ),
      coverAlt: z.string().default('Blog Post Cover Image'),
      categories: z.array(z.string()),
    }),
});

// Legal pages collection (Impressum, Datenschutz)
const legal = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: 'src/content/legal/',
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
  }),
});

const pages = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: 'src/content/pages/',
  }),
  schema: () =>
    z.object({
      title: z.string(),
      slug: z.string(),
      isHomepage: z.boolean().default(false).optional(),
      description: z.string().optional(),
      seo: z
        .object({
          metaTitle: z.string().optional(),
          metaDescription: z.string().optional(),
          ogImage: z.string().optional(),
        })
        .optional(),
      sections: z.array(
        z.discriminatedUnion('type', [
          // Hero Section
          z.object({
            type: z.literal('hero'),
            id: z.string().optional(),
            heading: z.string(),
            text: z.string(),
            ctaText: z.string().optional(),
            ctaHref: z.string().optional(),
            secondaryCtaText: z.string().optional(),
            secondaryCtaHref: z.string().optional(),
          }),
          // Benefits Section
          z.object({
            type: z.literal('benefits'),
            id: z.string().optional(),
            heading: z.string().default('Vorteile'),
            items: z.array(
              z.object({
                icon: z.string(),
                title: z.string(),
                text: z.string(),
              }),
            ),
          }),
          // Services Slider Section
          z.object({
            type: z.literal('servicesSlider'),
            id: z.string().optional(),
            heading: z.string().default('Leistungen'),
            introText: z.string().optional(),
            items: z.array(
              z.object({
                title: z.string(),
                text: z.string(),
              }),
            ),
          }),
          // Text with Image/Video Section
          z.object({
            type: z.literal('textImage'),
            id: z.string().optional(),
            heading: z.string(),
            text: z.string(),
            media: z.string(),
            mediaAlt: z.string().default(''),
            mediaPosition: z.enum(['left', 'right']).default('right'),
            attribution: z
              .object({
                text: z.string().optional(),
                url: z.string().optional(),
              })
              .optional(),
          }),
          // Accordion Groups Section (FAQ / Wissenswertes)
          z.object({
            type: z.literal('accordionGroups'),
            id: z.string().optional(),
            heading: z.string().default('Wissenswertes'),
            groups: z.array(
              z.object({
                title: z.string(),
                description: z.string().optional(),
                accordions: z.array(
                  z.object({
                    title: z.string(),
                    content: z.string(),
                  }),
                ),
              }),
            ),
          }),
          // Contact Form Section
          z.object({
            type: z.literal('contactForm'),
            id: z.string().optional(),
            heading: z.string().default('Kontakt'),
          }),
          // Video Section
          z.object({
            type: z.literal('video'),
            id: z.string().optional(),
            heading: z.string(),
            video: z.string(),
          }),
          // Downloads Section
          z.object({
            type: z.literal('downloads'),
            id: z.string().optional(),
            heading: z.string().default('Downloads'),
            items: z.array(
              z.object({
                title: z.string(),
                file: z.string(),
              }),
            ),
          }),
        ]),
      ),
    }),
});

const settings = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: 'src/content/settings/',
  }),
  schema: () =>
    z.object({
      logo: z.string().optional(),
      socialLinks: z
        .array(
          z.object({
            name: z.string(),
            url: z.string(),
            icon: z.string(),
          }),
        )
        .optional(),
    }),
});

const linktree = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: 'src/content/linktree/',
  }),
  schema: () =>
    z.object({
      ownerName: z.string(),
      ownerTitle: z.string(),
      logo: z.string().optional(),
      links: z.array(
        z.object({
          title: z.string(),
          url: z.string(),
        }),
      ),
    }),
});

export const collections = { blogposts, legal, pages, settings, linktree };
