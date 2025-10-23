"use client"

interface CategoryNavProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

const categories = [
  { id: "todos", name: "Todos", icon: "🏪" },
  { id: "electronica", name: "Electrónica", icon: "💻" },
  { id: "ropa", name: "Ropa", icon: "👕" },
  { id: "hogar", name: "Hogar", icon: "🏠" },
  { id: "deportes", name: "Deportes", icon: "⚽" },
  { id: "libros", name: "Libros", icon: "📚" },
  { id: "vehiculos", name: "Vehículos", icon: "🚗" },
  { id: "juguetes", name: "Juguetes", icon: "🎮" },
  { id: "servicios", name: "Servicios", icon: "🛠️" },
]

export default function CategoryNav({ selectedCategory, setSelectedCategory }: CategoryNavProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 py-3">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#feb415] text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
