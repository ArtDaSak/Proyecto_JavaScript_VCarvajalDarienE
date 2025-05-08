// =========================
// 🌐 Base de la API D&D 5e
// =========================
const BASE_URL = "https://www.dnd5eapi.co";

// =========================
// 🧬 Funciones de Fetch
// =========================

export async function fetchData(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error(`Error al obtener datos de ${url}:`, error);
        return null;
    }
}

// =========================
// 🧝‍♂️ Razas
// =========================

export function urlRazas() {
    return `${BASE_URL}/api/races`;
}

export function urlRaza(nombreRaza) {
    return `${BASE_URL}/api/races/${nombreRaza}`;
}

// =========================
// 🛡️ Clases
// =========================

export function urlClases() {
    return `${BASE_URL}/api/classes`;
}

export function urlClase(nombreClase) {
    return `${BASE_URL}/api/classes/${nombreClase}`;
}

// =========================
// 🧙 Habilidades (Skills)
// =========================

export function urlHabilidades() {
    return `${BASE_URL}/api/skills`;
}

export function urlHabilidad(nombreHabilidad) {
    return `${BASE_URL}/api/skills/${nombreHabilidad}`;
}

// =========================
// 🪖 Equipamiento
// =========================

export function urlArmaduras(tipo) {
    return `${BASE_URL}/api/equipment-categories/${tipo}`;
}

export function urlArma(tipo) {
    return `${BASE_URL}/api/equipment-categories/${tipo}`;
}

export function urlTipoAccesorios(tipo) {
    return `${BASE_URL}/api/equipment-categories/${tipo}`;
}
