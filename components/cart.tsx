"use client"

import type { Product } from "@/types"
import { ArrowLeft, Trash2 } from "lucide-react"
import Image from "next/image"

interface CartProps {
  items: Product[]
  onBack: () => void
  onRemoveItem: (productId: string) => void
  onCheckout?: () => void
}

export default function Cart({ items, onBack, onRemoveItem, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0)

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

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Carrito de Compras</h1>

        {items.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Tu carrito está vacío</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg?height=100&width=100"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.name}</h3>
                    <p className="text-[#feb415] font-bold">${item.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 p-2">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Resumen</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal ({items.length} productos)</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Envío</span>
                    <span>Calculado en pago</span>
                  </div>
                  <div className="border-t dark:border-gray-700 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span className="text-[#feb415]">${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full bg-[#feb415] hover:bg-[#e5a313] text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Proceder al Pago
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
