# GreenPomodoro – Enfócate y Cuida el Planeta

**GreenPomodoro** es una aplicación de productividad que combina la técnica Pomodoro con acciones ecológicas breves. Al finalizar cada sesión de enfoque, el usuario recibe un reto verde generado por IA, incentivando pequeños hábitos sostenibles desde casa u oficina.

## Idea y Propósito

### Problema
Millones de personas buscan mejorar su productividad, pero pocas iniciativas los motivan a contribuir con el medio ambiente al mismo tiempo.

### Solución
GreenPomodoro te ayuda a enfocarte usando la técnica Pomodoro, y al finalizar cada sesión te propone un reto ecológico breve, generado por IA, que puedes realizar al instante.

### Público Objetivo
- Estudiantes y trabajadores remotos que usan la técnica Pomodoro.
- Personas interesadas en la sostenibilidad.
- Equipos que buscan introducir hábitos verdes en su rutina laboral.

## Funcionalidades

- Iniciar, completar y gestionar sesiones Pomodoro.
- Ver estadísticas semanales y tiempo total de enfoque.
- Generar automáticamente retos verdes con Gemini AI al completar sesiones.
- Panel de estadísticas animado con gráficos.
- Landing page atractiva y explicativa.
- Temporizador en vivo para sesiones Pomodoro.
- Notificaciones y sonido al finalizar una sesión.

## MVP (Producto Mínimo Viable)

1. **Gestión de sesiones Pomodoro** (CRUD).
2. **Reto ecológico generado por IA** al completar una sesión.
3. **Panel de estadísticas** que muestra sesiones completadas semanalmente.
4. **Temporizador funcional** que detecta fin de sesión y dispara el reto verde.

## Uso de Inteligencia Artificial

- Se utilizó **Gemini 1.5 Flash** de Google para generar los retos ecológicos personalizados.
- Se usó **ChatGPT** para brainstorming, generación de comentarios, validación de ideas, README y documentación.
- Se usó Copilot para sugerencias menores de código.
- El diseño base se creó con **V0 by Vercel** y luego fue adaptado.

## Tecnologías Utilizadas

| Área       | Tecnologías                      |
|------------|----------------------------------|
| Frontend   | React + Vite + TailwindCSS + Shadcn UI |
| Backend    | Node.js + Express                |
| Base de datos | MongoDB Atlas                  |
| Gráficos   | Chart.js + react-chartjs-2       |
| IA         | Gemini (GoogleGenerativeAI)      |
| Sonido y UX | Audio + Notificaciones web      |
| Deploy     | Vercel (Frontend) + Render (Backend) |

## Despliegue

GreenPomodoro se encuentra desplegado en:

| Parte           | Plataforma | Enlace                                                             |
|----------------|------------|--------------------------------------------------------------------|
| Frontend (React + Vite) | Vercel     | [https://green-pomodoro.vercel.app](https://green-pomodoro.vercel.app) |
| Backend (Express)        | Render     | [https://greenpomodoro.onrender.com](https://greenpomodoro.onrender.com) |

## Estructura del Proyecto

```bash
GreenPomodoro/
├── backend/ # API backend en Node.js + Express
│   ├── app.js # Archivo principal del servidor
│   ├── package.json # Dependencias del backend
│   ├── config/
│   │   └── db.js # Conexión a MongoDB
│   ├── controllers/
│   │   └── sessionController.js # Lógica de las rutas de sesiones
│   ├── models/
│   │   └── Session.js # Esquema de datos de sesiones Pomodoro
│   ├── routes/
│   │   └── sessionRoutes.js # Definición de rutas para sesiones
│   └── utils/
│       └── geminiClient.js # Cliente para generar retos verdes con IA
│
├── frontend/ # Aplicación frontend en React + Vite
│   ├── public/ # Archivos públicos (íconos, sonidos, imágenes)
│   │   ├── alarm.mp3 # Sonido al completar sesión
│   │   ├── greenpomodoro.svg # Ícono de pestaña
│   │   └── previewApp/ # Capturas de pantalla de la app
│   ├── src/
│   │   ├── components/ # Componentes reutilizables (landing y dashboard)
│   │   ├── hooks/ # Hooks personalizados (uso de media query)
│   │   ├── lib/ # API helper y utilidades
│   │   ├── pages/ # Landing y Dashboard
│   │   ├── routes/ # Rutas con React Router
│   │   ├── App.jsx # Punto de entrada del frontend
│   │   └── main.jsx # Inicialización del proyecto React
│   └── package.json # Dependencias del frontend
```

## Esquema de la base de datos (MongoDB)

**Colección:** `sessions`

```json
{
  "_id": "ObjectId",
  "task": "String",         
  "duration": "Number",    
  "status": "pending | completed",
  "createdAt": "Date"     
}
```

## Endpoints del Backend

Todos los endpoints están bajo la ruta base: `/api/sessions`

Además, la ruta raíz `/` del backend responde con un mensaje de texto simple (API GreenPomodoro activa) para evitar errores al acceder directamente.

### Rutas disponibles

| Método | Ruta                         | Descripción                                                                 |
|--------|------------------------------|------------------------------------------------------------------------------|
| GET    | `/`                          | Muestra un mensaje de bienvenida: "API GreenPomodoro activa"                       |
| GET    | `/api/sessions`              | Obtiene todas las sesiones registradas                                      |
| POST   | `/api/sessions`              | Crea una nueva sesión Pomodoro                                              |
| PUT    | `/api/sessions/:id`          | Actualiza una sesión existente (tarea o duración)                           |
| PATCH  | `/api/sessions/:id/complete` | Marca la sesión como completada y devuelve un reto verde generado por IA   |
| DELETE | `/api/sessions/:id`          | Elimina una sesión por su ID                                                |
| GET    | `/api/sessions/completed`    | Devuelve todas las sesiones completadas       

## Cómo ejecutar el proyecto localmente

### Requisitos
- Node.js >= 18
- MongoDB (o cuenta de MongoDB Atlas)
- Claves de Gemini API

### 1. Clonar el proyecto

```bash
git clone https://github.com/franmariG/GreenPomodoro.git
cd GreenPomodoro
```

### 2. Configurar el Backend

```bash
cd backend
npm install
```
Crea un archivo .env en la carpeta backend con:
```env
MONGO_URI=tu_uri_de_mongo
GEMINI_API_KEY=tu_clave_de_gemini
```
Inicia el servidor:
```bash
npm run dev
```
Servidor corriendo en: http://localhost:5000

### 3. Configurar el Frontend

```bash
cd ../frontend
npm install
```
Crea un archivo .env en frontend con la URL de tu backend desplegado (opcional por defecto toma http://localhost:5000):
```env
VITE_API_URL=https://greenpomodoro-tu-backend.onrender.com
```
Inicia la app:
```bash
npm run dev
```
App visible en: http://localhost:5173

## Instrucciones de Despliegue

1. Subir tu repositorio a Github

### Backend (Render)
2. Crear servicio web en Render
3. Seleccionar tu repositorio
4. Establecer:
    * Language: Node
    * Root Directory: backend
    * Install: npm install
    * Start: npm start
    * Variables de entorno:
```env
MONGO_URI=tu_uri_de_mongo
GEMINI_API_KEY=tu_clave_de_gemini
```
5. Inicia el despliegue

### Frontend (Vercel)

6. En Vercel, conectar el repo
7. Seleccionar la carpeta frontend como directorio raíz
8. Seleccionar como Framework Vite si vercel no lo detecta automaticamente
9. Establecer las variable de entorno con la URL de tu backend desplegado:
```env
VITE_API_URL=https://greenpomodoro-tu-backend.onrender.com
```
10. Inicia el despliegue

## Comentarios y Documentación

* Todo el código fue comentado con brevedad y claridad para facilitar la comprensión.
* Se siguió una estructura de carpetas modular para escalabilidad.
* Se usaron hooks personalizados, carga condicional, animaciones y validaciones UX.
* Toda la lógica de IA está aislada en geminiClient.js para su reutilización o reemplazo.

## Manejo de estados y experiencia de usuario
* Se usó useState, useEffect y useRef para controlar ciclos, modales y formularios.
* Se manejan múltiples indicadores de carga: agregar sesión, actualizar, eliminar, completar Pomodoro.
* La app también solicita permiso de notificación del navegador para enviar recordatorios al finalizar una sesión.
* Se controló la reproducción de audio en móviles con una interacción previa para evitar bloqueos por seguridad (debe tener los permisos).

## Manejo de errores
GreenPomodoro implementa un manejo de errores básico pero efectivo:

* **Backend (Node.js + Express)**: Se usan bloques try/catch en todas las operaciones críticas. Si ocurre un error (por ejemplo, al conectar con MongoDB o al procesar una sesión), se responde con un mensaje JSON claro y un código de estado HTTP apropiado.

* **Frontend (React + Vite)**: Se muestran notificaciones visuales con la librería sonner cuando hay errores en operaciones como crear, actualizar o eliminar sesiones. También se incluyen indicadores de carga para evitar acciones repetidas o confusas.

Estos mecanismos aseguran una experiencia fluida y ayudan al usuario a entender qué está ocurriendo en cada momento.

## Limitaciones actuales

* No hay autenticación de usuarios (todos ven las mismas sesiones).
* No se guarda el historial de retos completados.
* IA depende de la disponibilidad de la API de Gemini.

## Mejoras Futuras

* Autenticación de usuarios y sesiones individuales.
* Guardar historial de retos completados.
* Modo oscuro y personalización de interfaz.
* Exportar estadísticas a CSV.
* Traducción multilenguaje

## Conclusion

GreenPomodoro no es solo un temporizador: es una microherramienta para construir hábitos ecológicos con ayuda de IA. Su propósito es unir productividad personal con sostenibilidad diaria.

## Autora

* Franmari Garcia 
  * Usuario de GitHub: franmariG
