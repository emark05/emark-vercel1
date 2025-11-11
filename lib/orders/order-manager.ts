import type { Order, Product } from "@/types"

// Simulated order storage (in production, use Supabase)
let orders: Order[] = []

export function createOrder(
  userId: string,
  cartItems: Product[],
  paymentMethod: string,
  shippingMethod: string,
  shippingAddress: any,
  total: number,
): Order {
  const order: Order = {
    id: `ORD-${Date.now()}`,
    user_id: userId,
    total,
    status: "confirmed",
    paymentMethod: paymentMethod as any,
    shippingMethod: shippingMethod as any,
    shippingAddress,
    items: cartItems.map((product) => ({
      id: `ITEM-${Date.now()}-${Math.random()}`,
      product_id: product.id,
      product,
      quantity: 1,
      price: product.price,
    })),
    created_at: new Date().toISOString(),
  }

  orders.push(order)
  localStorage.setItem("emark_orders", JSON.stringify(orders))
  return order
}

export function getOrdersByUser(userId: string): Order[] {
  const stored = localStorage.getItem("emark_orders")
  const allOrders = stored ? JSON.parse(stored) : []
  return allOrders.filter((order: Order) => order.user_id === userId)
}

export function getOrder(orderId: string): Order | undefined {
  const stored = localStorage.getItem("emark_orders")
  const allOrders = stored ? JSON.parse(stored) : []
  return allOrders.find((order: Order) => order.id === orderId)
}

export function updateOrderStatus(orderId: string, status: string): Order | undefined {
  const stored = localStorage.getItem("emark_orders")
  const allOrders = stored ? JSON.parse(stored) : []

  const order = allOrders.find((o: Order) => o.id === orderId)
  if (order) {
    order.status = status
    localStorage.setItem("emark_orders", JSON.stringify(allOrders))
  }

  return order
}

export function loadOrdersFromStorage(): void {
  const stored = localStorage.getItem("emark_orders")
  if (stored) {
    orders = JSON.parse(stored)
  }
}
