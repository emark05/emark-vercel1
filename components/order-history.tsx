"use client"

import { useState } from "react"
import { ArrowLeft, Package, Clock, CheckCircle, XCircle } from "lucide-react"
import type { Order } from "@/types"

interface OrderHistoryProps {
  orders: Order[]
  onBack: () => void
}

export default function OrderHistory({ orders, onBack }: OrderHistoryProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="text-green-500" size={20} />
      case "processing":
        return <Clock className="text-yellow-500" size={20} />
      case "shipped":
        return <Package className="text-blue-500" size={20} />
      case "cancelled":
        return <XCircle className="text-red-500" size={20} />
      default:
        return <Clock className="text-gray-500" size={20} />
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      confirmed: "Confirmado",
      processing: "En procesamiento",
      shipped: "Enviado",
      delivered: "Entregado",
      cancelled: "Cancelado",
    }
    return labels[status] || status
  }

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <button
            onClick={() => setSelectedOrder(null)}
            className="flex items-center gap-2 text-[#feb415] hover:text-[#e5a313] mb-6"
          >
            <ArrowLeft size={20} />
            Volver a mis órdenes
          </button>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Orden #{selectedOrder.id}</h2>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-6 pb-6 border-b dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Estado</p>
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusIcon(selectedOrder.status)}
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {getStatusLabel(selectedOrder.status)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                  <p className="text-3xl font-bold text-[#feb415]">${selectedOrder.total.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">Artículos</h3>
                {selectedOrder.items?.map((item) => (
                  <div key={item.id} className="flex justify-between items-center pb-4 border-b dark:border-gray-700">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.product?.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white">${item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Método de pago:</span>
                  <span className="text-gray-900 dark:text-white capitalize">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Método de envío:</span>
                  <span className="text-gray-900 dark:text-white capitalize">{selectedOrder.shippingMethod}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Fecha:</span>
                  <span className="text-gray-900 dark:text-white">
                    {new Date(selectedOrder.created_at).toLocaleDateString("es-AR")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <button onClick={onBack} className="flex items-center gap-2 text-[#feb415] hover:text-[#e5a313] mb-6">
          <ArrowLeft size={20} />
          Volver
        </button>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Mis Órdenes</h1>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">No tienes órdenes aún</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Orden #{order.id}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(order.created_at).toLocaleDateString("es-AR")}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.items?.length || 0} artículo{order.items?.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#feb415]">${order.total.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{getStatusLabel(order.status)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
