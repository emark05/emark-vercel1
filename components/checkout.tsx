"use client"

import { useState } from "react"
import { ArrowLeft, Check } from "lucide-react"
import type { Product, Address, PaymentMethod, ShippingMethod, User } from "@/types"
import PaymentSelector from "./payment-selector"
import ShippingSelector from "./shipping-selector"
import { calculatePaymentFee, getShippingCost } from "@/lib/payments/payment-methods"
import { createOrder } from "@/lib/orders/order-manager"

interface CheckoutProps {
  cartItems: Product[]
  user: User | null
  onBack: () => void
  onCompleteOrder: (orderData: any) => void
}

export default function Checkout({ cartItems, user, onBack, onCompleteOrder }: CheckoutProps) {
  const [currentStep, setCurrentStep] = useState<"review" | "shipping" | "payment" | "confirmation">("review")
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("credit_card")
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod | null>(null)
  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    province: "",
    zipCode: "",
    country: "Argentina",
    phone: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [completedOrder, setCompletedOrder] = useState<any>(null)

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const paymentFee = calculatePaymentFee(subtotal, selectedPayment)
  const shippingCost = selectedShipping ? getShippingCost(selectedShipping) : 0
  const total = subtotal + paymentFee + shippingCost

  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }))
  }

  const handleCompleteOrder = async () => {
    if (!selectedShipping) {
      alert("Por favor selecciona un método de envío")
      return
    }

    setIsProcessing(true)
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const order = user ? createOrder(user.id, cartItems, selectedPayment, selectedShipping, address, total) : null

      const orderData = {
        orderId: order?.id || `ORD-${Date.now()}`,
        items: cartItems,
        paymentMethod: selectedPayment,
        shippingMethod: selectedShipping,
        address,
        subtotal,
        paymentFee,
        shippingCost,
        total,
        status: "confirmed",
      }

      setCompletedOrder(orderData)
      setCurrentStep("confirmation")
      onCompleteOrder(orderData)
    } catch (error) {
      console.error("Error processing order:", error)
      alert("Error al procesar la orden")
    } finally {
      setIsProcessing(false)
    }
  }

  const steps = ["review", "shipping", "payment", "confirmation"] as const

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-8">
      <div className="container mx-auto px-4">
        <button onClick={onBack} className="flex items-center gap-2 text-[#feb415] hover:text-[#e5a313] mb-6">
          <ArrowLeft size={20} />
          Volver al carrito
        </button>

        {/* Progress Steps */}
        <div className="flex gap-4 mb-8 justify-between max-w-2xl">
          {steps.map((step, idx) => (
            <div key={step} className="flex-1">
              <div
                className={`flex items-center justify-center h-10 rounded-full font-semibold ${
                  currentStep === step
                    ? "bg-[#feb415] text-white"
                    : steps.indexOf(currentStep) > idx
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {steps.indexOf(currentStep) > idx ? <Check size={20} /> : idx + 1}
              </div>
              <p className="text-xs text-center mt-1 text-gray-600 dark:text-gray-400">
                {step === "review"
                  ? "Resumen"
                  : step === "shipping"
                    ? "Envío"
                    : step === "payment"
                      ? "Pago"
                      : "Confirmación"}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Review Step */}
            {currentStep === "review" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Resumen del Pedido</h2>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b dark:border-gray-700">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white">${item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentStep("shipping")}
                  className="w-full bg-[#feb415] hover:bg-[#e5a313] text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Continuar
                </button>
              </div>
            )}

            {/* Shipping Step */}
            {currentStep === "shipping" && (
              <div className="space-y-6">
                <ShippingSelector selectedMethod={selectedShipping} onMethodChange={setSelectedShipping} />

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Dirección de Envío</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Calle y número"
                      value={address.street}
                      onChange={(e) => handleAddressChange("street", e.target.value)}
                      className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Ciudad"
                        value={address.city}
                        onChange={(e) => handleAddressChange("city", e.target.value)}
                        className="px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="Provincia"
                        value={address.province}
                        onChange={(e) => handleAddressChange("province", e.target.value)}
                        className="px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Código Postal"
                        value={address.zipCode}
                        onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                        className="px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="tel"
                        placeholder="Teléfono"
                        value={address.phone}
                        onChange={(e) => handleAddressChange("phone", e.target.value)}
                        className="px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep("payment")}
                  className="w-full bg-[#feb415] hover:bg-[#e5a313] text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Continuar al Pago
                </button>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === "payment" && (
              <div>
                <PaymentSelector selectedMethod={selectedPayment} onMethodChange={setSelectedPayment} total={total} />
                <button
                  onClick={handleCompleteOrder}
                  disabled={isProcessing}
                  className="w-full mt-6 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {isProcessing ? "Procesando..." : `Confirmar Compra - $${total.toLocaleString()}`}
                </button>
              </div>
            )}

            {/* Confirmation Step */}
            {currentStep === "confirmation" && completedOrder && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg shadow-md p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <Check size={32} className="text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">¡Orden Confirmada!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Tu número de orden es:{" "}
                  <strong className="text-green-600 dark:text-green-400">{completedOrder.orderId}</strong>
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Te hemos enviado un email con los detalles de tu compra.
                </p>
                <button
                  onClick={onBack}
                  className="inline-block bg-[#feb415] hover:bg-[#e5a313] text-white font-semibold py-2 px-8 rounded-lg transition-colors"
                >
                  Volver a Inicio
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-fit sticky top-24">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Resumen</h3>
            <div className="space-y-3 mb-4 pb-4 border-b dark:border-gray-700">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              {paymentFee > 0 && (
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Comisión de pago:</span>
                  <span>${paymentFee.toLocaleString()}</span>
                </div>
              )}
              {shippingCost > 0 && (
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Envío:</span>
                  <span>${shippingCost.toLocaleString()}</span>
                </div>
              )}
            </div>
            <div className="flex justify-between text-2xl font-bold text-[#feb415]">
              <span>Total:</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
