
document.addEventListener("DOMContentLoaded", () => {

    const elementos = document.querySelectorAll("h1, h2, h3, p, a, #texto-archivo,label,input");

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
            } else {
                entrada.target.classList.remove("visible");
            }
        });
    }, {
        threshold: 0.1
    });

    elementos.forEach((elemento) => {

        if (elemento.closest(".BarraNav, .BarraBaj")) {
            elemento.classList.add("sin-animacion");
            return;
        }

        observador.observe(elemento);
    });

});

// ==========================================
// LÓGICA DE LA PESTAÑITA VOLVER ARRIBA
// ==========================================

const contenedorArriba = document.getElementById('contenedor-arriba');
const btnArriba = document.getElementById('btn-volver-arriba');

if (contenedorArriba && btnArriba) {
    window.addEventListener('scroll', () => {
        // Detecta si el usuario está a 30px o menos del final de la página
        const alFinal = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 30);

        if (alFinal) {
            contenedorArriba.classList.add('mostrar');
        } else {
            contenedorArriba.classList.remove('mostrar');
        }
    });

    // Acción para subir de inmediato al hacer clic
    btnArriba.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Sube de golpe al principio
        });
    });
}

// --- TRADUCCIÓN MASIVA Y SEGURA POR CLAVES ---
const traduccionesGlobales = {
    en: {
        "titulo-principal": "Welcome to Bubo²",
        "parrafo-intro": "Financial education for the Argentine economy",
        "btn-principal": "Home",
        "btn-admin": "Administration",
        "btn-eval": "Assessment",
        "btn-rec": "Recommendations",
        "btn-news": "News"
    },
    pt: {
        "titulo-principal": "Bem-vindo ao Bubo²",
        "parrafo-intro": "Educação financeira para a economia argentina",
        "btn-principal": "Principal",
        "btn-admin": "Administração",
        "btn-eval": "Avaliação",
        "btn-rec": "Recomendações",
        "btn-news": "Notícias"
    }
};

window.addEventListener("load", () => {
    try {
        const idioma = localStorage.getItem("bubo_idioma") || "es";
        if (idioma === "es") return; // Si es español, no hace nada

        const diccionario = traduccionesGlobales[idioma];
        if (!diccionario) return;

        // Busca todos los elementos que tengan el atributo de traducción
        document.querySelectorAll("[data-traducir]").forEach(el => {
            const clave = el.getAttribute("data-traducir");
            if (diccionario[clave]) {
                el.textContent = diccionario[clave];
            }
        });
    } catch (e) {
        console.error("Error en la traducción global:", e);
    }
});