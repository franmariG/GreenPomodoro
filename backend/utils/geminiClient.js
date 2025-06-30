require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const categoriasRetos = [
  "ahorro de energía (luces, dispositivos electrónicos, termostato)",
  "reducción de residuos (reciclaje, reutilización, limpieza)",
  "uso eficiente del agua (cerrar grifos, revisar fugas)",
  "conciencia ambiental (aprender algo rápido, observar el entorno)",
  "pequeñas acciones de impacto (organizar, planificar, comunicar)",
  "acciones de movilidad sostenible (pensar en transporte, caminar)",
  "consumo consciente (reflexionar sobre una compra, evitar desechables)",
];

async function generarRetoVerdeGemini() {
  const categoriaFoco = categoriasRetos[Math.floor(Math.random() * categoriasRetos.length)];

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Eres un asistente ecológico. Tu tarea es generar un reto verde de 5 minutos que pueda realizar alguien al terminar una sesión Pomodoro.

El reto debe ser:
- Corto, directo y motivador
- Relacionado con la categoría: ${categoriaFoco}
- Realista y aplicable desde casa u oficina
- Diferente a tareas de jardinería como regar o sembrar

Ejemplos válidos: 
- "Apaga dispositivos que no estés usando"
- "Limpia tu espacio de trabajo y separa reciclables"
- "Piensa en una forma de reducir el consumo de agua esta semana"

Devuelve **solo el reto**, sin explicaciones ni saludos.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (err) {
    console.error("Error generando reto con Gemini:", err);
    return "Ajusta el brillo de tu pantalla para ahorrar energía"; // Fallback
  }
}

module.exports = generarRetoVerdeGemini;