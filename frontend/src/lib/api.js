const BASE_API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const BASE_URL = `${BASE_API}/api/sessions`;


export const getSessions = async () => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

export const createSession = async ({ task, duration, createdAt }) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, duration, createdAt }),
  });
  if (!res.ok) throw new Error("Error al crear la sesión");
  return await res.json();
};

export const updateSession = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const completeSession = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/complete`, {
    method: "PATCH",
  });
  return await res.json(); // devuelve { message, session, retoVerde }
};

export const deleteSession = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};

export const getSessionStats = async () => {
  const res = await fetch(`${BASE_URL}/stats`);
  if (!res.ok) throw new Error("Error al obtener estadísticas");
  return await res.json();
};
