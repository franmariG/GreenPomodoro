// Sección que presenta el problema del usuario y cómo GreenPomodoro lo soluciona

import { Card, CardContent } from "@/components/ui/card"
import { CircleX, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function ProblemSolution() {
  return (
    <section className="bg-white py-16 px-6">
      {/* Título y descripción animados */}
      <motion.h2
        className="text-3xl font-bold text-center text-gray-900 mb-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Tu Desafío, Nuestra Solución
      </motion.h2>
      <motion.p
        className="text-lg text-gray-600 text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Integramos dos necesidades reales: Productividad + Sostenibilidad
      </motion.p>
      <div className="w-full px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Tarjeta del Problema */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-8 flex gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CircleX className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-800 mb-3">Problema</h3>
                <p className="text-red-700">
                  Es difícil mantener la concentración en tareas importantes y, al mismo tiempo, encontrar tiempo para cuidar el planeta.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        {/* Tarjeta de la Solución */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8 flex gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-3">Solución</h3>
                <p className="text-green-700">
                  GreenPomodoro convierte tus sesiones de trabajo en oportunidades para actuar por el medio ambiente.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}