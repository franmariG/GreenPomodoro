import { useEffect, useState, useRef } from "react"

import { getSessions, createSession, updateSession, deleteSession, completeSession } from "@/lib/api"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import AddSessionForm from "@/components/dashboard/AddSessionForm"
import TaskList from "@/components/dashboard/TaskList"
import FilterBar from "@/components/dashboard/FilterBar"
import StatisticsPanel from "@/components/dashboard/StatisticsPanel"
import ActiveTimerCard from "@/components/dashboard/ActiveTimerCard"
import EditTaskModal from "@/components/dashboard/EditTaskModal"
import EcoChallengeModal from "@/components/dashboard/EcoChallengeModal"

export default function DashboardPage() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [activeTimer, setActiveTimer] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [ecoModal, setEcoModal] = useState({ open: false, challenge: "" })
  const isCompletingRef = useRef(false)
  const [statsRefreshKey, setStatsRefreshKey] = useState(0)
  const [showCompleteLoading, setShowCompleteLoading] = useState(false)

  const audioRef = useRef(null)

  const totalCount = sessions.length || 0
  const pendingCount = sessions.filter(s => s.status === "pending").length || 0
  const completedCount = sessions.filter(s => s.status === "completed").length || 0

  useEffect(() => {
    audioRef.current = new Audio("/alarm.mp3")
  }, [])

  useEffect(() => {
    const unlockAudio = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
          })
          .catch(() => {})
      }
      window.removeEventListener("touchend", unlockAudio)
      window.removeEventListener("click", unlockAudio)
    }

    window.addEventListener("touchend", unlockAudio, { once: true })
    window.addEventListener("click", unlockAudio, { once: true })
  }, [])

  const refreshStats = () => setStatsRefreshKey(prev => prev + 1)

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    const originalTitle = document.title
    if (ecoModal.open) {
      document.title = "¡Pomodoro Completado!"
    }
    const handleFocus = () => {
      document.title = originalTitle
    }
    window.addEventListener("focus", handleFocus)
    return () => {
      window.removeEventListener("focus", handleFocus)
      document.title = originalTitle
    }
  }, [ecoModal.open])

  useEffect(() => {
    let interval
    if (activeTimer && activeTimer.timeLeft > 0) {
      interval = setInterval(() => {
        setActiveTimer((prev) => {
          if (!prev) return null
          const newTimeLeft = prev.timeLeft - 1
          if (newTimeLeft <= 0) {
            handleCompleteSession(prev.taskId)
            return null
          }
          return { ...prev, timeLeft: newTimeLeft }
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeTimer])

  useEffect(() => {
    setLoading(true)
    getSessions()
      .then(setSessions)
      .finally(() => setLoading(false))
  }, [])

  const handleAdd = async (task, duration) => {
    const newSession = await createSession(task, duration)
    setSessions([newSession, ...sessions])
  }

  const handleUpdate = async (updatedTask) => {
    const updated = await updateSession(updatedTask._id, {
      task: updatedTask.task,
      duration: updatedTask.duration,
    })
    setSessions(sessions.map((s) => (s._id === updated._id ? updated : s)))
    setEditingTask(null)
  }

  const handleDelete = async (id) => {
    await deleteSession(id)
    setSessions(sessions.filter((s) => s._id !== id))
    if (activeTimer?.taskId === id) setActiveTimer(null)
    refreshStats()
  }

  const handleStart = (session) => {
    setActiveTimer({
      taskId: session._id,
      timeLeft: session.duration * 60,
    })
  }

  const handleCancelTimer = () => {
    setActiveTimer(null)
  }

  const handleCompleteSession = async (id) => {
  if (isCompletingRef.current) return
  isCompletingRef.current = true
  setShowCompleteLoading(true)

  try {
    const res = await completeSession(id)
    const updated = res.session
    const challenge = res.retoVerde
    setSessions(sessions.map((s) => (s._id === updated._id ? updated : s)))
    setEcoModal({ open: true, challenge })

    if (Notification.permission === "granted") {
      new Notification("¡Pomodoro terminado!", {
        body: "Haz una pausa y completa tu reto ecológico",
        icon: "/greenpomodoro.svg",
      })
    }

    if (audioRef.current) {
      audioRef.current.play().catch((err) =>
        console.error("Error de sonido:", err)
      )
    }

    refreshStats()
  } catch (err) {
    console.error("Error completando sesión:", err)
  } finally {
    isCompletingRef.current = false
    setShowCompleteLoading(false)
  }
}

  const filteredSessions = sessions.filter((s) => {
    if (filter === "all") return true
    return s.status === filter
  })

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-300 to-white">
      <DashboardHeader />
      <main className="w-full px-4 py-8 md:px-6 max-w-4xl mx-auto space-y-8">
        <AddSessionForm onAdd={handleAdd} />

        {activeTimer && (
          <ActiveTimerCard
            session={sessions.find((s) => s._id === activeTimer.taskId)}
            timeLeft={activeTimer.timeLeft}
            onCancel={handleCancelTimer}
          />
        )}

        {loading ? (
           <div className="flex flex-col items-center justify-center py-12 text-gray-600">
             <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-sm">Cargando sesiones...</p>
           </div>
        ) : (
          <>
            <FilterBar
              filter={filter}
              onChange={setFilter}
              counts={{
                all: totalCount,
                pending: pendingCount,
                completed: completedCount,
              }}
            />
            <TaskList
              tasks={filteredSessions}
              filter={filter}
              onStart={handleStart}
              onDelete={handleDelete}
              onEdit={setEditingTask}
            />
            <StatisticsPanel refreshKey={statsRefreshKey} />
          </>
        )}
      </main>

      {showCompleteLoading && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <EditTaskModal
        open={!!editingTask}
        task={editingTask}
        onCancel={() => setEditingTask(null)}
        onSave={handleUpdate}
      />

      <EcoChallengeModal
        open={ecoModal.open}
        onClose={() => setEcoModal({ open: false, challenge: "" })}
        challenge={ecoModal.challenge}
      />
    </div>
  )
}