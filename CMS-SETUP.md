# Sveltia CMS Setup Guide

This project uses **Sveltia CMS** - a modern, lightweight Git-based content management system. It's a drop-in replacement for Decap CMS but significantly faster and lighter.

## Why Sveltia CMS?

- **5x smaller bundle size**: ~300KB vs Decap's 1.5MB+
- **Faster performance**: Built with modern Svelte
- **Better UX**: Improved mobile/tablet support
- **Solves 270+ issues** from Decap/Netlify CMS
- **Fully compatible**: Uses the same config.yml format

## 🚀 Quick Start

### Local Development

1. Start dev server with one command:

   ```bash
   npm run dev
   ```

2. Access the CMS at: `http://localhost:4321/admin/`

3. Login with any credentials (local mode doesn't require authentication)

#### Step 1: Create a GitHub OAuth App

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: `Your Project Name - CMS`
   - **Homepage URL**: `https://yourdomain.com`
   - **Authorization callback URL**: `https://api.github.com/user`
4. Click "Register application"
5. Copy your **Client ID** (this is your `app_id`)

#### Step 2: Update CMS Configuration

Edit `public/admin/config.yml` and update these values:

```yaml
repo: yourusername/your-repo-name # Your GitHub repository
branch: main # Your main branch
app_id: YOUR_GITHUB_OAUTH_APP_ID # Your OAuth App Client ID from Step 1
```

**Note on Security:** The `config.yml` file is served publicly, but this is intentional and safe:

- The GitHub OAuth App ID is meant to be public (it's like a username, not a password)
- Your repository name is already public
- GitHub's PKCE flow handles authentication securely in the browser
- Only users with repository write access can actually make changes

**Sveltia CMS Compatibility:** Sveltia CMS uses the exact same config.yml format as Decap CMS, so no changes needed to the configuration file.

#### Step 3: Initial Deploy

When you deploy to your VPS:

1. Fill out CMS Configuration.
2. Build the project and deploy like any other project either as static site serving dist/ or with a node-adapter.

#### Step 4: Auto-Deploy on Content Changes

The GitHub Action in the repo handles automatic deploys on content changes.

## 📝 Content Structure

### Editable via CMS

1. **Homepage** (`src/content/homepage.json`)
   - Hero section
   - About section with accordions

2. **Blog Posts** (`modules/blog/content/blogposts/`)
   - Create, edit, and delete blog posts
   - Supports markdown content
   - Author information
   - Categories and tags
   - Cover images

## 🔒 Security Notes

- The CMS is publicly accessible at `/admin/` but requires GitHub authentication in production
- Only users with write access to your GitHub repository can make changes
- All changes are committed to your git repository (full audit trail)
- Media uploads are stored in `public/images/uploads/`

## 🔄 Switching to Another CMS Later

Since all content is stored in git-friendly formats (JSON, Markdown, TypeScript), you can easily migrate to:

- **Directus**: Point it to the same file structure
- **Strapi**: Import content via API
- **Sanity/Contentful**: Write a migration script
- Or keep using DecapCMS - it's production-ready!

The modular `project-config.ts` approach makes CMS switching straightforward.

## 📚 Resources

- [DecapCMS Documentation](https://decapcms.org/docs/)
- [GitHub OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [DecapCMS Widget Reference](https://decapcms.org/docs/widgets/)
