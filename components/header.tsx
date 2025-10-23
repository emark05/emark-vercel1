"use client"

import { useState } from "react"
import type { User } from "@/types"
import { Menu, X, ShoppingCart, UserIcon, Heart, Bell, Sun, Moon } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  user: User | null
  cartCount: number
  favoritesCount: number
  darkMode: boolean
  onToggleDarkMode: () => void
  onLoginClick: () => void
  onCartClick: () => void
  onHomeClick: () => void
  onDashboardClick: () => void
  onLogout: () => void
}

export default function Header({
  user,
  cartCount,
  favoritesCount,
  darkMode,
  onToggleDarkMode,
  onLoginClick,
  onCartClick,
  onHomeClick,
  onDashboardClick,
  onLogout,
}: HeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={onHomeClick}>
            <div className="relative h-12 w-20">
              <Image
                src="https://app.trickle.so/storage/public/images/usr_12f5289e00000001/34dd0ede-fe9b-4b23-a74b-11b3f0b1b151.png"
                alt="E-Mark"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <button
            className="md:hidden p-2 text-gray-600 dark:text-gray-300"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={onHomeClick}
              className="text-gray-600 dark:text-gray-300 hover:text-[#feb415] transition-colors"
            >
              Inicio
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-[#feb415] transition-colors">
              Categorías
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-[#feb415] transition-colors">Vender</button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-[#feb415] transition-colors">Ayuda</button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#feb415] transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-[#feb415] transition-colors">
              <Bell size={20} />
            </button>

            <button
              onClick={onDashboardClick}
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-[#feb415] transition-colors"
            >
              <Heart size={20} className={favoritesCount > 0 ? "fill-red-500 text-red-500" : ""} />
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-[#feb415] transition-colors"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onDashboardClick}
                  className="text-gray-600 dark:text-gray-300 hover:text-[#feb415] transition-colors"
                >
                  <UserIcon size={20} />
                </button>
                <span className="text-gray-600 dark:text-gray-300 text-sm">Hola, {user.name}</span>
                <button
                  onClick={onLogout}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-[#feb415] hover:bg-[#e5a313] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Entrar
              </button>
            )}
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <button onClick={onCartClick} className="relative p-2">
              <ShoppingCart size={20} className="text-gray-600 dark:text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <button onClick={onDashboardClick} className="p-2">
                <UserIcon size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-[#feb415] hover:bg-[#e5a313] text-white font-semibold text-xs px-3 py-1.5 rounded-lg"
              >
                Entrar
              </button>
            )}
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-4">
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  onHomeClick()
                  setShowMobileMenu(false)
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-[#feb415] transition-colors text-left px-4 py-2"
              >
                Inicio
              </button>
              <button className="text-gray-600 dark:text-gray-300 hover:text-[#feb415] transition-colors text-left px-4 py-2">
                Categorías
              </button>
              <button className="text-gray-600 dark:text-gray-300 hover:text-[#feb415] transition-colors text-left px-4 py-2">
                Vender
              </button>
              <button className="text-gray-600 dark:text-gray-300 hover:text-[#feb415] transition-colors text-left px-4 py-2">
                Ayuda
              </button>

              {user && (
                <button
                  onClick={() => {
                    onLogout()
                    setShowMobileMenu(false)
                  }}
                  className="text-red-600 hover:text-red-700 text-left px-4 py-2 font-medium"
                >
                  Cerrar Sesión
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
