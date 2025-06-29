import { X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function ActiveTimerCard({ session, timeLeft, onCancel }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const totalTime = session?.duration ? session.duration * 60 : 1
  const progress = Math.max(0, timeLeft / totalTime)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-green-200 bg-white">
        <CardContent className="text-center py-8">
          <div className="space-y-4 flex flex-col items-center justify-center">
            {/* SVG reloj animado */}
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-green-200"
                  fill="none"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="none"
                  className="text-green-600"
                  strokeLinecap="round"
                  strokeDasharray="282.74"
                  strokeDashoffset="282.74"
                  animate={{
                    strokeDashoffset: 282.74 * (1 - progress),
                  }}
                  transition={{
                    duration: 1,
                    ease: "linear",
                  }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm text-green-700 font-semibold">
                En progreso
              </span>
            </div>

            {/* Tiempo y tarea */}
            <div className="text-6xl font-mono text-black-600">{formatTime(timeLeft)}</div>
            <div className="text-lg text-gray-800">{session?.task}</div>

            {/* Botón cancelar */}
            <Button
              variant="outline"
              onClick={onCancel}
              className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent hover:border-red-600 focus:ring-0 focus:outline-none focus:border-red-600"
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}