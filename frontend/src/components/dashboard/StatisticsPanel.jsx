import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { getSessionStats } from "@/lib/api";
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function StatisticsPanel() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
  getSessionStats()
    .then(setStats)
    .catch((err) => console.error("Error al cargar estadísticas:", err));
}, []);

  if (!stats) return null

  const barData = {
    labels: stats.weeklyData.map((d) => d.day),
    datasets: [
      {
        label: "Sesiones completadas",
        data: stats.weeklyData.map((d) => d.count),
        backgroundColor: "#16a34a", // Verde
        borderRadius: 6,
      },
    ],
  }

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
        {/* Tarjeta: Total de sesiones */}
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6 text-center">
            <p className="font-medium">GreenPomodoros Completados</p>
            <p className="text-4xl font-bold text-purple-700">{stats.totalSessions}</p>
          </CardContent>
        </Card>

        {/* Tarjeta: Tiempo total */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6 text-center">
            <p className="font-medium">Tiempo Total de Enfoque</p>
            <p className="text-4xl font-bold text-blue-700">{stats.totalTime} min</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico */}
      <div className="mt-8">
        <Card className="border-gray-200 p-6 text-center">
            <p className="font-medium">Historial Semanal</p>
          <CardContent className="p-6">
            <Bar data={barData} options={barOptions} />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}