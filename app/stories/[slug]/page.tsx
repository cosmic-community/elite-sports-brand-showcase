// app/stories/[slug]/page.tsx
import { getStoryBySlug, getStories } from '@/lib/cosmic'
import { Story } from '@/types'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

export const revalidate = 60

export async function generateStaticParams() {
  const stories = await getStories()
  
  return stories.map((story) => ({
    slug: story.slug,
  }))
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const story = await getStoryBySlug(slug) as Story | null

  if (!story) {
    notFound()
  }

  const gallery = story.metadata.gallery || []
  const relatedProducts = story.metadata.related_products || []

  return (
    <div>
      {/* Hero Section */}
      {story.metadata.hero_image && (
        <div className="relative h-[500px] bg-gray-900">
          <img
            src={`${story.metadata.hero_image.imgix_url}?w=2400&h=1000&fit=crop&auto=format,compress`}
            alt={story.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-3xl px-4">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4">
                {story.metadata.story_type.value}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold">{story.metadata.story_title}</h1>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none mb-12">
            <ReactMarkdown>{story.metadata.content}</ReactMarkdown>
          </div>

          {/* Related Athlete */}
          {story.metadata.related_athlete && (
            <div className="mb-12 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Featured Athlete</h2>
              <Link 
                href={`/athletes/${story.metadata.related_athlete.slug}`}
                className="flex items-center gap-4 hover:opacity-80 transition-opacity"
              >
                {story.metadata.related_athlete.metadata.profile_photo && (
                  <img
                    src={`${story.metadata.related_athlete.metadata.profile_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                    alt={story.metadata.related_athlete.metadata.athlete_name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg">{story.metadata.related_athlete.metadata.athlete_name}</h3>
                  <p className="text-gray-600">{story.metadata.related_athlete.metadata.sport}</p>
                </div>
              </Link>
            </div>
          )}

          {/* Gallery */}
          {gallery.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gallery.map((image, index) => (
                  <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={`${image.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
                      alt={`${story.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group"
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                      {product.metadata.product_images && product.metadata.product_images[0] && (
                        <img
                          src={`${product.metadata.product_images[0].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                          alt={product.metadata.product_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <h3 className="font-semibold group-hover:underline">{product.metadata.product_name}</h3>
                    <p className="text-gray-600">{product.metadata.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}