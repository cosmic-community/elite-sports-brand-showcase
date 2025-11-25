// app/collections/[slug]/page.tsx
import { getCollectionBySlug, getCollections } from '@/lib/cosmic'
import { Collection } from '@/types'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

export const revalidate = 60

export async function generateStaticParams() {
  const collections = await getCollections()
  
  return collections.map((collection) => ({
    slug: collection.slug,
  }))
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug) as Collection | null

  if (!collection) {
    notFound()
  }

  const gallery = collection.metadata.gallery || []

  return (
    <div>
      {/* Hero Section */}
      {collection.metadata.hero_image && (
        <div className="relative h-[500px] bg-gray-900">
          <img
            src={`${collection.metadata.hero_image.imgix_url}?w=2400&h=1000&fit=crop&auto=format,compress`}
            alt={collection.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">{collection.metadata.collection_name}</h1>
              {collection.metadata.season_year && (
                <p className="text-xl">{collection.metadata.season_year}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none mb-12">
            <ReactMarkdown>{collection.metadata.description}</ReactMarkdown>
          </div>

          {/* Gallery */}
          {gallery.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gallery.map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={`${image.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                    alt={`${collection.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}