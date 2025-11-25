import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-[600px] bg-gray-900 flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1556906781-9a412961c28c?w=2400&h=1200&fit=crop&auto=format)'
        }}
      />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Performance Meets Style
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Discover premium athletic gear designed for champions
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="btn-primary">
            Shop Now
          </Link>
          <Link href="/collections" className="btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-gray-900">
            View Collections
          </Link>
        </div>
      </div>
    </section>
  )
}