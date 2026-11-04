document.addEventListener("DOMContentLoaded", () => {

    // Seleccionamos únicamente los elementos internos que deben animarse, no los fondos
    const elementos = document.querySelectorAll(
        ".nosotras h1, .nosotras p, .tarjeta-nosotras, .somos h1, .somos p, .bubo h1, .bubo p, .personajes h1"
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
        threshold: 0.1
    });

    elementos.forEach((elemento) => {
        // Ya no le inyectamos la clase acá a la fuerza; 
        // la idea es que las clases .aparecer estén solo donde vos querés en el HTML
        observador.observe(elemento);
    });

});