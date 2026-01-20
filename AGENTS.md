# AGENTS.md - AI Coding Agent Guidelines

Guidelines for AI coding agents working in this Astro project.

## Build/Lint/Test Commands

```bash
npm run dev      # Development server with hot reload
npm run build    # Production build (type-checks first)
npm run preview  # Preview production build locally

# Linting (no dedicated script)
npx eslint .                           # Lint entire project
npx eslint src/components/Card.astro   # Lint specific file
npx eslint . --fix                     # Lint with auto-fix

# Type checking
npx astro check
```

**Note**: No test framework is configured.

---

## Code Style Guidelines

### Import Organization (ESLint enforced)

```typescript
// 1. Type imports
import type { AstroIntegration } from 'astro';
import type { Props } from './Component.types.ts';

// 2. External packages
import { getCollection, render } from 'astro:content';

// 3. Path alias imports
import BaseLayout from '@layouts/BaseLayout.astro';
import config from '@config';

// 4. Relative imports
import { remarkReadingTime } from './plugins/readingTime.ts';

// 5. Icon imports
import Moon from '~icons/lucide/moon';
```

### Path Aliases

| Alias           | Path                |
| --------------- | ------------------- |
| `@modules/*`    | `modules/*`         |
| `@config`       | `project-config.ts` |
| `@components/*` | `src/components/*`  |
| `@layouts/*`    | `src/layouts/*`     |
| `@assets/*`     | `src/assets/*`      |
| `@sections/*`   | `src/sections/*`    |
| `@content/*`    | `src/content/*`     |

### TypeScript

- Strict mode via `astro/tsconfigs/strictest`
- Use `import type { ... }` for type-only imports
- Explicit return types on exported functions (warning)
- `_` prefix for intentionally unused variables
- Never leave promises unhandled

### Naming Conventions

| Element             | Convention         | Example                |
| ------------------- | ------------------ | ---------------------- |
| Components          | PascalCase         | `PricingCard.astro`    |
| Type files          | `.types.ts` suffix | `PricingCard.types.ts` |
| Props interface     | `Props`            | `interface Props`      |
| Type parameters     | `T` prefix         | `TData`                |
| Functions/constants | camelCase          | `getCollection()`      |
| CSS classes         | kebab-case         | `card-container`       |

### Formatting (Prettier)

2 spaces, semicolons always, single quotes, trailing commas, `{ foo }` spacing, `(x) => x` parens.

### Key ESLint Rules

- `no-console`: warn (except `warn`, `error`)
- `eqeqeq`: always `===`/`!==`
- `no-var`: use `const`/`let`
- `prefer-const`: when never reassigned
- `object-shorthand`: `{ foo }` not `{ foo: foo }`

---

## Project Structure

```
modules/           # Feature modules (e.g., blog)
public/            # Static assets (served as-is)
src/
  assets/          # Processed assets
  components/      # UI components
  content/         # Content collections
  layouts/         # Page wrappers
  lib/             # Utilities
  pages/           # File-based routing
  plugins/         # Remark/Rehype plugins
  sections/        # Page sections
  content.config.ts
project-config.ts  # Site config
astro.config.ts    # Astro config
```

### Astro Component Structure

```astro
---
import type { Props } from './Component.types.ts';
import BaseLayout from '@layouts/BaseLayout.astro';

const { title } = Astro.props;
const data = await getData();
---

<div class="container">
  <h1>{title}</h1>
</div>

<style lang="scss">
  .container {
    @include view-tablet {
      /* responsive */
    }
  }
</style>
```

### Content Collections

1. Define Zod schema in `src/content.config.ts`
2. Use `getCollection()` and `render()` from `astro:content`
3. Place content in `content/` directory

---

## Module System

Feature modules in `modules/` with their own `integration.ts`, pages, and components. Enable/disable in `astro.config.ts`.

---

## Configuration Files

| File                | Purpose                      |
| ------------------- | ---------------------------- |
| `astro.config.ts`   | Astro, Vite, integrations    |
| `project-config.ts` | Site metadata, feature flags |
| `tsconfig.json`     | TypeScript config            |
| `eslint.config.js`  | ESLint flat config           |
| `.prettierrc.mjs`   | Prettier formatting          |

---

## CMS Integration (Sveltia CMS)

CMS config: `public/admin/config.yml`
Media folder: `/public/assets`

### Collections

| Collection  | Location                | Format | Purpose                        |
| ----------- | ----------------------- | ------ | ------------------------------ |
| `settings`  | `src/content/settings/` | JSON   | Global config (logo, social)   |
| `pages`     | `src/content/pages/`    | JSON   | Dynamic pages with sections    |
| `legal`     | `src/content/legal/`    | MD     | Legal pages (Impressum, etc.)  |
| `blogposts` | `modules/blog/content/` | MD/MDX | Blog posts (if module enabled) |

### Adding a New Section Type

1. **CMS config** (`public/admin/config.yml`): Add widget under `pages.fields.sections.types`
2. **Zod schema** (`src/content.config.ts`): Add to `z.discriminatedUnion('type', [...])` in pages collection
3. **Component** (`src/sections/`): Create `SectionName.astro`
4. **Renderer** (`src/pages/index.astro` or page template): Add case for new section type

Example CMS widget:

```yaml
- label: 'My Section'
  name: 'mySection'
  widget: 'object'
  fields:
    - { label: 'Sektions-ID', name: 'id', widget: 'string', required: false }
    - { label: 'Überschrift', name: 'heading', widget: 'string' }
```

Corresponding Zod schema:

```typescript
z.object({
  type: z.literal('mySection'),
  id: z.string().optional(),
  heading: z.string(),
}),
```

### Settings Collection

Global site settings in `src/content/settings/general.json`:

- `logo`: Site logo image (used in Header)
- `socialLinks`: Array of `{ name, url, icon }` (used in Footer)

Access in components:

```typescript
import { getEntry } from 'astro:content';
const settings = await getEntry('settings', 'general');
const logo = settings?.data.logo;
```

---

## CSS Custom Properties

Defined in `src/layouts/BaseLayout.astro`:

| Variable            | Value               | Usage                |
| ------------------- | ------------------- | -------------------- |
| `--background`      | `#23272d`           | Page background      |
| `--secondary`       | `#ffffff`           | Headings, emphasis   |
| `--text`            | `#d9d9d9`           | Body text            |
| `--accent`          | `#ff7700`           | Highlights, borders  |
| `--gray`            | `#888888`           | Muted text           |
| `--darkgray`        | `#333333`           | Dark backgrounds     |
| `--header-height`   | `80px`              | Sticky header height |
| `--section-padding` | `80px` (responsive) | Section padding      |
| `--max-width`       | `1280px`            | Content max width    |

---

## SCSS Mixins

Defined in `src/assets/styles/_mixins.scss` (auto-injected). Check file for full list.

| Category    | Examples                              |
| ----------- | ------------------------------------- |
| Breakpoints | `@include view-tablet`, `view-mobile` |
| Typography  | `@include h1`, `h2`, `copy`, `copy-l` |
| Utilities   | `@include hover`, `ul`, `ol`          |

---

## Icons

```astro
---
import Moon from '~icons/lucide/moon';
---

<Moon />
```

Browse: https://icon-sets.iconify.design/
