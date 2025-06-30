// Archivo centralizado para las peticiones HTTP al backend de sesiones Pomodoro

const BASE_API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const BASE_URL = `${BASE_API}/api/sessions`;

// Obtener todas las sesiones (sin filtrar)
export const getSessions = async () => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

// Crear nueva sesión Pomodoro (POST)
export const createSession = async ({ task, duration }) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, duration }),
  });
  if (!res.ok) throw new Error("Error al crear la sesión");
  return await res.json();
};

// Actualizar una sesión existente (PUT)
export const updateSession = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

// Marcar sesión como completada y recibir reto ecológico (PATCH)
export const completeSession = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/complete`, {
    method: "PATCH",
  });
  return await res.json(); // { message, session, retoVerde }
};

// Eliminar una sesión (DELETE)
export const deleteSession = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};

// Obtener solo las sesiones completadas (GET)
export const getSessionsCompleted = async () => {
  const res = await fetch(`${BASE_URL}/completed`);
  if (!res.ok) throw new Error("Error al obtener sesiones completadas");
  return await res.json();
};