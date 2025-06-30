// Lista de tareas Pomodoro filtradas (todas, pendientes o completadas)
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"
import TaskCard from "./TaskCard"
import { AnimatePresence, motion } from "framer-motion"

export default function TaskList({ tasks, filter, onStart, onDelete, onEdit }) {
  // Si no hay tareas, mostrar mensaje según filtro
  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {filter === "all"
              ? "No hay tareas. ¡Agrega tu primera sesión Pomodoro!"
              : `No hay tareas ${filter === "pending" ? "pendientes" : "completadas"}.`}
          </p>
        </CardContent>
      </Card>
    )
  }
  // Muestra la lista con animaciones
  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
          >
            <TaskCard
              task={task}
              onStart={onStart}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}