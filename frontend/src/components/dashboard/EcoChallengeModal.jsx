import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Leaf, Lightbulb } from "lucide-react"

export default function EcoChallengeModal({ open, challenge, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-[90%] max-w-sm p-8 sm:p-5 rounded-md overflow-y-auto max-h-[80vh]">

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-800">
            <Lightbulb className="h-5 w-5" />
            ¡Reto Verde!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-lg font-medium text-gray-900 mb-2">¡Sesión completada!</p>
          <p className="text-gray-600 mb-4">Ahora es momento de tu micro-reto ecológico:</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">{challenge}</p>
          </div>
          <Button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700 focus:ring-0 focus:outline-none focus:border-green-700 hover:border-green-700 border-transparent">
            ¡Entendido!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}