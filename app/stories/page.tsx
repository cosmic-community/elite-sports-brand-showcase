import { getStories } from '@/lib/cosmic'
import { Story } from '@/types'
import StoryCard from '@/components/StoryCard'

export const revalidate = 60

export default async function StoriesPage() {
  const stories = await getStories()

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Our Stories</h1>
        <p className="text-gray-600">Innovation, inspiration, and impact</p>
      </div>
      
      {stories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(stories as Story[]).map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No stories available</p>
        </div>
      )}
    </div>
  )
}