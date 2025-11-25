import { getFeaturedProducts, getFeaturedCollections, getFeaturedAthletes, getFeaturedStories } from '@/lib/cosmic'
import { Product, Collection, Athlete, Story } from '@/types'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import FeaturedCollections from '@/components/FeaturedCollections'
import FeaturedAthletes from '@/components/FeaturedAthletes'
import FeaturedStories from '@/components/FeaturedStories'

export const revalidate = 60

export default async function HomePage() {
  const [products, collections, athletes, stories] = await Promise.all([
    getFeaturedProducts(),
    getFeaturedCollections(),
    getFeaturedAthletes(),
    getFeaturedStories(),
  ])

  return (
    <div>
      <Hero />
      
      {products.length > 0 && (
        <FeaturedProducts products={products as Product[]} />
      )}
      
      {collections.length > 0 && (
        <FeaturedCollections collections={collections as Collection[]} />
      )}
      
      {athletes.length > 0 && (
        <FeaturedAthletes athletes={athletes as Athlete[]} />
      )}
      
      {stories.length > 0 && (
        <FeaturedStories stories={stories as Story[]} />
      )}
    </div>
  )
}