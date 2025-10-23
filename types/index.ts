export interface User {
  id: string
  email: string
  name: string
  isAdmin?: boolean
  documentsVerified?: boolean
  createdAt?: string
}

export interface Product {
  id: string
  title: string
  description?: string
  price: number
  originalPrice?: number
  image?: string
  category: string
  condition: string
  location?: string
  sellerId?: string
  sellerName: string
  rating?: number
  featured?: boolean
  specialOffer48h?: boolean
  stock?: number
  serviceType?: string
  createdAt?: string
}

export interface CartItem {
  id: string
  userId: string
  productId: string
  quantity: number
  product?: Product
}

export interface Favorite {
  id: string
  userId: string
  productId: string
  product?: Product
}
