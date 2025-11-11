"use client"

import { PAYMENT_METHODS } from "@/lib/payments/payment-methods"
import type { PaymentMethod } from "@/types"

interface PaymentSelectorProps {
  selectedMethod: PaymentMethod
  onMethodChange: (method: PaymentMethod) => void
  total: number
}

export default function PaymentSelector({ selectedMethod, onMethodChange, total }: PaymentSelectorProps) {
  const methods = Object.values(PAYMENT_METHODS)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Método de Pago</h3>

      <div className="space-y-3">
        {methods.map((method) => (
          <label
            key={method.id}
            className="flex items-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-[#feb415] transition-colors"
            style={{
              borderColor: selectedMethod === method.id ? "#feb415" : undefined,
              backgroundColor: selectedMethod === method.id ? "#feb41514" : undefined,
            }}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => onMethodChange(method.id as PaymentMethod)}
              className="w-4 h-4"
            />
            <div className="ml-4 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{method.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{method.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{method.description}</p>
                </div>
              </div>
            </div>
            {method.fee > 0 && (
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                +{(method.fee * 100).toFixed(1)}%
              </span>
            )}
          </label>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Info:</strong> Todos los métodos de pago son seguros y encriptados.
        </p>
      </div>
    </div>
  )
}
