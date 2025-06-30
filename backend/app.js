// Configuración principal del servidor Express

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const sessionRoutes = require('./routes/sessionRoutes');

dotenv.config(); // Carga variables de entorno
connectDB(); // Conecta a MongoDB

const app = express();
app.use(cors()); // Permite CORS
app.use(express.json()); // Parseo de JSON en requests

// Rutas para manejar sesiones Pomodoro
app.use('/api/sessions', sessionRoutes);

// Ruta raíz para evitar error "Cannot GET /"
app.get('/', (req, res) => res.send("API GreenPomodoro activa"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
