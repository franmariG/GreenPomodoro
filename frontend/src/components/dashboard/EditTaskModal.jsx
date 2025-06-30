// Modal para editar nombre y duración de una tarea existente

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function EditTaskModal({ open, task, onCancel, onSave }) {
  const [localTask, setLocalTask] = useState({ task: "", duration: 25 })

  // Sincroniza datos del modal con la tarea recibida
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
    onSave({ ...task, ...localTask }) // Mantiene el _id y otros campos
  }

  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="w-[90%] max-w-sm p-8 sm:p-5 rounded-md [&>button]:hidden">
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
            <select
              value={localTask.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              className="w-20 px-3 py-2 text-sm rounded-md appearance-none border border-input bg-background shadow-sm focus:outline-none focus:border-ring transition"
            >
              {Array.from({ length: 60 }, (_, i) => i + 1).map((min) => (
                <option key={min} value={min}>
                  {min}
                </option>
              ))}
            </select>
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