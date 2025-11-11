"use client"

import { useState, useEffect } from "react"
import type { Product, User } from "@/types"
import Header from "./header"
import SearchBar from "./search-bar"
import CategoryNav from "./category-nav"
import FeaturedCarousel from "./featured-carousel"
import ProductGrid from "./product-grid"
import Footer from "./footer"
import LoginModal from "./login-modal"
import ProductDetail from "./product-detail"
import Cart from "./cart"
import UserDashboard from "./user-dashboard"
import Checkout from "./checkout"

interface HomePageProps {
  initialProducts: Product[]
}

export default function HomePage({ initialProducts }: HomePageProps) {
  const [currentPage, setCurrentPage] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [products, setProducts] = useState<Product[]>(initialProducts || [])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [cart, setCart] = useState<Product[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("emark_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }

      const savedDarkMode = localStorage.getItem("emark_darkmode")
      if (savedDarkMode) {
        const isDark = JSON.parse(savedDarkMode)
        setDarkMode(isDark)
        document.documentElement.classList.toggle("dark", isDark)
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }, [])

  const filteredProducts = products.filter((product) => {
    try {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    } catch (error) {
      console.error("Error filtering product:", error)
      return false
    }
  })

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    document.documentElement.classList.toggle("dark", newDarkMode)
    localStorage.setItem("emark_darkmode", JSON.stringify(newDarkMode))
  }

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product])
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const renderPage = () => {
    switch (currentPage) {
      case "product":
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentPage("home")}
            onAddToCart={addToCart}
            user={user}
          />
        ) : null
      case "cart":
        return (
          <Cart
            items={cart}
            onBack={() => setCurrentPage("home")}
            onRemoveItem={removeFromCart}
            onCheckout={() => setCurrentPage("checkout")}
          />
        )
      case "checkout":
        return cart.length > 0 ? (
          <Checkout
            cartItems={cart}
            user={user}
            onBack={() => setCurrentPage("cart")}
            onCompleteOrder={(orderData) => {
              console.log("Order completed:", orderData)
              setCart([])
              setCurrentPage("home")
            }}
          />
        ) : null
      case "dashboard":
        return user ? <UserDashboard user={user} onBack={() => setCurrentPage("home")} /> : null
      default:
        return (
          <>
            <CategoryNav selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <FeaturedCarousel
              products={products.slice(0, 5)}
              onProductClick={(product) => {
                setSelectedProduct(product)
                setCurrentPage("product")
              }}
            />
            <main className="container mx-auto px-4 py-8">
              <ProductGrid
                products={filteredProducts}
                onProductClick={(product) => {
                  setSelectedProduct(product)
                  setCurrentPage("product")
                }}
                favorites={favorites}
                user={user}
              />
            </main>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header
        user={user}
        cartCount={cart.length}
        favoritesCount={favorites.length}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onLoginClick={() => setShowLoginModal(true)}
        onCartClick={() => setCurrentPage("cart")}
        onHomeClick={() => setCurrentPage("home")}
        onDashboardClick={() => setCurrentPage("dashboard")}
        onLogout={() => {
          setUser(null)
          localStorage.removeItem("emark_user")
        }}
      />

      <div className="pt-16">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={() => setCurrentPage("home")} />

        {renderPage()}
      </div>

      <Footer />

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={(userData) => {
            setUser(userData)
            localStorage.setItem("emark_user", JSON.stringify(userData))
            setShowLoginModal(false)
          }}
        />
      )}
    </div>
  )
}
