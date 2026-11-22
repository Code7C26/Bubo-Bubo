// /JS/Idioma.js

export function activarTraduccionGoogle(idiomaDestino, recargar = true) {
    if (!idiomaDestino || idiomaDestino === "es") {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
    } else {
        const valorCookie = `/es/${idiomaDestino}`;
        document.cookie = `googtrans=${valorCookie}; path=/;`;
        document.cookie = `googtrans=${valorCookie}; path=/; domain=${window.location.hostname}`;
    }

    if (recargar) {
        location.reload();
    }
}

export function sincronizarIdiomaAlCargar() {
    const idiomaGuardado = localStorage.getItem("bubo_idioma") || "es";
    const cookieActual = document.cookie || "";

    if (idiomaGuardado === "es") {
        // Si está en español y había una cookie de traducción vieja, la limpia y recarga una sola vez
        if (cookieActual.includes("googtrans=/es/")) {
            activarTraduccionGoogle("es", true);
        }
        return;
    }

    const esperada = `/es/${idiomaGuardado}`;
    // Solo recarga si la cookie todavía no coincide con el idioma guardado
    if (!cookieActual.includes(`googtrans=${esperada}`)) {
        activarTraduccionGoogle(idiomaGuardado, true);
    }
}

window.activarTraduccionGoogle = activarTraduccionGoogle;
window.sincronizarIdiomaAlCargar = sincronizarIdiomaAlCargar;

document.addEventListener("DOMContentLoaded", () => {
    sincronizarIdiomaAlCargar();
});