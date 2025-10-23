"use client"

import { Search } from "lucide-react"

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  onSearch: () => void
}

export default function SearchBar({ searchQuery, setSearchQuery, onSearch }: SearchBarProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 py-4">
      <div className="container mx-auto px-4">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Buscar productos, marcas y más..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#feb415] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <button
            onClick={onSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#feb415] hover:bg-[#e5a313] text-white px-6 py-2 rounded-lg transition-colors"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  )
}
