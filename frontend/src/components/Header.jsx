// Componente del Header fijo con logo y botón de navegación al dashboard

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo y nombre de la app */}
        <div className="flex items-center gap-2">
          <img src="/greenpomodoro.svg" alt="GreenPomodoro Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-green-800">GreenPomodoro</span>
        </div>
        {/* Botón para ir al dashboard */}
        <Link to="/dashboard">
          <Button className="bg-green-600 hover:bg-green-700 focus:ring-0 focus:outline-none focus:border-green-700 hover:border-green-700 border-transparent">
            Empezar
          </Button>
        </Link>
      </div>
    </header>
  )
}