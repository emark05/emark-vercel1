"use client"

import { SHIPPING_PROVIDERS } from "@/lib/payments/payment-methods"
import type { ShippingMethod } from "@/types"

interface ShippingSelectorProps {
  selectedMethod: ShippingMethod | null
  onMethodChange: (method: ShippingMethod) => void
}

export default function ShippingSelector({ selectedMethod, onMethodChange }: ShippingSelectorProps) {
  const providers = Object.values(SHIPPING_PROVIDERS)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Método de Envío</h3>

      <div className="space-y-3">
        {providers.map((provider) => (
          <label
            key={provider.id}
            className="flex items-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-[#feb415] transition-colors"
            style={{
              borderColor: selectedMethod === provider.id ? "#feb415" : undefined,
              backgroundColor: selectedMethod === provider.id ? "#feb41514" : undefined,
            }}
          >
            <input
              type="radio"
              name="shipping"
              value={provider.id}
              checked={selectedMethod === provider.id}
              onChange={() => onMethodChange(provider.id as ShippingMethod)}
              className="w-4 h-4"
            />
            <div className="ml-4 flex-1">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{provider.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Entrega estimada: {provider.estimatedDays} día{provider.estimatedDays > 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900 dark:text-white">${provider.baseCost.toLocaleString()}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <p className="text-sm text-green-800 dark:text-green-300">
          <strong>Envío:</strong> El costo final se calculará según el peso y destino.
        </p>
      </div>
    </div>
  )
}
