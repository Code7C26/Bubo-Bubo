// Importaciones de Firebase Firestore y Auth para datos y sesión del usuario
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "./firebase.js";
// Importa la función que activa o limpia la traducción de Google Translate
import { activarTraduccionGoogle } from "./Idioma.js";

// --- FUNCIÓN GLOBAL PARA CERRAR CUALQUIER POPUP (Usada por la X, el overlay y los botones) ---
function CerrarPopupP(idPopup) {
    const popup = document.getElementById(idPopup);
    if (popup) {
        popup.style.display = "none";
    }
}

// Cambia la clase de tema en <html> para actualizar los colores de toda la app
function aplicarTemaVisual(tema) {
    const temaValido = tema || "clasico";
    const htmlTag = document.documentElement;
    htmlTag.classList.remove("tema-clasico", "tema-crema", "tema-tierra");
    htmlTag.classList.add(`tema-${temaValido}`);
}

// Espera a que el DOM esté completamente cargado antes de manipular elementos
document.addEventListener("DOMContentLoaded", async () => {
    // --- 0. APLICAR TEMA VISUAL GUARDADO AL CARGAR LA PÁGINA ---
    const temaGuardado = localStorage.getItem("bubo_tema") || "clasico";
    aplicarTemaVisual(temaGuardado);

    // Identificador del usuario en Firestore (correo en minúsculas)
    const idUsuario = (
        localStorage.getItem("usuarioActivo") ||
        localStorage.getItem("emailUsuario") ||
        ""
    ).trim().toLowerCase();

    // Referencias del popup de configuración y de idioma para sincronizar al traer de Firestore
    const btnAbrirConfig = document.getElementById("btnAbrirConfig");
    const btnGuardarConfig = document.getElementById("btnGuardarConfig");
    const selectTema = document.getElementById("selectTema");

    const btnAbrirIdioma = document.getElementById("btnAbrirIdioma");
    const btnGuardarIdioma = document.getElementById("btnGuardarIdioma");
    const selectIdioma = document.getElementById("selectIdioma");

    // 1. CARGAR DATOS DEL PERFIL AL INICIAR
    const elemUsuario = document.getElementById("usuario");
    const imgP = document.getElementById("ImgP");
    const elemBio = document.getElementById("biografia");

    // Muestra primero los datos guardados en localStorage para una carga rápida
    const usuario = localStorage.getItem("usuario");
    if (usuario && elemUsuario) {
        elemUsuario.textContent = usuario;
    }

    const foto = localStorage.getItem("FtoP");
    if (imgP) {
        imgP.src = foto ? foto : "../../assets/logo.png";
    }

    const biografiaGuardada = localStorage.getItem("biografia");
    if (biografiaGuardada && elemBio) {
        elemBio.textContent = biografiaGuardada;
    }

    if (selectTema) selectTema.value = temaGuardado;

    const idiomaGuardadoInicial = localStorage.getItem("bubo_idioma") || "es";
    if (selectIdioma) selectIdioma.value = idiomaGuardadoInicial;

    // Sincroniza perfil, tema e idioma desde Firestore si hay sesión activa
    if (idUsuario) {
        try {
            const snap = await getDoc(doc(db, "usuarios", idUsuario));
            if (snap.exists()) {
                const datos = snap.data();

                if (datos.usuario) {
                    localStorage.setItem("usuario", datos.usuario);
                    if (elemUsuario) elemUsuario.textContent = datos.usuario;
                }
                if (datos.biografia) {
                    localStorage.setItem("biografia", datos.biografia);
                    if (elemBio) elemBio.textContent = datos.biografia;
                }
                if (datos.foto) {
                    localStorage.setItem("FtoP", datos.foto);
                    if (imgP) imgP.src = datos.foto;
                }
                // Recupera el tema guardado en Firestore para este usuario y lo aplica
                if (datos.tema) {
                    localStorage.setItem("bubo_tema", datos.tema);
                    aplicarTemaVisual(datos.tema);
                    if (selectTema) selectTema.value = datos.tema;
                }
                // Recupera el idioma guardado en Firestore si existe
                if (datos.idioma) {
                    localStorage.setItem("bubo_idioma", datos.idioma);
                    if (selectIdioma) selectIdioma.value = datos.idioma;
                }
            }
        } catch (error) {
            console.error("Error al cargar datos del perfil desde Firestore:", error);
        }
    }

    // --- 2. LÓGICA DEL POPUP DE EDITAR PERFIL ---
    const btnEditar = document.getElementById("BTEP");
    const popupPerfil = document.getElementById("POPUPP");
    const btnGuardarPerfil = document.getElementById("BTAEP");

    const inputUsuarioE = document.getElementById("usuarioE");
    const textareaBioE = document.getElementById("biografiaE");
    const txtUsuario = document.getElementById("usuario");
    const txtBio = document.getElementById("biografia");

    const inputImgE = document.getElementById("ImgPE");
    const imgPerfilActual = document.getElementById("ImgPEActual");
    const imgPerfilHeader = document.getElementById("ImgP");

    let nuevaFotoBase64 = null;

    // Abre el popup de editar perfil cargando los valores actuales
    if (btnEditar && popupPerfil) {
        btnEditar.addEventListener("click", () => {
            nuevaFotoBase64 = null;
            if (inputUsuarioE) inputUsuarioE.value = txtUsuario ? txtUsuario.textContent : "";
            if (textareaBioE) textareaBioE.value = txtBio && txtBio.textContent !== "Escribe tu biografía" ? txtBio.textContent : "";
            if (imgPerfilActual) imgPerfilActual.src = localStorage.getItem("FtoP") || "../../assets/logo.png";
            popupPerfil.style.display = "flex";
        });
    }

    // Guarda los cambios de nombre, biografía y foto en localStorage y Firestore
    if (btnGuardarPerfil) {
        btnGuardarPerfil.addEventListener("click", async () => {
            const nuevoUsuario = inputUsuarioE ? inputUsuarioE.value.trim() : "";
            const nuevaBio = textareaBioE ? textareaBioE.value.trim() : "";

            const usuarioFinal = nuevoUsuario !== "" ? nuevoUsuario : (localStorage.getItem("usuario") || "");
            const bioFinal = nuevaBio !== "" ? nuevaBio : "Escribe tu biografía";
            const fotoFinal = nuevaFotoBase64 || localStorage.getItem("FtoP") || "";

            if (usuarioFinal !== "") {
                localStorage.setItem("usuario", usuarioFinal);
                if (txtUsuario) txtUsuario.textContent = usuarioFinal;
            }

            localStorage.setItem("biografia", bioFinal);
            if (txtBio) txtBio.textContent = bioFinal;

            if (fotoFinal !== "") {
                localStorage.setItem("FtoP", fotoFinal);
                if (imgPerfilHeader) imgPerfilHeader.src = fotoFinal;
            }

            // Guarda los cambios en Firestore si hay usuario activo
            if (idUsuario) {
                try {
                    const datosActualizar = {
                        usuario: usuarioFinal,
                        biografia: bioFinal
                    };
                    if (fotoFinal !== "") {
                        datosActualizar.foto = fotoFinal;
                    }
                    await setDoc(doc(db, "usuarios", idUsuario), datosActualizar, { merge: true });
                } catch (error) {
                    console.error("Error al guardar perfil en Firestore:", error);
                }
            }

            CerrarPopupP("POPUPP");
        });
    }

    // Lee la imagen seleccionada desde el dispositivo y genera una vista previa en Base64
    if (inputImgE) {
        inputImgE.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    nuevaFotoBase64 = event.target.result;
                    if (imgPerfilActual) imgPerfilActual.src = nuevaFotoBase64;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- 3. LÓGICA DEL POPUP DE CONFIGURACIÓN (TEMAS VISUALES GLOBALES) ---
    // Abre el popup de configuración
    if (btnAbrirConfig) {
        btnAbrirConfig.addEventListener("click", (e) => {
            e.preventDefault();
            const popConfig = document.getElementById("POPUP_CONFIG");
            if (popConfig) popConfig.style.display = "flex";
        });
    }

    // Guarda el tema visual elegido en localStorage y Firestore
    if (btnGuardarConfig) {
        btnGuardarConfig.addEventListener("click", async () => {
            const temaElegido = selectTema ? selectTema.value : "clasico";

            localStorage.setItem("bubo_tema", temaElegido);
            aplicarTemaVisual(temaElegido);

            if (idUsuario) {
                try {
                    await setDoc(
                        doc(db, "usuarios", idUsuario),
                        { tema: temaElegido },
                        { merge: true }
                    );
                } catch (error) {
                    console.error("Error al guardar tema en Firestore:", error);
                }
            }

            CerrarPopupP("POPUP_CONFIG");
        });
    }

    // --- 4. LÓGICA DEL POPUP DE IDIOMA (GUARDADO Y APLICACIÓN CON GOOGLE TRANSLATE) ---
    // Abre el popup de idioma
    if (btnAbrirIdioma) {
        btnAbrirIdioma.addEventListener("click", (e) => {
            e.preventDefault();
            const popIdioma = document.getElementById("POPUP_IDIOMA");
            if (popIdioma) popIdioma.style.display = "flex";
        });
    }

    // Guarda el idioma elegido en localStorage y Firestore, y activa Google Translate
    if (btnGuardarIdioma) {
        btnGuardarIdioma.addEventListener("click", async () => {
            const idiomaElegido = selectIdioma ? selectIdioma.value : "es";
            localStorage.setItem("bubo_idioma", idiomaElegido);

            if (idUsuario) {
                try {
                    await setDoc(doc(db, "usuarios", idUsuario), { idioma: idiomaElegido }, { merge: true });
                } catch (error) {
                    console.error("Error al guardar idioma en Firestore:", error);
                }
            }

            CerrarPopupP("POPUP_IDIOMA");
            activarTraduccionGoogle(idiomaElegido);
        });
    }

    // --- 5. CERRAR SESIÓN ---
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", async (e) => {
            e.preventDefault();

            // Pide confirmación antes de cerrar sesión
            const confirmar = confirm("¿Estás seguro de que querés cerrar sesión?");
            if (!confirmar) return;

            try {
                await signOut(auth);
            } catch (error) {
                console.error("Error al cerrar sesión en Firebase Auth:", error);
            }

            // Limpia los datos de sesión y preferencias del usuario en localStorage
            localStorage.removeItem("usuarioActivo");
            localStorage.removeItem("emailUsuario");
            localStorage.removeItem("usuario");
            localStorage.removeItem("biografia");
            localStorage.removeItem("FtoP");
            localStorage.removeItem("bubo_tema");
            localStorage.removeItem("bubo_idioma");
            aplicarTemaVisual("clasico");
            activarTraduccionGoogle("es", false);
            sessionStorage.clear();

            // Redirige a la página de inicio
            window.location.href = "/index.html";
        });
    }
});



/*agregado ayuda*/
// Expone CerrarPopupP en window para que funcione desde atributos onclick en el HTML
window.CerrarPopupP = CerrarPopupP;

const btnAyuda = document.getElementById("btn-ayuda-perfil");
const popupAyuda = document.getElementById("POPUP_AYUDA");

if (btnAyuda && popupAyuda) {
    btnAyuda.addEventListener("click", (e) => {
        e.preventDefault();
        popupAyuda.style.display = "block";
    });
}

function CerrarPopupAyuda() {
    if (popupAyuda) {
        popupAyuda.style.display = "none";
    }
}

window.CerrarPopupAyuda = CerrarPopupAyuda;