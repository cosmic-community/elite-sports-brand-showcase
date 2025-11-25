import { Story } from '@/types'
import StoryCard from './StoryCard'

interface FeaturedStoriesProps {
  stories: Story[]
}

export default function FeaturedStories({ stories }: FeaturedStoriesProps) {
  if (!stories || stories.length === 0) {
    return null
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Stories</h2>
          <p className="text-gray-600 text-lg">Innovation, inspiration, and impact</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </section>
  )
}