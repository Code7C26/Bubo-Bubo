import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase.js";

let temaSeleccionado = "";
const MAX_TARJETAS_POR_TEMA = 1;

function obtenerIdUsuario() {
    return (
        localStorage.getItem("usuarioActivo") ||
        localStorage.getItem("emailUsuario") ||
        ""
    ).toLowerCase();
}

async function guardarCajasEnFirestore(guardadas) {
    localStorage.setItem("cajasAmarillasBubo", JSON.stringify(guardadas));

    const idUsuario = obtenerIdUsuario();
    if (!idUsuario) return;

    try {
        await setDoc(
            doc(db, "usuarios", idUsuario),
            { cajasAmarillasBubo: guardadas },
            { merge: true }
        );
    } catch (error) {
        console.error("Error al guardar las notas en Firestore:", error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await cargarNotasGuardadas();
    actualizarEstadoBotonesMas();
});

function moverCarrusel(idPista, direccion) {
    const pista = document.getElementById(idPista);
    if (!pista) return;
    const desplazamiento = 302;
    pista.scrollBy({
        left: direccion * desplazamiento,
        behavior: "smooth"
    });
}

function toggleNotas(idContenedor) {
    const contenedorActual = document.getElementById(idContenedor);
    if (!contenedorActual) return;

    const todosLosContenedores = document.querySelectorAll(".contenedor-notas-desplegable");
    todosLosContenedores.forEach(cont => {
        if (cont.id !== idContenedor) {
            cont.style.display = "none";
        }
    });

    if (contenedorActual.style.display === "none" || contenedorActual.style.display === "") {
        contenedorActual.style.display = "block";
    } else {
        contenedorActual.style.display = "none";
    }
}

function abrirModalTarjeta(idNotas) {
    const guardadas = JSON.parse(localStorage.getItem("cajasAmarillasBubo")) || [];
    const cantidadEnEsteTema = guardadas.filter(c => c.tema === idNotas).length;

    if (cantidadEnEsteTema >= MAX_TARJETAS_POR_TEMA) {
        alert("Ya agregaste el máximo de tarjetitas extra en este tema.");
        return;
    }

    temaSeleccionado = idNotas;
    document.getElementById("input-titulo").value = "";
    document.getElementById("input-contenido").value = "";
    document.getElementById("modal-tarjeta").style.display = "block";
}

function cerrarModalTarjeta() {
    document.getElementById("modal-tarjeta").style.display = "none";
}

async function guardarUnaTarjeta() {
    const titulo = document.getElementById("input-titulo").value.trim();
    const contenido = document.getElementById("input-contenido").value.trim();

    if (!titulo || !contenido) {
        alert("Por favor completá tanto el título como el contenido.");
        return;
    }

    const guardadas = JSON.parse(localStorage.getItem("cajasAmarillasBubo")) || [];
    const cantidadEnEsteTema = guardadas.filter(c => c.tema === temaSeleccionado).length;

    if (cantidadEnEsteTema >= MAX_TARJETAS_POR_TEMA) {
        alert("Solo podés agregar hasta el límite de tarjetitas extra por tema.");
        cerrarModalTarjeta();
        return;
    }

    const nuevaCaja = {
        id: Date.now(),
        tema: temaSeleccionado,
        titulo: titulo,
        contenido: contenido
    };

    guardadas.push(nuevaCaja);
    await guardarCajasEnFirestore(guardadas);

    renderizarCajaAmarilla(nuevaCaja);
    actualizarEstadoBotonesMas();
    cerrarModalTarjeta();
}

function renderizarCajaAmarilla(caja) {
    const contenedorNotas = document.getElementById(caja.tema);
    if (!contenedorNotas) return;

    const listaCajas = contenedorNotas.querySelector(".lista-cajas-amarillas");
    if (!listaCajas) return;

    if (listaCajas.querySelector(`.caja-explicacion-amarilla[data-id="${caja.id}"]`)) {
        return;
    }

    const divCaja = document.createElement("div");
    divCaja.className = "caja-explicacion-amarilla";
    divCaja.setAttribute("data-id", caja.id);

    divCaja.innerHTML = `
        <button type="button" class="btn-borrar-caja" title="Eliminar tarjeta" onclick="eliminarCajaAmarilla(${caja.id})">✕</button>
        <p><strong>• ${caja.titulo}:</strong> ${caja.contenido.replace(/\n/g, "<br>")}</p>
    `;

    listaCajas.appendChild(divCaja);
}

async function cargarNotasGuardadas() {
    let guardadas = JSON.parse(localStorage.getItem("cajasAmarillasBubo")) || [];
    guardadas.forEach(caja => renderizarCajaAmarilla(caja));

    const idUsuario = obtenerIdUsuario();
    if (!idUsuario) return;

    try {
        const snap = await getDoc(doc(db, "usuarios", idUsuario));
        if (snap.exists() && Array.isArray(snap.data().cajasAmarillasBubo)) {
            guardadas = snap.data().cajasAmarillasBubo;
            localStorage.setItem("cajasAmarillasBubo", JSON.stringify(guardadas));

            guardadas.forEach(caja => renderizarCajaAmarilla(caja));
            actualizarEstadoBotonesMas();
        }
    } catch (error) {
        console.error("Error al cargar las notas desde Firestore:", error);
    }
}

async function eliminarCajaAmarilla(idCaja) {
    if (!confirm("¿Quieres eliminar esta nota?")) {
        return;
    }

    let guardadas = JSON.parse(localStorage.getItem("cajasAmarillasBubo")) || [];
    guardadas = guardadas.filter(c => c.id !== idCaja);
    await guardarCajasEnFirestore(guardadas);

    const elemento = document.querySelector(`.caja-explicacion-amarilla[data-id="${idCaja}"]`);
    if (elemento) {
        elemento.remove();
    }

    actualizarEstadoBotonesMas();
}

function actualizarEstadoBotonesMas() {
    const guardadas = JSON.parse(localStorage.getItem("cajasAmarillasBubo")) || [];
    const contenedores = document.querySelectorAll(".contenedor-notas-desplegable");

    contenedores.forEach(contenedor => {
        const idNotas = contenedor.id;
        const btnMas = contenedor.querySelector(".btn-mas-tarjeta");
        if (!btnMas || !idNotas) return;

        const cantidad = guardadas.filter(c => c.tema === idNotas).length;
        btnMas.style.display = cantidad >= MAX_TARJETAS_POR_TEMA ? "none" : "flex";
    });
}

window.moverCarrusel = moverCarrusel;
window.toggleNotas = toggleNotas;
window.abrirModalTarjeta = abrirModalTarjeta;
window.cerrarModalTarjeta = cerrarModalTarjeta;
window.guardarUnaTarjeta = guardarUnaTarjeta;
window.eliminarCajaAmarilla = eliminarCajaAmarilla;