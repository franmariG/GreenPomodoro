import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function EditTaskModal({ open, task, onCancel, onSave }) {
  const [localTask, setLocalTask] = useState({ task: "", duration: 25 })

  // Actualiza localTask cuando cambia la tarea original
  useEffect(() => {
    if (task) {
      setLocalTask({ task: task.task, duration: task.duration })
    }
  }, [task])

  const handleChange = (field, value) => {
    setLocalTask((prev) => ({
      ...prev,
      [field]: field === "duration" ? parseInt(value || 0) : value,
    }))
  }

  const handleSave = () => {
    onSave({ ...task, ...localTask }) // mantén el _id y otros campos
  }

  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarea</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Nombre de la tarea"
            value={localTask.task}
            onChange={(e) => handleChange("task", e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="1"
              max="60"
              value={localTask.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              className="w-20"
            />
            <span className="text-sm text-gray-600">minutos</span>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onCancel} className="hover:border-gray-600 focus:ring-0 focus:outline-none focus:border-gray-600">
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 focus:ring-0 focus:outline-none focus:border-green-700 hover:border-green-700 border-transparent">
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}