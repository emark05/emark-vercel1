"use client"

import type { Product, User } from "@/types"
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react"
import Image from "next/image"

interface ProductDetailProps {
  product: Product
  onBack: () => void
  onAddToCart: (product: Product) => void
  user: User | null
}

export default function ProductDetail({ product, onBack, onAddToCart, user }: ProductDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-[#feb415] mb-6"
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg?height=600&width=600"}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.title}</h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-[#feb415]">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Vendedor:</span>
                  <span className="text-gray-600 dark:text-gray-400">{product.sellerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Ubicación:</span>
                  <span className="text-gray-600 dark:text-gray-400">{product.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Condición:</span>
                  <span className="text-gray-600 dark:text-gray-400 capitalize">{product.condition}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Calificación:</span>
                  <span className="text-gray-600 dark:text-gray-400">⭐ {product.rating || 4.5}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => onAddToCart(product)}
                  className="flex-1 bg-[#feb415] hover:bg-[#e5a313] text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Agregar al Carrito
                </button>
                {user && (
                  <button className="p-3 border-2 border-[#feb415] text-[#feb415] rounded-lg hover:bg-[#feb415] hover:text-white transition-colors">
                    <Heart size={24} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
