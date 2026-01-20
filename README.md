# TODO

- [x] OgImg
- [x] Favicon
- [x] SEO / Meta
- [x] Convert fonts to woff2

# Astro Project Template

This is my Astro project template, currently in development. The goal is to create a solid foundation for any project I want to build—whether it's a SaaS SPA, a simple landing page MPA, or anything in between.

## Key Features

The template is designed to be modular via the `project-config.ts` file. I've already added many basic features you'd expect in such a template.

## CMS Integration

This template includes **Sveltia CMS** - a modern, lightweight Git-based CMS that works perfectly on VPS deployments. It's a drop-in replacement for Decap/Netlify CMS.

### Quick Start with CMS

**Local Development:**

```bash
npm run dev

# Access your site at: http://localhost:4321/
# Access CMS at: http://localhost:4321/admin/
```

**Production:** See [CMS-SETUP.md](./CMS-SETUP.md) for complete deployment instructions.

### Editable Content

- **Homepage**: Hero section, About section with accordions
- **Blog Posts**: Full markdown support with frontmatter

All changes are committed directly to your git repository - no database required!

## Documentation

- [CMS Setup Guide](./CMS-SETUP.md) - Complete Sveltia CMS configuration and deployment guide
