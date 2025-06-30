import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { getSessionStats } from "@/lib/api";
import { Bar } from "react-chartjs-2"
import { motion } from "framer-motion"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const fadeInUpScroll = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1 },
}

export default function StatisticsPanel({ refreshKey }) {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    getSessionStats()
      .then(setStats)
      .catch((err) => console.error("Error al cargar estadísticas:", err));
  }, [refreshKey])

  if (!stats) return null

  const barData = {
    labels: stats.weeklyData.map((d) =>
      new Date(d.dayISO).toLocaleDateString("es-VE", { weekday: "short" })
    ),
    datasets: [
      {
        label: "Sesiones completadas",
        data: stats.weeklyData.map((d) => d.count),
        backgroundColor: "#16a34a",
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Estadísticas Generales</h2>
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
  )
}