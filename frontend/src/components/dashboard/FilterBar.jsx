import { Button } from "@/components/ui/button"

export default function FilterBar({ filter, onChange, counts }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant={filter === "all" ? "default" : "outline"} onClick={() => onChange("all")} size="sm" className="hover:border-gray-600 focus:ring-0 focus:outline-none focus:border-gray-600">
        Todas ({counts.all})
      </Button>
      <Button variant={filter === "pending" ? "default" : "outline"} onClick={() => onChange("pending")} size="sm" className="hover:border-gray-600 focus:ring-0 focus:outline-none focus:border-gray-600">
        Pendientes ({counts.pending})
      </Button>
      <Button variant={filter === "completed" ? "default" : "outline"} onClick={() => onChange("completed")} size="sm" className="hover:border-gray-600 focus:ring-0 focus:outline-none focus:border-gray-600">
        Completadas ({counts.completed})
      </Button>
    </div>
  )
}
