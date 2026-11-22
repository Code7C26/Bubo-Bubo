// ==========================================
// FUNCIONES DE EVALUACIÓN POR BLOQUE
// ==========================================

// Evalúa las 4 preguntas del Bloque 1
function B1() {
    let cont = 0; // Contador de respuestas correctas

    // Obtiene el input radio seleccionado en cada pregunta (o null si no se marcó ninguno)
    const R1 = document.querySelector('input[name="pregunta1"]:checked');
    const R2 = document.querySelector('input[name="pregunta2"]:checked');
    const R3 = document.querySelector('input[name="pregunta3"]:checked');
    const R4 = document.querySelector('input[name="pregunta4"]:checked');

    // Verifica que todas las preguntas tengan una opción marcada
    if (!R1 || !R2 || !R3 || !R4) {
        alert("Complete todas las preguntas para continuar");
        return; // Corta la ejecución si falta responder alguna
    }

    // Mapa con la opción elegida y la respuesta correcta de cada pregunta
    const respuestas = {
        pregunta1: { seleccionada: R1, correcta: "c" },
        pregunta2: { seleccionada: R2, correcta: "a" }, // 50.000 * 0,05 * 3 = 7.500
        pregunta3: { seleccionada: R3, correcta: "a" },
        pregunta4: { seleccionada: R4, correcta: "d" }
    };

    // Recorre cada pregunta para corregir y pintar las opciones
    Object.entries(respuestas).forEach(([nombre, { seleccionada, correcta }]) => {
        if (seleccionada.value === correcta) {
            cont++; // Suma un acierto
            seleccionada.parentElement.style.backgroundColor = "#47f175"; // Verde para correcta
        } else {
            seleccionada.parentElement.style.backgroundColor = "#de3445"; // Rojo para incorrecta

            // Busca y resalta en verde cuál era la opción correcta
            const opcionCorrecta = document.querySelector(`input[name="${nombre}"][value="${correcta}"]`);
            if (opcionCorrecta) {
                opcionCorrecta.parentElement.style.backgroundColor = "#47f175";
            }
        }
    });

    // Muestra el puntaje final (ej: "3/4") en el párrafo con id="RTA"
    document.getElementById("RTA").innerHTML = `${cont}/4`;

    // Deshabilita el botón "Finalizar" para evitar que se reenvíe el examen ya corregido
    const btnFinalizar = document.getElementById("Ter");
    if (btnFinalizar) {
        btnFinalizar.disabled = true;
    }
}

// Evalúa las 4 preguntas del Bloque 2
function B2() {
    let cont = 0;

    const R1 = document.querySelector('input[name="pregunta1"]:checked');
    const R2 = document.querySelector('input[name="pregunta2"]:checked');
    const R3 = document.querySelector('input[name="pregunta3"]:checked');
    const R4 = document.querySelector('input[name="pregunta4"]:checked');

    if (!R1 || !R2 || !R3 || !R4) {
        alert("Complete todas las preguntas para continuar");
        return;
    }

    const respuestas = {
        pregunta1: { seleccionada: R1, correcta: "a" },
        pregunta2: { seleccionada: R2, correcta: "d" },
        pregunta3: { seleccionada: R3, correcta: "a" },
        pregunta4: { seleccionada: R4, correcta: "d" }
    };

    Object.entries(respuestas).forEach(([nombre, { seleccionada, correcta }]) => {
        if (seleccionada.value === correcta) {
            cont++;
            seleccionada.parentElement.style.backgroundColor = "#47f175";
        } else {
            seleccionada.parentElement.style.backgroundColor = "#de3445";
            const opcionCorrecta = document.querySelector(`input[name="${nombre}"][value="${correcta}"]`);
            if (opcionCorrecta) {
                opcionCorrecta.parentElement.style.backgroundColor = "#47f175";
            }
        }
    });

    document.getElementById("RTA").innerHTML = `${cont}/4`;

    const btnFinalizar = document.getElementById("Ter");
    if (btnFinalizar) {
        btnFinalizar.disabled = true;
    }
}

// Evalúa las 4 preguntas del Bloque 3
function B3() {
    let cont = 0;

    const R1 = document.querySelector('input[name="pregunta1"]:checked');
    const R2 = document.querySelector('input[name="pregunta2"]:checked');
    const R3 = document.querySelector('input[name="pregunta3"]:checked');
    const R4 = document.querySelector('input[name="pregunta4"]:checked');

    if (!R1 || !R2 || !R3 || !R4) {
        alert("Complete todas las preguntas para continuar");
        return;
    }

    const respuestas = {
        pregunta1: { seleccionada: R1, correcta: "b" },
        pregunta2: { seleccionada: R2, correcta: "b" },
        pregunta3: { seleccionada: R3, correcta: "d" },
        pregunta4: { seleccionada: R4, correcta: "c" }
    };

    Object.entries(respuestas).forEach(([nombre, { seleccionada, correcta }]) => {
        if (seleccionada.value === correcta) {
            cont++;
            seleccionada.parentElement.style.backgroundColor = "#47f175";
        } else {
            seleccionada.parentElement.style.backgroundColor = "#de3445";
            const opcionCorrecta = document.querySelector(`input[name="${nombre}"][value="${correcta}"]`);
            if (opcionCorrecta) {
                opcionCorrecta.parentElement.style.backgroundColor = "#47f175";
            }
        }
    });

    document.getElementById("RTA").innerHTML = `${cont}/4`;

    const btnFinalizar = document.getElementById("Ter");
    if (btnFinalizar) {
        btnFinalizar.disabled = true;
    }
}

// ==========================================
// REINICIO Y ASIGNACIÓN DE EVENTOS
// ==========================================

// Recarga la página para reiniciar el examen y habilitar nuevamente los controles
function reini() {
    location.reload();
}

// Detecta automáticamente qué bloque corresponde según la URL actual
function obtenerEvaluadorPorRuta() {
    const ruta = window.location.pathname.toLowerCase();

    if (ruta.includes("bloque2")) return B2;
    if (ruta.includes("bloque3")) return B3;
    return B1; // Por defecto ejecuta B1 (ideal para bloque1t.html)
}

// Espera a que el DOM esté completamente cargado antes de vincular los botones
document.addEventListener("DOMContentLoaded", () => {
    const btnFinalizar = document.getElementById("Ter");
    const btnRehacer = document.getElementById("Rehacer");

    // Conecta el botón "Finalizar" con la función del bloque correspondiente
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", obtenerEvaluadorPorRuta());
    }

    // Conecta el botón "Rehacer" ya existente en el HTML con la función de reinicio
    if (btnRehacer) {
        btnRehacer.addEventListener("click", reini);
    }
});