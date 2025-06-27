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
    // Puedes añadir más categorías aquí
];

let indiceCategoriaActual = 0; // Para rotar las categorías

async function generarRetoVerdeGemini() {
    const categoriaFoco = categoriasRetos[indiceCategoriaActual];
    indiceCategoriaActual = (indiceCategoriaActual + 1) % categoriasRetos.length;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        Imagina que eres un asistente ecológico.
        Sugiere un reto verde corto, motivador y simple que se pueda hacer en 5 minutos,
        pensado para alguien que acaba de terminar un Pomodoro.
        El reto debe enfocarse específicamente en la categoría de ${categoriaFoco}.
        NO debe ser sobre regar plantas, sembrar semillas, ni cualquier otra tarea directamente relacionada con la jardinería.

        Da solo el reto, sin saludos, explicaciones ni preámbulos.
        Ejemplo: "Apaga luces innecesarias" o "Recoge 3 objetos reciclables".
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
    } catch (err) {
        console.error("Error generando reto con Gemini:", err);
        return "Ajusta el brillo de tu pantalla para ahorrar energía"; // fallback
    }
}

module.exports = generarRetoVerdeGemini;
