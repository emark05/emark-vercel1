"use client"

import type { User } from "@/types"
import { ArrowLeft, Package, Heart, MessageSquare, Settings } from "lucide-react"

interface UserDashboardProps {
  user: User
  onBack: () => void
}

export default function UserDashboard({ user, onBack }: UserDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-[#feb415] mb-6"
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Hola, {user.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Package className="text-[#feb415] mb-4" size={32} />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mis Productos</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Gestiona tus publicaciones</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Heart className="text-[#feb415] mb-4" size={32} />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Favoritos</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Productos guardados</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <MessageSquare className="text-[#feb415] mb-4" size={32} />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mensajes</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Chats con vendedores</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Settings className="text-[#feb415] mb-4" size={32} />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Configuración</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Ajustes de cuenta</p>
          </div>
        </div>
      </div>
    </div>
  )
}
