
document.addEventListener("DOMContentLoaded", () => {

    const elementos = document.querySelectorAll(
        "body > *:not(.BarraNav):not(.BarraBaj)"
    );

    const observador = new IntersectionObserver((entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
            } else {
                entrada.target.classList.remove("visible");
            }

        });

    }, {
        threshold: 0
    });

    elementos.forEach((elemento) => {
        elemento.classList.add("aparecer");
        observador.observe(elemento);
    });

});