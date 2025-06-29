import { useState } from "react"
import { Plus } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AddSessionForm({ onAdd }) {
  const [task, setTask] = useState("")
  const [duration, setDuration] = useState(25)

  const handleAdd = () => {
    if (task.trim()) {
      onAdd({ task: task.trim(), duration })
      setTask("")
      setDuration(25)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-green-600" />
          Nueva Sesión Pomodoro
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Nombre de la tarea"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1"
          />
          <div className="flex items-center gap-2">
            <select
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 25)}
              className="w-20 px-3 py-2 text-sm rounded-md appearance-none border border-input bg-background shadow-sm focus:outline-none focus:border-ring transition"
            >
              {Array.from({ length: 60 }, (_, i) => i + 1).map((min) => (
                <option key={min} value={min}>
                  {min}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600">min</span>
          </div>
          <Button onClick={handleAdd} className="bg-green-600 hover:hover:bg-green-700 focus:ring-0 focus:outline-none focus:border-green-700 hover:border-green-700 border-transparent">
            Agregar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}