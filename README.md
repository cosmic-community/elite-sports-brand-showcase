# Elite Sports Brand Showcase

![App Banner](https://imgix.cosmicjs.com/2ac9b890-c9fc-11f0-873a-d17fb3e7adf2-photo-1608231387042-66d1773070a5-1764074529808.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A premium sports brand showcase website featuring products, collections, athletes, and brand stories. Built with Next.js 16 and powered by Cosmic.

## ✨ Features

- 🏆 **Product Catalog**: Browse products with detailed pages featuring multiple images, sizes, and pricing
- 📚 **Collections**: Featured seasonal collections with rich imagery and product relationships
- ⚡ **Athletes**: Athlete profiles with achievements, bio, and action photography
- 📖 **Stories**: Brand narratives covering innovation, sustainability, and community impact
- 🎯 **Category Navigation**: Filter products by Shoes, Apparel, Equipment, and Accessories
- 📱 **Responsive Design**: Optimized for all devices with modern, athletic aesthetic
- 🖼️ **Image Optimization**: Automatic image optimization using imgix
- 🎨 **Modern UI**: Built with Tailwind CSS and clean, professional design

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6925a1f03607fb35962e40ff&clone_repository=6925a6a13607fb35962e4162)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a sports brand website with products, categories, collections, athletes, and brand stories"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Cosmic SDK**: Content management
- **React Markdown**: Markdown content rendering
- **Imgix**: Image optimization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket
- Your Cosmic Bucket credentials

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd elite-sports-brand-showcase
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file in the root directory:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Cosmic SDK Examples

### Fetching Products with Categories

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all products with their categories
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Access category data
products.forEach(product => {
  console.log(product.metadata.category.title)
})
```

### Fetching Stories with Related Content

```typescript
// Get stories with related athletes and products
const { objects: stories } = await cosmic.objects
  .find({ type: 'stories' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Access related content
stories.forEach(story => {
  if (story.metadata.related_athlete) {
    console.log('Featured Athlete:', story.metadata.related_athlete.title)
  }
})
```

### Fetching Featured Athletes

```typescript
// Get featured athletes only
const { objects: athletes } = await cosmic.objects
  .find({ 
    type: 'athletes',
    'metadata.featured_athlete': true 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## 🌐 Cosmic CMS Integration

This application uses Cosmic as a headless CMS with the following content types:

- **Products**: Product catalog with images, pricing, sizes, and categories
- **Categories**: Product categories with icons and descriptions
- **Collections**: Seasonal collections with gallery images
- **Athletes**: Featured athlete profiles with achievements and photos
- **Stories**: Brand narratives with hero images and related content

The content structure supports:
- Object relationships (products → categories, stories → athletes)
- File uploads for images and galleries
- Markdown content for rich text
- Select dropdowns for story types
- Switch fields for featured flags

## 🚀 Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub repository
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Click "Deploy"

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the "Deploy to Netlify" button above
2. Connect your GitHub repository
3. Add your environment variables in Netlify's dashboard
4. Click "Deploy site"

### Environment Variables for Production

Make sure to set these environment variables in your hosting platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) - The Headless CMS for modern applications.

<!-- README_END -->