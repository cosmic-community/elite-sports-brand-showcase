import { Athlete } from '@/types'
import AthleteCard from './AthleteCard'

interface FeaturedAthletesProps {
  athletes: Athlete[]
}

export default function FeaturedAthletes({ athletes }: FeaturedAthletesProps) {
  if (!athletes || athletes.length === 0) {
    return null
  }

  return (
    <section className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Athletes</h2>
        <p className="text-gray-600 text-lg">World-class athletes who inspire excellence</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {athletes.map((athlete) => (
          <AthleteCard key={athlete.id} athlete={athlete} />
        ))}
      </div>
    </section>
  )
}