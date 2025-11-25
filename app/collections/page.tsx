import { getCollections } from '@/lib/cosmic'
import { Collection } from '@/types'
import CollectionCard from '@/components/CollectionCard'

export const revalidate = 60

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Collections</h1>
        <p className="text-gray-600">Explore our curated seasonal collections</p>
      </div>
      
      {collections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(collections as Collection[]).map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No collections available</p>
        </div>
      )}
    </div>
  )
}