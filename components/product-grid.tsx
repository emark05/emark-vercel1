"use client"

import type { Product, User } from "@/types"
import { Heart } from "lucide-react"
import Image from "next/image"

interface ProductGridProps {
  products: Product[]
  onProductClick: (product: Product) => void
  favorites: string[]
  user: User | null
}

export default function ProductGrid({ products, onProductClick, favorites, user }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          onClick={() => onProductClick(product)}
        >
          <div className="relative h-48 rounded-t-lg overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg?height=300&width=300"}
              alt={product.title}
              fill
              className="object-cover"
            />
            {product.specialOffer48h && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                Oferta 48h
              </div>
            )}
            {user && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <Heart
                  size={20}
                  className={favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}
                />
              </button>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{product.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-[#feb415]">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{product.sellerName}</span>
              <span className="flex items-center gap-1">⭐ {product.rating || 4.5}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
