import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            ELITE
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="hover:text-gray-600 transition-colors">
              Products
            </Link>
            <Link href="/collections" className="hover:text-gray-600 transition-colors">
              Collections
            </Link>
            <Link href="/athletes" className="hover:text-gray-600 transition-colors">
              Athletes
            </Link>
            <Link href="/stories" className="hover:text-gray-600 transition-colors">
              Stories
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="hover:text-gray-600 transition-colors">
              Search
            </button>
            <button className="hover:text-gray-600 transition-colors">
              Cart (0)
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}