// Modelo de datos para una sesión Pomodoro

const mongoose = require('mongoose');

// Esquema de sesión: tarea, duración, estado y fecha de creación
const sessionSchema = new mongoose.Schema({
  task: { type: String, required: true },
  duration: { type: Number, default: 25 },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);
