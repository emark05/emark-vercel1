import HomePage from "@/components/home-page"

const mockProducts = [
  {
    id: "1",
    name: "iPhone 14 Pro",
    description: "Smartphone Apple última generación",
    price: 999.99,
    image: "/iphone-14-pro.png",
    category: "electronics",
    stock: 50,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Samsung Galaxy S23",
    description: "Smartphone Android premium",
    price: 899.99,
    image: "/samsung-galaxy-s23.png",
    category: "electronics",
    stock: 30,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "MacBook Pro 16",
    description: "Laptop profesional Apple",
    price: 2499.99,
    image: "/macbook-pro-16.png",
    category: "electronics",
    stock: 20,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Nike Air Max",
    description: "Zapatillas deportivas",
    price: 129.99,
    image: "/classic-nike-air-max.png",
    category: "fashion",
    stock: 100,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Sony WH-1000XM5",
    description: "Audífonos con cancelación de ruido",
    price: 399.99,
    image: "/sony-headphones.png",
    category: "electronics",
    stock: 45,
    created_at: new Date().toISOString(),
  },
]

export default function Page() {
  return <HomePage initialProducts={mockProducts} />
}
