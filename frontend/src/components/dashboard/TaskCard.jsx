import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Edit, Play, Trash2 } from "lucide-react"

export default function TaskCard({ task, onStart, onDelete, onEdit }) {
  return (
    <Card className={task.status === "completed" ? "bg-green-50 border-green-200" : ""}>
      <CardContent className="flex flex-wrap items-center justify-between p-4 gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-3 h-3 rounded-full ${
              task.status === "completed" ? "bg-green-500" : "bg-gray-300"
            }`}
          />
          <div>
            <h3
              className={`font-medium ${task.status === "completed" ? "text-green-800" : "text-gray-900"}`}
            >
              {task.task}
            </h3>
            <p className="text-sm text-gray-600">{task.duration} minutos</p>
          </div>
        </div>

        <div className="flex flex-1 items-center w-full flex-wrap gap-2 justify-end">
          <Badge variant={task.status === "completed" ? "default" : "secondary"}>
            {task.status === "completed" ? (
              <>
                <CheckCircle className="mr-1 h-3 w-3" />
                Completada
              </>
            ) : (
              <>
                <Clock className="mr-1 h-3 w-3" />
                Pendiente
              </>
            )}
          </Badge>

          <div className="flex gap-1 items-center self-center">
            {task.status === "pending" && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(task)}
                  className="hover:border-gray-600 focus:ring-0 focus:outline-none focus:border-gray-600"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => onStart(task)}
                  className="bg-green-600 hover:bg-green-700 focus:ring-0 focus:outline-none focus:border-green-700 hover:border-green-700 border-transparent"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(task._id)}
              className="text-red-600 hover:bg-red-50 hover:border-red-600 focus:ring-0 focus:outline-none focus:border-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}