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