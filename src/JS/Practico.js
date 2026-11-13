document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("carruImg");
    const images = track.querySelectorAll("img");
    const btnPrev = document.getElementById("btnPrev");
    const btnNext = document.getElementById("btnNext");
    
    let index = 0;
    const totalImages = images.length;
    let intervalo;

    // Función principal para mover el carrusel
    function actualizarCarrusel() {
        // Desplaza la pista horizontalmente usando porcentajes (100% por cada imagen)
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    // Ir a la siguiente imagen
    function siguienteImagen() {
        index = (index + 1) % totalImages; // Si llega al final, vuelve a 0
        actualizarCarrusel();
    }

    // Ir a la imagen anterior
    function anteriorImagen() {
        index = (index - 1 + totalImages) % totalImages; // Si está en 0, va a la última
        actualizarCarrusel();
    }

    // Iniciar el movimiento automático (cada 3500 milisegundos = 3.5 segundos)
    function iniciarAutoplay() {
        intervalo = setInterval(siguienteImagen, 3500);
    }

    // Reiniciar el cronómetro si el usuario hace clic (para que no salte de golpe)
    function reiniciarAutoplay() {
        clearInterval(intervalo);
        iniciarAutoplay();
    }

    // Eventos para los botones
    btnNext.addEventListener("click", () => {
        siguienteImagen();
        reiniciarAutoplay();
    });

    btnPrev.addEventListener("click", () => {
        anteriorImagen();
        reiniciarAutoplay();
    });

    // Arrancamos el autoplay al cargar la página
    iniciarAutoplay();
});