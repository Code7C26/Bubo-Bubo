// Importa `doc` y `getDoc` desde Firestore para buscar el usuario en la colección `usuarios`.
import { doc, getDoc } from "firebase/firestore";
// Importa las funciones de Firebase Auth para iniciar sesión, recargar estado y reenviar verificación.
import {
    signInWithEmailAndPassword,
    reload,
    sendEmailVerification
} from "firebase/auth";
// Importa `db` y `auth` desde tu archivo `firebase.js` en la misma carpeta JS.
import { db, auth } from "./firebase.js";

async function ValInicioSesion() {
    // Obtiene los inputs y los párrafos de error de inicio de sesión desde el HTML.
    const inputEmail = document.getElementById("emailis");
    const inputContraseña = document.getElementById("contrais");

    const errorEmail = document.getElementById("eei");
    const errorContraseña = document.getElementById("eci");

    // Limpia mensajes anteriores antes de validar.
    if (errorEmail) errorEmail.textContent = "";
    if (errorContraseña) errorContraseña.textContent = "";

    // Limpia espacios externos del correo; no tocamos la contraseña por si tiene espacios intencionales.
    const email = inputEmail ? inputEmail.value.trim() : "";
    const contraseña = inputContraseña ? inputContraseña.value : "";

    const formatoEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hayError = false;

    // 1. Validación de correo.
    if (email === "") {
        if (errorEmail) {
            errorEmail.textContent = "Ingrese su correo electrónico para continuar.";
        }
        hayError = true;
    } else if (!formatoEmailValido.test(email)) {
        if (errorEmail) {
            errorEmail.textContent = "Ingrese una dirección de correo válida.";
        }
        hayError = true;
    }

    // 2. Validación de contraseña.
    if (contraseña === "") {
        if (errorContraseña) {
            errorContraseña.textContent = "Ingrese su contraseña para continuar.";
        }
        hayError = true;
    }

    // Si algún campo falló, frena acá.
    if (hayError) {
        return;
    }

    // ID del documento en Firestore: correo en minúsculas.
    const idUsuario = email.toLowerCase();

    try {
        // Inicia sesión en Firebase Auth con el correo y la contraseña de la app.
        const credenciales = await signInWithEmailAndPassword(auth, idUsuario, contraseña);

        // Actualiza los datos del usuario para verificar si ya confirmó su correo.
        await reload(credenciales.user);

        if (!credenciales.user.emailVerified) {
            await sendEmailVerification(credenciales.user);
            if (errorEmail) {
                errorEmail.textContent = `Tu correo todavía no está verificado. Revisá tu email (${idUsuario}) y verifique su mail para continuar.`;
            }
            return;
        }

        // Busca el documento del usuario en Firestore (`usuarios/<correo_en_minusculas>`).
        const docRef = doc(db, "usuarios", idUsuario);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            if (errorEmail) {
                errorEmail.textContent = "No se encontraron los datos de esta cuenta en la base de datos.";
            }
            return;
        }

        const datosUsuario = docSnap.data();

        // Guarda los datos de sesión en `localStorage` para el resto de la app.
        localStorage.setItem("usuarioActivo", idUsuario);
        localStorage.setItem("emailUsuario", idUsuario);
        localStorage.setItem("usuario", datosUsuario.usuario || "");

        // Pasa a la página principal.
        window.location.href = "/basico.html";
    } catch (error) {
        console.error("Error al iniciar sesión:", error);

        if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
        ) {
            if (errorContraseña) {
                errorContraseña.textContent = "Correo o contraseña incorrectos.";
            }
        } else if (error.code === "auth/invalid-email") {
            if (errorEmail) {
                errorEmail.textContent = "El correo electrónico no es válido.";
            }
        } else if (error.code === "auth/too-many-requests") {
            if (errorContraseña) {
                errorContraseña.textContent = "Demasiados intentos fallidos. Esperá un momento y volvé a intentarlo.";
            }
        } else {
            if (errorEmail) {
                errorEmail.textContent = "Hubo un problema al iniciar sesión.";
            }
        }
    }
}

// Expone `ValInicioSesion` en `window` para llamarla desde `onclick="ValInicioSesion()"` en el HTML.
window.ValInicioSesion = ValInicioSesion;