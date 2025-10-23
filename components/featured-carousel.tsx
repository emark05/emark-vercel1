"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/types"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface FeaturedCarouselProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

export default function FeaturedCarousel({ products, onProductClick }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [products.length])

  if (products.length === 0) return null

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const currentProduct = products[currentIndex]

  return (
    <div className="relative bg-gradient-to-r from-[#feb415] to-[#ffd700] py-12">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center gap-8 cursor-pointer" onClick={() => onProductClick(currentProduct)}>
            <div className="relative w-1/2 h-80 rounded-lg overflow-hidden">
              <Image
                src={currentProduct.image || "/placeholder.svg?height=400&width=400"}
                alt={currentProduct.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="w-1/2 text-white">
              <h2 className="text-4xl font-bold mb-4">{currentProduct.title}</h2>
              <p className="text-xl mb-6">{currentProduct.description}</p>
              <div className="text-3xl font-bold mb-4">${currentProduct.price.toLocaleString()}</div>
              <button className="bg-white text-[#feb415] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Ver Producto
              </button>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
