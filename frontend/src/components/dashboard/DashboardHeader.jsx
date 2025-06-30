// Header del dashboard con botón para volver a la landing

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo y título */}
        <div className="flex items-center gap-2">
          <img src="/greenpomodoro.svg" alt="GreenPomodoro Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-green-800">GreenPomodoro</span>
        </div>
        {/* Botón para volver a la landing */}
        <Link to="/">
          <Button variant="outline" size="sm" className="text-black hover:border-gray-600 focus:ring-0 focus:outline-none focus:border-gray-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>
      </div>
    </header>
  )
}