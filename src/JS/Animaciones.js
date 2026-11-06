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
