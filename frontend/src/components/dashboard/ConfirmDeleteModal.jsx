// Modal para confirmar la eliminación de una sesión

import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ConfirmDeleteModal({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-sm p-8 sm:p-5 rounded-md [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>¿Eliminar esta sesión?</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600 text-sm">
          Esta acción no se puede deshacer. ¿Estás seguro de que deseas continuar?
        </p>
        <DialogFooter className="mt-4 flex flex-row gap-2 justify-end">
          <Button variant="outline" onClick={onClose} className="hover:border-gray-600 focus:ring-0 focus:outline-none focus:border-gray-600">
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="hover:bg-red-700 focus:ring-0 focus:outline-none focus:border-red-700 hover:border-red-700 border-transparent">
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
