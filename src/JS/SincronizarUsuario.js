// Importa las funciones de Firestore y la instancia db de Bubo²
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.js";

// Aplica la clase del tema visual en <html> (mantiene las clases que ya tenés en CSS)
export function aplicarTemaGlobal(tema) {
    const temaValido = tema || "clasico";
    const htmlTag = document.documentElement;
    htmlTag.classList.remove("tema-clasico", "tema-crema", "tema-tierra");
    htmlTag.classList.add(`tema-${temaValido}`);
}

// Lee el idioma actual desde la cookie googtrans (ej: "/es/en" -> "en")
function leerIdiomaCookieActual() {
    const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
    if (!match || !match[1]) return "es";
    const partes = decodeURIComponent(match[1]).split("/");
    return partes[2] || "es";
}

// Escribe o limpia la cookie googtrans y recarga UNA sola vez solo si hace falta
function sincronizarCookieTraduccion(idiomaDeseado) {
    const idiomaFinal = idiomaDeseado || "es";
    const idiomaActualCookie = leerIdiomaCookieActual();

    // Si ya está en el idioma correcto, no hacemos nada para evitar recargas
    if (idiomaActualCookie === idiomaFinal) {
        sessionStorage.removeItem("bubo_reload_idioma");
        return;
    }

    // Evita cualquier segundo reload en la misma pestaña si algo falla
    const claveIntento = `bubo_reload_idioma_${idiomaFinal}`;
    if (sessionStorage.getItem(claveIntento) === "1") {
        sessionStorage.removeItem(claveIntento);
        return;
    }

    const host = window.location.hostname;

    if (idiomaFinal === "es") {
        // Limpia la cookie para volver al idioma original (español)
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        if (host && host !== "localhost") {
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${host};`;
        }
    } else {
        const valorCookie = `/es/${idiomaFinal}`;
        document.cookie = `googtrans=${valorCookie}; path=/;`;
        if (host && host !== "localhost") {
            document.cookie = `googtrans=${valorCookie}; path=/; domain=.${host};`;
        }
    }

    sessionStorage.setItem(claveIntento, "1");
    window.location.reload();
}

// Carga datos del usuario desde Firestore y actualiza localStorage y elementos visibles
export async function sincronizarDatosUsuario() {
    const temaLocal = localStorage.getItem("bubo_tema") || "clasico";
    aplicarTemaGlobal(temaLocal);

    const imgNav = document.getElementById("ImgPNav");
    const imgPerfil = document.getElementById("ImgP");
    const fotoLocal = localStorage.getItem("FtoP");

    if (fotoLocal) {
        if (imgNav) imgNav.src = fotoLocal;
        if (imgPerfil) imgPerfil.src = fotoLocal;
    }

    const idUsuario = (
        localStorage.getItem("usuarioActivo") ||
        localStorage.getItem("emailUsuario") ||
        ""
    ).trim().toLowerCase();

    if (!idUsuario) return null;

    try {
        const snap = await getDoc(doc(db, "usuarios", idUsuario));
        if (!snap.exists()) return null;

        const datos = snap.data();

        if (datos.usuario) {
            localStorage.setItem("usuario", datos.usuario);
            const elemUsuario = document.getElementById("usuario");
            if (elemUsuario) elemUsuario.textContent = datos.usuario;
        }

        if (datos.biografia) {
            localStorage.setItem("biografia", datos.biografia);
            const elemBio = document.getElementById("biografia");
            if (elemBio) elemBio.textContent = datos.biografia;
        }

        if (datos.foto) {
            localStorage.setItem("FtoP", datos.foto);
            if (imgNav) imgNav.src = datos.foto;
            if (imgPerfil) imgPerfil.src = datos.foto;
        }

        if (datos.tema) {
            localStorage.setItem("bubo_tema", datos.tema);
            aplicarTemaGlobal(datos.tema);
        }

        if (datos.idioma) {
            localStorage.setItem("bubo_idioma", datos.idioma);
            sincronizarCookieTraduccion(datos.idioma);
        }

        return datos;
    } catch (error) {
        console.error("Error al sincronizar datos del usuario desde Firestore:", error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    sincronizarDatosUsuario();
});