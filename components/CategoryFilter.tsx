'use client'

import { Category } from '@/types'
import Link from 'next/link'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3">
        <Link 
          href="/products"
          className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-900 transition-colors"
        >
          All Products
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-900 transition-colors"
          >
            {category.metadata.category_name}
          </Link>
        ))}
      </div>
    </div>
  )
}