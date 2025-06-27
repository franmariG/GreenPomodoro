const Session = require('../models/Session');
const generarRetoVerdeGemini = require('../utils/geminiClient');

// Obtener todas las sesiones
exports.getSessions = async (req, res) => {
  const sessions = await Session.find().sort({ createdAt: -1 });
  res.json(sessions);
};

// Crear nueva sesión
exports.createSession = async (req, res) => {
  const { task, duration } = req.body;
  const newSession = await Session.create({ task, duration });
  res.status(201).json(newSession);
};

// Actualizar sesión (nombre o duración)
exports.updateSession = async (req, res) => {
  const { id } = req.params;
  const updated = await Session.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

// Completar sesión y generar reto verde
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

// Eliminar sesión
exports.deleteSession = async (req, res) => {
  const { id } = req.params;
  await Session.findByIdAndDelete(id);
  res.json({ message: 'Eliminado' });
};
