import { X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ActiveTimerCard({ taskName, timeLeft, onCancel }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="border-green-200 bg-white">
      <CardContent className="text-center py-8">
        <div className="space-y-4">
          <div className="text-6xl font-mono text-green-600">{formatTime(timeLeft)}</div>
          <div className="text-lg text-green-800">{taskName}</div>
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent hover:border-red-600 focus:ring-0 focus:outline-none focus:border-red-600"
          >
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
