import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function FilterBar({ filter, onChange, counts }) {
  const baseClasses = "hover:border-gray-600 focus:ring-0 focus:outline-none focus:border-gray-600"

  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.div>
  )
}
