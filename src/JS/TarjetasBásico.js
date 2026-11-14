/*
let temaSeleccionado = "";
const MAX_TARJETAS_POR_TEMA = 2; // Límite estricto de 2 tarjetitas extra por cada tema

document.addEventListener("DOMContentLoaded", () => {
    cargarNotasGuardadas();
    actualizarEstadoBotonesMas();
});

// Abre el popup verificando antes que ese tema no haya llegado al límite de 2
function abrirModalTarjeta(idTema) {
    const guardadas = JSON.parse(localStorage.getItem("cajasAmarillasBubo")) || [];
    const cantidadEnEsteTema = guardadas.filter(c => c.tema === idTema).length;

    if (cantidadEnEsteTema >= MAX_TARJETAS_POR_TEMA) {
        alert("Ya agregaste el máximo de 2 tarjetitas extra en este tema.");
        return;
    }

    temaSeleccionado = idTema;
    document.getElementById("input-titulo").value = "";
    document.getElementById("input-contenido").value = "";
    document.getElementById("modal-tarjeta").style.display = "block";
}

function cerrarModalTarjeta() {
    document.getElementById("modal-tarjeta").style.display = "none";
}

// Guarda UNA sola tarjetita con su título y contenido
function guardarUnaTarjeta() {
    const titulo = document.getElementById("input-titulo").value.trim();
    const contenido = document.getElementById("input-contenido").value.trim();

    if (!titulo || !contenido) {
        alert("Por favor completá tanto el título como el contenido.");
        return;
    }

    const guardadas = JSON.parse(localStorage.getItem("cajasAmarillasBubo")) || [];
    const cantidadEnEsteTema = guardadas.filter(c => c.tema === temaSeleccionado).length;

    // Doble verificación del límite de 2
    if (cantidadEnEsteTema >= MAX_TARJETAS_POR_TEMA) {
        alert("Solo podés agregar hasta 2 tarjetitas extra por tema.");
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
    localStorage.setItem("cajasAmarillasBubo", JSON.stringify(guardadas));

    renderizarCajaAmarilla(nuevaCaja);
    actualizarEstadoBotonesMas();
    cerrarModalTarjeta();
}

// Dibuja la cajita amarilla dentro del contenedor correcto del tema
function renderizarCajaAmarilla(caja) {
    const tarjetaTema = document.getElementById(caja.tema);
    if (!tarjetaTema) return;

    const contenedorCajas = tarjetaTema.querySelector(".lista-cajas-amarillas");
    if (!contenedorCajas) return;

    const divCaja = document.createElement("div");
    divCaja.className = "caja-explicacion-amarilla";
    divCaja.setAttribute("data-id", caja.id);

    divCaja.innerHTML = `
        <button type="button" class="btn-borrar-caja" title="Eliminar tarjeta" onclick="eliminarCajaAmarilla(${caja.id})">✕</button>
        <p><strong>• ${caja.titulo}:</strong></p>
        <p style="padding-left: 14px;">${caja.contenido.replace(/\n/g, "<br>")}</p>
    `;

    contenedorCajas.appendChild(divCaja);
}

// Carga las tarjetitas guardadas al abrir o recargar la página
function cargarNotasGuardadas() {
    const guardadas = JSON.parse(localStorage.getItem("cajasAmarillasBubo")) || [];
    guardadas.forEach(caja => renderizarCajaAmarilla(caja));
}

// Borra una tarjetita y vuelve a habilitar el botón "+" si estaba oculto
function eliminarCajaAmarilla(idCaja) {
    let guardadas = JSON.parse(localStorage.getItem("cajasAmarillasBubo")) || [];
    guardadas = guardadas.filter(c => c.id !== idCaja);
    localStorage.setItem("cajasAmarillasBubo", JSON.stringify(guardadas));

    const elemento = document.querySelector(`.caja-explicacion-amarilla[data-id="${idCaja}"]`);
    if (elemento) {
        elemento.remove();
    }

    actualizarEstadoBotonesMas();
}

// Oculta el botón "+" en los temas que ya tienen 2 tarjetitas extra y lo muestra en los que tienen menos de 2
function actualizarEstadoBotonesMas() {
    const guardadas = JSON.parse(localStorage.getItem("cajasAmarillasBubo")) || [];
    const todasLasTarjetasTema = document.querySelectorAll(".tarjeta-tema");

    todasLasTarjetasTema.forEach(tarjeta => {
        const idTema = tarjeta.id;
        const btnMas = tarjeta.querySelector(".btn-mas-tarjeta");
        if (!btnMas || !idTema) return;

        const cantidad = guardadas.filter(c => c.tema === idTema).length;
        btnMas.style.display = cantidad >= MAX_TARJETAS_POR_TEMA ? "none" : "flex";
    });
}
*/



















let temaSeleccionado = "";
const MAX_TARJETAS_POR_TEMA = 1; // Límite de tarjetitas extra por cada tema

document.addEventListener("DOMContentLoaded", () => {
    cargarNotasGuardadas();
    actualizarEstadoBotonesMas();
});

// Función para desplazar horizontalmente el carrusel según la dirección (-1 izquierda, 1 derecha)
function moverCarrusel(idPista, direccion) {
    const pista = document.getElementById(idPista);
    const desplazamiento = 302; // Ancho de la tarjeta (280px) + el gap (22px)
    pista.scrollBy({
        left: direccion * desplazamiento,
        behavior: 'smooth'
    });
}

// Función para mostrar u ocultar las notas desplegables al hacer clic en "Ver notas"
function toggleNotas(idContenedor) {
    const contenedorActual = document.getElementById(idContenedor);
    if (!contenedorActual) return;
    
    // Opcional: cierra los demás contenedores abiertos para que solo quede uno visible a la vez
    const todosLosContenedores = document.querySelectorAll(".contenedor-notas-desplegable");
    todosLosContenedores.forEach(cont => {
        if (cont.id !== idContenedor) {
            cont.style.display = "none";
        }
    });

    // Alternamos el estado del contenedor actual
    if (contenedorActual.style.display === "none" || contenedorActual.style.display === "") {
        contenedorActual.style.display = "block";
    } else {
        contenedorActual.style.display = "none";
    }
}

// Abre el popup verificando antes que ese tema no haya llegado al límite
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

// Guarda una tarjetita con su título y contenido
function guardarUnaTarjeta() {
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
    localStorage.setItem("cajasAmarillasBubo", JSON.stringify(guardadas));

    renderizarCajaAmarilla(nuevaCaja);
    actualizarEstadoBotonesMas();
    cerrarModalTarjeta();
}

// Dibuja la cajita amarilla dentro de la lista de cajas del tema correspondiente
function renderizarCajaAmarilla(caja) {
    const contenedorNotas = document.getElementById(caja.tema);
    if (!contenedorNotas) return;

    const listaCajas = contenedorNotas.querySelector(".lista-cajas-amarillas");
    if (!listaCajas) return;

    const divCaja = document.createElement("div");
    divCaja.className = "caja-explicacion-amarilla";
    divCaja.setAttribute("data-id", caja.id);

    divCaja.innerHTML = `
        <button type="button" class="btn-borrar-caja" title="Eliminar tarjeta" onclick="eliminarCajaAmarilla(${caja.id})">✕</button>
        <p><strong>• ${caja.titulo}:</strong> ${caja.contenido.replace(/\n/g, "<br>")}</p>
    `;

    listaCajas.appendChild(divCaja);
}

// Carga las tarjetitas guardadas al abrir o recargar la página
function cargarNotasGuardadas() {
    const guardadas = JSON.parse(localStorage.getItem("cajasAmarillasBubo")) || [];
    guardadas.forEach(caja => renderizarCajaAmarilla(caja));
}

// Borra una tarjetita tras confirmación y vuelve a habilitar el botón "+" si corresponde
function eliminarCajaAmarilla(idCaja) {
    if (!confirm("¿Quieres eliminar esta nota?")) {
        return;
    }

    let guardadas = JSON.parse(localStorage.getItem("cajasAmarillasBubo")) || [];
    guardadas = guardadas.filter(c => c.id !== idCaja);
    localStorage.setItem("cajasAmarillasBubo", JSON.stringify(guardadas));

    const elemento = document.querySelector(`.caja-explicacion-amarilla[data-id="${idCaja}"]`);
    if (elemento) {
        elemento.remove();
    }

    actualizarEstadoBotonesMas();
}

// Oculta el botón "+" en los temas que ya alcanzaron el límite de tarjetitas extra
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
// Función para mostrar u ocultar las notas desplegables de la misma tarjeta
function toggleNotas(idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (contenedor) {
        if (contenedor.style.display === "none" || contenedor.style.display === "") {
            contenedor.style.display = "block";
        } else {
            contenedor.style.display = "none";
        }
    }
}