import { Story } from '@/types'
import Link from 'next/link'

interface StoryCardProps {
  story: Story
}

export default function StoryCard({ story }: StoryCardProps) {
  const image = story.metadata.hero_image

  return (
    <Link href={`/stories/${story.slug}`} className="group">
      <div className="relative h-[400px] bg-gray-200 rounded-lg overflow-hidden">
        {image ? (
          <img
            src={`${image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={story.metadata.story_title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-400">No image</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs mb-3">
              {story.metadata.story_type.value}
            </span>
            <h3 className="text-2xl font-bold group-hover:underline">
              {story.metadata.story_title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  )
}