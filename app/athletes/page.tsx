import { getAthletes } from '@/lib/cosmic'
import { Athlete } from '@/types'
import AthleteCard from '@/components/AthleteCard'

export const revalidate = 60

export default async function AthletesPage() {
  const athletes = await getAthletes()

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Our Athletes</h1>
        <p className="text-gray-600">Meet the world-class athletes who inspire us</p>
      </div>
      
      {athletes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(athletes as Athlete[]).map((athlete) => (
            <AthleteCard key={athlete.id} athlete={athlete} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No athletes available</p>
        </div>
      )}
    </div>
  )
}