// Sección de misión: presenta los valores y propósito de GreenPomodoro

import { Leaf, HeartHandshake, Globe } from "lucide-react"
import { motion } from "framer-motion"

export default function Mission() {
    return (
        <section className="bg-white py-20 px-4 md:px-6">
            {/* Título y texto principal animados */}
            <motion.div
                className="mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold text-green-800 mb-4">Nuestra Misión</h2>
                <p className="text-gray-600 text-lg mx-auto mb-12 px-10">
                    En GreenPomodoro, creemos que la productividad personal no está reñida con la responsabilidad ambiental.
                    Por eso convertimos tus sesiones de enfoque en pequeñas oportunidades para marcar la diferencia.
                </p>
                {/* Tarjetas con valores */}
                <div className="px-6 grid md:grid-cols-3 gap-6 text-left">
                    {[{
                        icon: <Leaf className="h-6 w-6 text-green-600" />,
                        title: "Enfoque con propósito",
                        description: "Cada sesión de trabajo te ayuda a crecer y también a cuidar el planeta con pequeños retos.",
                        delay: 0,
                    }, {
                        icon: <Globe className="h-6 w-6 text-green-600" />,
                        title: "Pequeños actos, gran cambio",
                        description: "Sumando miles de microacciones sostenibles, podemos construir un futuro más verde.",
                        delay: 0.1,
                    }, {
                        icon: <HeartHandshake className="h-6 w-6 text-green-600" />,
                        title: "Una comunidad con valores",
                        description: "No estás solo. GreenPomodoro une a personas que quieren trabajar mejor y vivir con intención.",
                        delay: 0.2,
                    }].map(({ icon, title, description, delay }) => (
                        <motion.div
                            key={title}
                            className="flex flex-col items-center bg-green-50 p-6 rounded-lg shadow-sm border border-green-100"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay }}
                        >
                            <div className="bg-green-200 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                {icon}
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-green-800 mb-1">{title}</h3>
                                <p className="text-gray-600 text-sm">{description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}