// app/products/[slug]/page.tsx
import { getProductBySlug, getProducts } from '@/lib/cosmic'
import { Product } from '@/types'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

export const revalidate = 60

export async function generateStaticParams() {
  const products = await getProducts()
  
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug) as Product | null

  if (!product) {
    notFound()
  }

  const colors = product.metadata.available_colors?.split('\n').filter(Boolean) || []
  const sizes = product.metadata.available_sizes?.split('\n').filter(Boolean) || []
  const images = product.metadata.product_images || []

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {images.length > 0 ? (
            <>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={`${images[0].imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                        alt={`${product.title} - View ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            {product.metadata.category && (
              <Link 
                href={`/categories/${product.metadata.category.slug}`}
                className="text-sm text-gray-600 hover:text-gray-900 mb-2 inline-block"
              >
                {product.metadata.category.metadata.category_name}
              </Link>
            )}
            <h1 className="text-4xl font-bold mb-2">{product.metadata.product_name}</h1>
            <p className="text-3xl font-semibold">{product.metadata.price}</p>
          </div>

          <div className="prose max-w-none">
            <ReactMarkdown>{product.metadata.description}</ReactMarkdown>
          </div>

          {colors.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Available Colors</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-900 transition-colors cursor-pointer"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {sizes.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Available Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-900 transition-colors cursor-pointer"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-6">
            <button className="btn-primary w-full">
              Add to Cart
            </button>
          </div>

          {product.metadata.collection && (
            <div className="pt-6 border-t">
              <p className="text-sm text-gray-600 mb-2">Part of Collection</p>
              <Link 
                href={`/collections/${product.metadata.collection.slug}`}
                className="font-semibold hover:underline"
              >
                {product.metadata.collection.metadata.collection_name}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}