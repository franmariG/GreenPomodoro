// Panel de estadísticas con animaciones y gráfica semanal de sesiones completadas

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getSessionsCompleted } from "@/lib/api";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";

// Registro de componentes necesarios para Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Configuración de animación al hacer scroll
const fadeInUpScroll = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1 },
};

// Agrupa las sesiones por día local (formato YYYY-MM-DD) y suma duración
function groupSessionsByDay(sessions) {
  const groups = {};
  sessions.forEach(({ createdAt, duration }) => {
    const date = new Date(createdAt);
    const dayKey = date.toLocaleDateString("en-CA"); // formato ISO local
    if (!groups[dayKey]) groups[dayKey] = { count: 0, totalDuration: 0 };
    groups[dayKey].count += 1;
    groups[dayKey].totalDuration += duration;
  });
  return groups;
}

// Devuelve los últimos 7 días en formato YYYY-MM-DD
function getLast7DaysLabels() {
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString("en-CA"));
  }
  return labels;
}

export default function StatisticsPanel({ refreshKey }) {
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState(null);

  // Obtiene sesiones completadas desde el backend al montar o al cambiar refreshKey
  useEffect(() => {
    getSessionsCompleted()
      .then(setSessions)
      .catch((err) => console.error("Error al cargar sesiones:", err));
  }, [refreshKey]);

  // Procesa los datos obtenidos para agrupar por día y calcular totales
  useEffect(() => {
    if (sessions.length === 0) return;

    const grouped = groupSessionsByDay(sessions);
    const last7Days = getLast7DaysLabels();

    const weeklyData = last7Days.map((day) => ({
      dayISO: day,
      count: grouped[day]?.count || 0,
      totalDuration: grouped[day]?.totalDuration || 0,
    }));

    const totalSessions = sessions.length;
    const totalTime = sessions.reduce((sum, s) => sum + s.duration, 0);

    setStats({ totalSessions, totalTime, weeklyData });
  }, [sessions]);

  if (!stats) return null;

  // Configura los datos para la gráfica de barras
  const barData = {
    labels: stats.weeklyData.map((d) => {
      const [year, month, day] = d.dayISO.split("-");
      const localDate = new Date(Number(year), Number(month) - 1, Number(day));
      return localDate.toLocaleDateString("es-ES", { weekday: "short" });
    }),
    datasets: [
      {
        label: "Sesiones completadas",
        data: stats.weeklyData.map((d) => d.count),
        backgroundColor: "#16a34a",
        borderRadius: 6,
      },
    ],
  };

  // Configuración del gráfico
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Estadísticas Generales</h2>
      {/* Tarjetas de totales */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={fadeInUpScroll.initial}
          whileInView={fadeInUpScroll.whileInView}
          viewport={fadeInUpScroll.viewport}
          transition={fadeInUpScroll.transition}
        >
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <p className="font-medium">GreenPomodoros Completados</p>
              <p className="text-4xl font-bold text-purple-700">{stats.totalSessions}</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={fadeInUpScroll.initial}
          whileInView={fadeInUpScroll.whileInView}
          viewport={fadeInUpScroll.viewport}
          transition={{ ...fadeInUpScroll.transition, delay: 0.1 }}
        >
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <p className="font-medium">Tiempo Total de Enfoque</p>
              <p className="text-4xl font-bold text-blue-700">{stats.totalTime} min</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      {/* Gráfico de barras */}
      <motion.div
        initial={fadeInUpScroll.initial}
        whileInView={fadeInUpScroll.whileInView}
        viewport={fadeInUpScroll.viewport}
        transition={{ ...fadeInUpScroll.transition, delay: 0.2 }}
        className="mt-8"
      >
        <Card className="border-gray-200 p-6 text-center">
          <p className="font-medium">Historial Semanal</p>
          <CardContent className="p-6">
            <Bar data={barData} options={barOptions} />
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}