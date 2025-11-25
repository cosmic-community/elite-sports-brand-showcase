import { Collection } from '@/types'
import Link from 'next/link'

interface CollectionCardProps {
  collection: Collection
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const image = collection.metadata.hero_image

  return (
    <Link href={`/collections/${collection.slug}`} className="group">
      <div className="relative h-[400px] bg-gray-200 rounded-lg overflow-hidden">
        {image ? (
          <img
            src={`${image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={collection.metadata.collection_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-400">No image</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white">
            <h3 className="text-2xl font-bold mb-2 group-hover:underline">
              {collection.metadata.collection_name}
            </h3>
            {collection.metadata.season_year && (
              <p className="text-sm opacity-90">{collection.metadata.season_year}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}