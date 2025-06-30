// Controladores para las operaciones con sesiones

const Session = require('../models/Session');
const generarRetoVerdeGemini = require('../utils/geminiClient');

// Obtener todas las sesiones (ordenadas por fecha descendente)
exports.getSessions = async (req, res) => {
  const sessions = await Session.find().sort({ createdAt: -1 });
  res.json(sessions);
};

// Crear nueva sesión con tarea y duración
exports.createSession = async (req, res) => {
  const { task, duration } = req.body;
  const newSession = await Session.create({ task, duration });
  res.status(201).json(newSession);
};

// Actualizar una sesión existente (nombre o duración)
exports.updateSession = async (req, res) => {
  const { id } = req.params;
  const updated = await Session.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

// Marcar una sesión como completada y generar reto verde
exports.completeSession = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Session.findByIdAndUpdate(
      id,
      { status: 'completed' },
      { new: true }
    );

    const reto = await generarRetoVerdeGemini();

    res.json({
      message: 'Sesión completada',
      session: updated,
      retoVerde: reto
    });
  } catch (err) {
    res.status(500).json({ error: 'No se pudo completar la sesión' });
  }
};

// Eliminar una sesión por ID
exports.deleteSession = async (req, res) => {
  const { id } = req.params;
  await Session.findByIdAndDelete(id);
  res.json({ message: 'Eliminado' });
};

// Obtener solo sesiones marcadas como "completed"
exports.getSessionsCompleted = async (req, res) => {
  try {
    const completedSessions = await Session.find({ status: "completed" }).lean();
    res.json(completedSessions);
  } catch (err) {
    console.error("Error al obtener sesiones completadas:", err);
    res.status(500).json({ error: "No se pudieron obtener las sesiones" });
  }
};