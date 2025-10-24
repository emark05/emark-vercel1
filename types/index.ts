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
  created_at: string
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  read: boolean
  created_at: string
}
