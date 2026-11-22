// Importa `doc` y `setDoc` desde Firestore para guardar/actualizar el perfil del usuario.
import { doc, setDoc } from "firebase/firestore";
// Importa las funciones de Firebase Auth para registrar, iniciar sesión, recargar estado y enviar verificación.
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    reload
} from "firebase/auth";
// Importa `db` y `auth` desde tu archivo `firebase.js` en la misma carpeta JS.
import { db, auth } from "./firebase.js";

async function ValUsua() {
    // Obtiene los inputs y los párrafos de error individuales desde el HTML.
    const inputUsuario = document.getElementById("usuario");
    const inputEmail = document.getElementById("email");
    const inputContraseña = document.getElementById("contraseña");
    const foto = document.getElementById("FtoP").files[0];

    const errorUsuario = document.getElementById("eu");
    const errorEmail = document.getElementById("ee");
    const errorContraseña = document.getElementById("ec");
    const errorFoto = document.getElementById("ef");

    // Limpia mensajes anteriores antes de validar de nuevo.
    if (errorUsuario) errorUsuario.textContent = "";
    if (errorEmail) errorEmail.textContent = "";
    if (errorContraseña) errorContraseña.textContent = "";
    if (errorFoto) errorFoto.textContent = "";

    // Limpia espacios externos en usuario y mail; en `contraseña` no usamos trim().
    const usuario = inputUsuario ? inputUsuario.value.trim() : "";
    const email = inputEmail ? inputEmail.value.trim() : "";
    const contraseña = inputContraseña ? inputContraseña.value : ""; // Contraseña propia de la app, no la del mail

    // Reglas y límites de validación.
    const maxCaracteresUsuario = 15;
    const minCaracteresContraseña = 6;
    const maxPesoKB = 500;
    const maxPesoBytes = maxPesoKB * 1024;
    const formatoEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let hayError = false;

    // 1. `usuario` es opcional: solo revisa largo si escribió algo.
    if (usuario.length > maxCaracteresUsuario) {
        if (errorUsuario) {
            errorUsuario.textContent = `El usuario no puede superar los ${maxCaracteresUsuario} caracteres.`;
        }
        hayError = true;
    }

    // 2. `email` es obligatorio y debe tener formato válido.
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

    // 3. `contraseña` es obligatoria (clave propia de la app, mínimo 6 caracteres).
    if (contraseña === "") {
        if (errorContraseña) {
            errorContraseña.textContent = "Ingrese una contraseña para su cuenta.";
        }
        hayError = true;
    } else if (contraseña.length < minCaracteresContraseña) {
        if (errorContraseña) {
            errorContraseña.textContent = `La contraseña debe tener al menos ${minCaracteresContraseña} caracteres.`;
        }
        hayError = true;
    }

    // 4. `foto` es opcional: hasta 500 KB.
    if (foto && foto.size > maxPesoBytes) {
        if (errorFoto) {
            errorFoto.textContent = `La foto es muy pesada. Elegí una de hasta ${maxPesoKB} KB.`;
        }
        hayError = true;
    }

    // Si hay errores en los campos, frena acá.
    if (hayError) {
        return;
    }

    // ID en Firestore: correo en minúsculas.
    const idUsuario = email.toLowerCase();

    // Convierte la foto a Data URL si existe; si no, devuelve "".
    function leerFotoComoDataURL(archivoFoto) {
        return new Promise((resolve, reject) => {
            if (!archivoFoto) {
                resolve("");
                return;
            }
            const lector = new FileReader();
            lector.onload = () => resolve(lector.result);
            lector.onerror = () => reject(new Error("No se pudo leer la imagen."));
            lector.readAsDataURL(archivoFoto);
        });
    }

    // Guarda o actualiza los datos en Firestore y `localStorage`.
    async function guardarDatosUsuario() {
        const fotoData = await leerFotoComoDataURL(foto);
        const datosUsuario = {
            email: idUsuario,
            usuario: usuario,
            contraseña: contraseña
        };

        if (fotoData) {
            datosUsuario.foto = fotoData;
        }

        await setDoc(doc(db, "usuarios", idUsuario), datosUsuario, { merge: true });

        localStorage.setItem("usuarioActivo", idUsuario);
        localStorage.setItem("emailUsuario", idUsuario);
        localStorage.setItem("usuario", usuario);
    }

    try {
        // Caso 1: Correo nuevo -> crea cuenta en Auth, guarda datos y manda correo de verificación.
        const credenciales = await createUserWithEmailAndPassword(auth, idUsuario, contraseña);
        await guardarDatosUsuario();
        await sendEmailVerification(credenciales.user);

        // Marca que esta cuenta está esperando verificación sin necesidad de recargar toda la página.
        localStorage.setItem("pendienteVerificacion", idUsuario);

        if (errorEmail) {
            errorEmail.textContent = `Te enviamos un enlace a ${idUsuario}. Revisá tu email (y spam) y verifique su mail para continuar.`;
        }
    } catch (error) {
        // Caso 2: El correo ya existía en Firebase Auth.
        if (error.code === "auth/email-already-in-use") {
            try {
                const credExistente = await signInWithEmailAndPassword(auth, idUsuario, contraseña);
                // Consulta el estado real en Firebase Auth sin necesidad de recargar toda la web.
                await reload(credExistente.user);

                const estabaPendiente = localStorage.getItem("pendienteVerificacion") === idUsuario;

                if (credExistente.user.emailVerified) {
                    if (estabaPendiente) {
                        // Recién verificó tras registrarse: limpia la marca, guarda y pasa directo a `/basico.html`.
                        localStorage.removeItem("pendienteVerificacion");
                        await guardarDatosUsuario();
                        window.location.href = "/basico.html";
                    } else {
                        // Ya estaba verificada de antes: avisa que ya está registrada.
                        if (errorEmail) {
                            errorEmail.textContent = "cuenta ya registrada, inicie sesion o cambie sus datos";
                        }
                    }
                } else {
                    // Todavía no verificó su correo: avisa que revise su email y lo verifique para continuar.
                    if (errorEmail) {
                        errorEmail.textContent = `Revisá tu email (${idUsuario}) y verifique su mail para continuar.`;
                    }
                }
            } catch (errorLogin) {
                console.error("Error al comprobar la cuenta existente:", errorLogin);
                if (errorLogin.code === "auth/wrong-password" || errorLogin.code === "auth/invalid-credential") {
                    if (errorContraseña) {
                        errorContraseña.textContent = "La contraseña no coincide con la cuenta registrada para este correo.";
                    }
                } else {
                    if (errorEmail) {
                        errorEmail.textContent = "No se pudo comprobar el estado de tu correo.";
                    }
                }
            }
        } else if (error.code === "auth/invalid-email") {
            if (errorEmail) {
                errorEmail.textContent = "El correo electrónico no es válido.";
            }
        } else if (error.code === "auth/weak-password") {
            if (errorContraseña) {
                errorContraseña.textContent = "La contraseña es muy débil (usá al menos 6 caracteres).";
            }
        } else {
            console.error("Error en el registro:", error);
            if (errorEmail) {
                errorEmail.textContent = "Hubo un problema al procesar el registro.";
            }
        }
    }
}

// LÓGICA DE VISTA PREVIA DE LA FOTO
document.addEventListener('DOMContentLoaded', () => {
    const inputArchivo = document.getElementById('FtoP');
    const previewImg = document.getElementById('preview-img');
    const textoArchivo = document.getElementById('texto-archivo');

    if (inputArchivo && previewImg) {
        inputArchivo.addEventListener('change', function(e) {
            const archivo = e.target.files[0];

            if (archivo) {
                textoArchivo.textContent = archivo.name;

                const urlImagen = URL.createObjectURL(archivo);
                previewImg.src = urlImagen;
                previewImg.style.setProperty('display', 'block', 'important');
            } else {
                textoArchivo.textContent = 'Ningún archivo seleccionado';
                previewImg.style.setProperty('display', 'none', 'important');
            }
        });
    } else {
        console.error("Error: No se encontró el input 'FtoP' o la imagen 'preview-img' en el HTML.");
    }
});

window.ValUsua = ValUsua;