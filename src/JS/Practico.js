document.addEventListener("DOMContentLoaded", () => {
    // 1. Seleccionamos TODOS los carruseles que existan en la página
    const carruseles = document.querySelectorAll(".Carru");

    // 2. Recorremos cada carrusel uno por uno y le damos vida de forma independiente
    carruseles.forEach((carrusel) => {
        const track = carrusel.querySelector(".CarrIMG");
        const images = track.querySelectorAll("img");
        const btnPrev = carrusel.querySelector(".prev");
        const btnNext = carrusel.querySelector(".next");
        
        let index = 0;
        const totalImages = images.length;
        let intervalo;

        // Función para mover este carrusel en específico
        function actualizarCarrusel() {
            track.style.transform = `translateX(-${index * 100}%)`;
        }

        function siguienteImagen() {
            index = (index + 1) % totalImages;
            actualizarCarrusel();
        }

        function anteriorImagen() {
            index = (index - 1 + totalImages) % totalImages;
            actualizarCarrusel();
        }

        function iniciarAutoplay() {
            intervalo = setInterval(siguienteImagen, 3500);
        }

        function reiniciarAutoplay() {
            clearInterval(intervalo);
            iniciarAutoplay();
        }

        // Eventos de los botones de este carrusel
        btnNext.addEventListener("click", () => {
            siguienteImagen();
            reiniciarAutoplay();
        });

        btnPrev.addEventListener("click", () => {
            anteriorImagen();
            reiniciarAutoplay();
        });

        // Arrancamos el autoplay para este carrusel
        iniciarAutoplay();
    });
});