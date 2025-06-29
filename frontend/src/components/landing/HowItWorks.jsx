import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Timer, BicepsFlexed, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    title: "1. Planifica tu sesión",
    icon: <Timer className="h-8 w-8 text-indigo-600" />,
    bg: "bg-indigo-100",
    text: "Elige una tarea y define el tiempo. Usa Pomodoro para enfocarte sin distracciones.",
  },
  {
    title: "2. Trabaja con enfoque",
    icon: <BicepsFlexed className="h-8 w-8 text-red-600" />,
    bg: "bg-red-100",
    text: "Concéntrate y cumple tu sesión sin interrupciones. Cada bloque suma a tu progreso.",
  },
  {
    title: "3. Recibe un reto ecológico",
    icon: <Lightbulb className="h-8 w-8 text-yellow-600" />,
    bg: "bg-yellow-100",
    text: "Al finalizar, nuestra IA te da un micro-reto verde. Pequeñas acciones, gran impacto.",
  },
]

export default function HowItWorksSteps() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef(null)

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % steps.length)
    resetInterval()
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + steps.length) % steps.length)
    resetInterval()
  }


  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % steps.length)
    }, 5000)
  }

  const resetInterval = () => {
    clearInterval(intervalRef.current)
    startInterval()
  }


  useEffect(() => {
    startInterval()
    return () => clearInterval(intervalRef.current)
  }, [])


  return (
    <section className="px-6 bg-gradient-to-b from-green-200 via-green-50 to-white py-16">
      <div className="w-full px-4 md:px-6 text-center mb-12">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ¿Cómo funciona?
        </motion.h2>
        <motion.p
          className="text-gray-600 text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Tres simples pasos para convertir tu trabajo en impacto positivo.
        </motion.p>
      </div>

      {/* Carrusel de tarjetas */}
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-6">
        <button
          onClick={goToPrev}
          className="bg-green-600 text-white p-2 rounded-full shadow-lg opacity-75 hover:opacity-100 transition-opacity flex-shrink-0"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="w-full h-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-xl">
                <CardContent className="p-10 space-y-6 text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${steps[currentIndex].bg}`}>
                    {steps[currentIndex].icon}
                  </div>
                  <h3 className="text-2xl font-semibold">
                    {steps[currentIndex].title}
                  </h3>
                  <p className="text-gray-600 text-lg">{steps[currentIndex].text}</p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={goToNext}
          className="bg-green-600 text-white p-2 rounded-full shadow-lg opacity-75 hover:opacity-100 transition-opacity flex-shrink-0"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Puntos de navegación */}
      <div className="flex justify-center mt-4 space-x-2">
        {steps.map((_, i) => (
          <div
            key={i}
            onClick={() => {
              setCurrentIndex(i)
              resetInterval()
            }}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
              currentIndex === i ? "bg-green-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  )
}