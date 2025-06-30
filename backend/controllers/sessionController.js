const Session = require('../models/Session');
const generarRetoVerdeGemini = require('../utils/geminiClient');

// Obtener todas las sesiones
exports.getSessions = async (req, res) => {
  const sessions = await Session.find().sort({ createdAt: -1 });
  res.json(sessions);
};

// Crear nueva sesión
exports.createSession = async (req, res) => {
  try {
    const { task, duration, createdAt } = req.body;
    const sessionData = { task, duration };
    if (createdAt) {
      sessionData.createdAt = new Date(createdAt);
    }
    const newSession = await Session.create(sessionData);
    res.status(201).json(newSession);
  } catch (err) {
    console.error("Error creando sesión:", err);
    res.status(500).json({ error: "Error al crear la sesión" });
  }
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

// Obtener estadísticas generales
exports.getStats = async (req, res) => {
  try {
    const completedSessions = await Session.find({ status: "completed" });

    const totalSessions = completedSessions.length;
    const totalTime = completedSessions.reduce((sum, s) => sum + s.duration, 0);

    // Últimos 7 días
    const today = new Date();
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - i);
      d.setHours(0, 0, 0, 0);
      return d;
    });

    const weeklyData = await Promise.all(
      last7Days.map(async (day) => {
        const nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);

        const count = await Session.countDocuments({
          status: "completed",
          createdAt: { $gte: day, $lt: nextDay },
        });

        return {
          day: day.toLocaleDateString("es-VE", { weekday: "short" }),
          count,
        };
      })
    );

    res.json({
      totalSessions,
      totalTime,
      weeklyData: weeklyData.reverse(), // De lunes a hoy
    });
  } catch (err) {
    console.error("Error al obtener estadísticas:", err);
    res.status(500).json({ error: "No se pudieron obtener las estadísticas" });
  }
};