import { Button } from "@/components/ui/button"

export default function FilterBar({ filter, onChange, counts }) {
  const baseClasses = "hover:border-gray-600 focus:ring-0 focus:outline-none focus:border-gray-600"

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={filter === "all" ? "default" : "outline"}
        onClick={() => onChange("all")}
        size="sm"
        className={baseClasses}
      >
        <span className="inline-flex items-center">
          Todas&nbsp;(<span>{counts?.all ?? 0}</span>)
        </span>
      </Button>

      <Button
        variant={filter === "pending" ? "default" : "outline"}
        onClick={() => onChange("pending")}
        size="sm"
        className={baseClasses}
      >
        <span className="inline-flex items-center">
          Pendientes&nbsp;(<span>{counts?.pending ?? 0}</span>)
        </span>
      </Button>

      <Button
        variant={filter === "completed" ? "default" : "outline"}
        onClick={() => onChange("completed")}
        size="sm"
        className={baseClasses}
      >
        <span className="inline-flex items-center">
          Completadas&nbsp;(<span>{counts?.completed ?? 0}</span>)
        </span>
      </Button>
    </div>
  )
}
