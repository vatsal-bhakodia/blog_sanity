# BlogSpace - Next.js Blog with Sanity CMS

A modern, beautiful blog application built with Next.js 13+ and Sanity CMS. Features a clean design, responsive layout, and allows anyone to create and read blog posts without authentication.

## Features

- **No Authentication Required**: Anyone can write and read posts
- **Modern Design**: Clean, professional UI with Tailwind CSS and shadcn/ui components
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Search & Filter**: Find posts by title, author, or category
- **Rich Content**: Support for images and formatted text
- **SEO Friendly**: Optimized for search engines
- **Fast Performance**: Built with Next.js 13+ App Router

## Tech Stack

- **Frontend**: Next.js 13+, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **CMS**: Sanity
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## Getting Started

### 1. Clone and Install

```bash
npm install
```

### 2. Set up Sanity CMS

1. Create a new Sanity project at [sanity.io](https://sanity.io)
2. Install Sanity CLI globally: `npm install -g @sanity/cli`
3. Create a new Sanity project: `sanity init`
4. Copy your project ID and dataset name

### 3. Configure Environment Variables

Update `.env.local` with your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_TOKEN=your-token
```

### 4. Set up Sanity Studio

Create a `sanity.config.ts` file in your project root:

```typescript
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'BlogSpace',
  projectId: 'your-project-id',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
```

### 5. Deploy Sanity Studio

```bash
npx sanity deploy
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog.

## Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── blog/[slug]/       # Individual blog post pages
│   ├── blogs/             # All blogs listing page
│   ├── write/             # Create new post page
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
├── lib/                   # Utility functions and Sanity client
├── sanity/               # Sanity CMS configuration and schemas
└── public/               # Static assets
```

## Key Components

- **Header**: Navigation with logo and write button
- **Footer**: Site information and links
- **BlogCard**: Reusable blog post preview card
- **Home**: Hero section with featured posts
- **Blogs**: Search and filter functionality
- **Write**: Rich form for creating new posts

## Sanity Schema

The blog post schema includes:
- Title and slug
- Author name
- Excerpt
- Main image
- Categories
- Publication date
- Rich text content

## Deployment

This app can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**

Remember to set your environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.