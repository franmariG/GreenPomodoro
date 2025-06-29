import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className=" px-4 py-16 md:px-6 md:py-24 text-center space-y-8">
      <div className="space-y-12">
        <motion.h1
          className="max-w-3xl mx-auto text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Convierte tu Productividad en un{" "}
          <span className="text-green-600">Impacto Positivo</span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Trabaja, enfócate y haz el bien. Un Pomodoro a la vez.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link to="/dashboard">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6 focus:ring-0 focus:outline-none focus:border-green-700 hover:border-green-700 border-transparent"
            >
              <img
                src="/greenpomodoro.svg"
                alt="GreenPomodoro Logo"
                className="h-5 w-5"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              Empieza tu primer GreenPomodoro
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}