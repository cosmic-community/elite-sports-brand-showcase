import { Athlete } from '@/types'
import Link from 'next/link'

interface AthleteCardProps {
  athlete: Athlete
}

export default function AthleteCard({ athlete }: AthleteCardProps) {
  const image = athlete.metadata.profile_photo

  return (
    <Link href={`/athletes/${athlete.slug}`} className="group">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
        {image ? (
          <img
            src={`${image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={athlete.metadata.athlete_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-400">No image</p>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1 group-hover:underline">
          {athlete.metadata.athlete_name}
        </h3>
        <p className="text-gray-600">{athlete.metadata.sport}</p>
      </div>
    </Link>
  )
}