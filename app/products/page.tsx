import { getProducts, getCategories } from '@/lib/cosmic'
import { Product, Category } from '@/types'
import ProductGrid from '@/components/ProductGrid'
import CategoryFilter from '@/components/CategoryFilter'

export const revalidate = 60

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600">Browse our complete collection of premium athletic gear</p>
      </div>
      
      <CategoryFilter categories={categories as Category[]} />
      
      {products.length > 0 ? (
        <ProductGrid products={products as Product[]} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products available</p>
        </div>
      )}
    </div>
  )
}