import { Collection } from '@/types'
import CollectionCard from './CollectionCard'

interface FeaturedCollectionsProps {
  collections: Collection[]
}

export default function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  if (!collections || collections.length === 0) {
    return null
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Collections</h2>
          <p className="text-gray-600 text-lg">Explore our curated seasonal collections</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  )
}