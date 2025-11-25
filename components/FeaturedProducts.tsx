import { Product } from '@/types'
import ProductCard from './ProductCard'

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
        <p className="text-gray-600 text-lg">Discover our most popular athletic gear</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}