window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    const logo = document.querySelector('.header img');

    if (window.scrollY > 10) {
        header.style.background = 'linear-gradient(to bottom right, rgba(43, 39, 47), rgba(1, 1, 1))';
        logo.src = './assets/img/logos/textLogo/textLogoColumbiaBlue.png';
    } else {
        header.style.background = 'rgba(43, 39, 47, 0.50)';
        logo.src = './assets/img/logos/textLogo/textLogoTangBlue.png';
    }
});
import {
    urlRazas,
    urlClases,
    urlArmaduras,
    urlArma,
    urlTipoAccesorios,
    urlHabilidad
} from "../api.js";

const selectRaza = document.getElementById("cp-raza");
const selectClase = document.getElementById("cp-clase");
const selectTipoArmadura = document.getElementById("cp-tipoArmadura");
const selectArmadura = document.getElementById("cp-armadura");
const selectTipoArma = document.getElementById("cp-tipoArma");
const selectArma = document.getElementById("cp-arma");
const selectHabilidad = document.getElementById("habilidades");
const selectTipoAccesorios = document.getElementById("tipoAccesorios");
const selectAccesorios = document.getElementById("accesorios");

// Función auxiliar para llenar un select
async function cargarOpciones(select, urlFn, valueKey = "index", labelKey = "name") {
    try {
        const res = await fetch(urlFn());
        const data = await res.json();
        select.innerHTML = `<option value="">Selecciona una opción</option>`;
        data.results.forEach((item) => {
            const opt = document.createElement("option");
            opt.value = item[valueKey];
            opt.textContent = item[labelKey];
            select.appendChild(opt);
        });
    } catch (err) {
        console.error("Error cargando datos:", err);
        select.innerHTML = `<option value="">Error al cargar</option>`;
    }
}

// Cargar razas, clases, habilidades
cargarOpciones(selectRaza, urlRazas);
cargarOpciones(selectClase, urlClases);
cargarOpciones(selectHabilidad, () => new URL("/api/skills", "https://www.dnd5eapi.co"));

// Dinámico: al seleccionar tipo de armadura, cargar armaduras
selectTipoArmadura.addEventListener("change", async () => {
    const tipo = selectTipoArmadura.value;
    if (tipo) cargarOpciones(selectArmadura, () => urlArmaduras(tipo), "index", "name");
});

// Dinámico: al seleccionar tipo de arma, cargar armas
selectTipoArma.addEventListener("change", async () => {
    const tipo = selectTipoArma.value;
    if (tipo) cargarOpciones(selectArma, () => urlArma(tipo), "index", "name");
});

// Dinámico: tipo de accesorio
selectTipoAccesorios.addEventListener("change", async () => {
    const tipo = selectTipoAccesorios.value;
    if (tipo) cargarOpciones(selectAccesorios, () => urlTipoAccesorios(tipo), "index", "name");
});
