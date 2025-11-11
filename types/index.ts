export interface User {
  id: string
  email: string
  name: string
  role?: string
  isAdmin?: boolean
  documentsVerified?: boolean
  created_at?: string
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  originalPrice?: number
  image?: string
  category: string
  condition?: string
  location?: string
  seller_id?: string
  sellerName?: string
  rating?: number
  featured?: boolean
  specialOffer48h?: boolean
  stock?: number
  serviceType?: string
  created_at?: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  product?: Product
}

export interface Favorite {
  id: string
  user_id: string
  product_id: string
  product?: Product
}

export interface Order {
  id: string
  user_id: string
  total: number
  status: string
  paymentMethod: PaymentMethod
  shippingMethod?: ShippingMethod
  shippingAddress?: Address
  items: OrderItem[]
  created_at: string
}

export interface OrderItem {
  id: string
  product_id: string
  product?: Product
  quantity: number
  price: number
}

export type PaymentMethod = "credit_card" | "bank_transfer" | "pagofacil" | "stripe"

export interface PaymentDetails {
  method: PaymentMethod
  status: "pending" | "completed" | "failed"
  transactionId?: string
  reference?: string
  created_at: string
}

export type ShippingMethod = "correo_argentino" | "andreani" | "oca" | "pickit"

export interface ShippingDetails {
  method: ShippingMethod
  cost: number
  estimatedDays: number
  trackingNumber?: string
}

export interface Address {
  street: string
  city: string
  province: string
  zipCode: string
  country: string
  phone: string
  notes?: string
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  read: boolean
  created_at: string
}
