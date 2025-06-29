import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"
import TaskCard from "./TaskCard"

export default function TaskList({ tasks, filter, onStart, onDelete, onEdit }) {
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

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onStart={onStart}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}