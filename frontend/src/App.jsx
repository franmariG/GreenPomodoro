// Componente raíz de la aplicación. Incluye rutas y notificaciones

import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <AppRoutes />
    </>
  );
}

export default App;