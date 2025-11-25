// app/athletes/[slug]/page.tsx
import { getAthleteBySlug, getAthletes } from '@/lib/cosmic'
import { Athlete } from '@/types'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

export const revalidate = 60

export async function generateStaticParams() {
  const athletes = await getAthletes()
  
  return athletes.map((athlete) => ({
    slug: athlete.slug,
  }))
}

export default async function AthletePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const athlete = await getAthleteBySlug(slug) as Athlete | null

  if (!athlete) {
    notFound()
  }

  const achievements = athlete.metadata.achievements?.split('\n').filter(Boolean) || []
  const actionPhotos = athlete.metadata.action_photos || []

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Profile Photo */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {athlete.metadata.profile_photo ? (
            <img
              src={`${athlete.metadata.profile_photo.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
              alt={athlete.metadata.athlete_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">No photo available</p>
            </div>
          )}
        </div>

        {/* Athlete Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{athlete.metadata.athlete_name}</h1>
            <p className="text-xl text-gray-600">{athlete.metadata.sport}</p>
            {athlete.metadata.instagram_handle && (
              <a 
                href={`https://instagram.com/${athlete.metadata.instagram_handle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                {athlete.metadata.instagram_handle}
              </a>
            )}
          </div>

          {achievements.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Achievements</h2>
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{athlete.metadata.bio}</ReactMarkdown>
        </div>
      </div>

      {/* Action Photos */}
      {actionPhotos.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">In Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {actionPhotos.map((photo, index) => (
              <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={`${photo.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
                  alt={`${athlete.metadata.athlete_name} - Action ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}