import { Product } from '@/types'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.metadata.product_images?.[0]

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
        {image ? (
          <img
            src={`${image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={product.metadata.product_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-400">No image</p>
          </div>
        )}
      </div>
      <div>
        {product.metadata.category && (
          <p className="text-sm text-gray-600 mb-1">
            {product.metadata.category.metadata.category_name}
          </p>
        )}
        <h3 className="font-semibold mb-1 group-hover:underline">
          {product.metadata.product_name}
        </h3>
        <p className="text-gray-900 font-semibold">{product.metadata.price}</p>
        {product.metadata.new_arrival && (
          <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
            New Arrival
          </span>
        )}
      </div>
    </Link>
  )
}