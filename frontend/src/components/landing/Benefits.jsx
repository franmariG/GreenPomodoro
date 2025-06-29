import { Card, CardContent } from "@/components/ui/card"
import { Brain, Sprout, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export default function Benefits() {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  }

  return (
    <section className="bg-gradient-to-b from-white to-green-200 py-16 px-6">
      <div className="w-full px-4">
        <motion.h2
          className="text-3xl font-bold text-center text-gray-900 mb-4 "
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ¿Por qué elegir GreenPomodoro?
        </motion.h2>
        <motion.p
                className="text-lg text-gray-600 text-center mb-12 px-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                GreenPomodoro va más allá de la gestión del tiempo. Es una herramienta diseñada para transformar tu enfoque diario, impulsando tu concentración mientras cultivas un impacto positivo en el planeta.
              </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {[{
            Icon: Brain,
            title: "Organiza y Enfócate",
            desc: "Organiza tus tareas y enfócate con la técnica Pomodoro probada científicamente.",
          }, {
            Icon: Sprout,
            title: "Micro-retos Ecológicos",
            desc: "Recibe micro-retos ecológicos para tus descansos y contribuye al planeta.",
          }, {
            Icon: TrendingUp,
            title: "Visualiza tu Progreso",
            desc: "Visualiza tu progreso y desarrolla hábitos positivos día a día.",
          }].map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true }}
            >
              <Card className="text-center border-green-200">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-600">{desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
