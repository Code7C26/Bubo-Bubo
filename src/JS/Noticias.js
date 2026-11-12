document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("lista-noticias");
    
    // Feed RSS de Economía de Ámbito Financiero convertido a JSON automáticamente
    const rssUrl = encodeURIComponent("https://www.ambito.com/rss/pages/economia.xml");
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error("Error en la respuesta de red");
            return response.json();
        })
        .then(data => {
            if (data.status === "ok" && data.items.length > 0) {
                mostrarNoticias(data.items);
            } else {
                cargarRespaldo();
            }
        })
        .catch(error => {
            console.error("No se pudieron cargar las noticias en vivo:", error);
            cargarRespaldo();
        });

    function mostrarNoticias(articulos) {
        contenedor.innerHTML = ""; // Limpia el mensaje de "Cargando..."

        // Mostramos las 6 noticias más recientes
        articulos.slice(0, 6).forEach(noticia => {
            // Limpiamos etiquetas HTML que a veces vienen en la descripción del RSS
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = noticia.description;
            const textoLimpio = tempDiv.textContent || tempDiv.innerText || "";

            // Formateamos la fecha
            const fecha = new Date(noticia.pubDate).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });

            // Buscamos imagen en thumbnail o enclosure, si no trae, usamos el logo
            const imagen = noticia.thumbnail || (noticia.enclosure && noticia.enclosure.link) || "../../assets/bubo (2).png";

            const tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta-noticia";
            tarjeta.innerHTML = `
                <img src="${imagen}" alt="Imagen de la noticia" onerror="this.src='../../assets/bubo (2).png'">
                <div class="contenido-noticia">
                    <span class="fecha-noticia">${fecha}</span>
                    <h3>${noticia.title}</h3>
                    <p>${textoLimpio.slice(0, 140)}...</p>
                    <a href="${noticia.link}" target="_blank" rel="noopener noreferrer">
                        <button type="button">Leer nota completa</button>
                    </a>
                </div>
            `;
            contenedor.appendChild(tarjeta);
        });
    }

    // Noticias de respaldo por si falla la API o estás probando sin internet
    function cargarRespaldo() {
        const respaldo = [
            {
                title: "Evolución de la inflación y tasas de interés en el mercado local",
                pubDate: new Date().toISOString(),
                description: "Análisis sobre el impacto de las últimas medidas económicas en el ahorro y el poder adquisitivo.",
                link: "https://www.ambito.com/economia",
                thumbnail: "../../assets/bubo (2).png"
            },
            {
                title: "Actualización de rendimientos en billeteras virtuales y plazos fijos",
                pubDate: new Date().toISOString(),
                description: "Comparativa de las tasas actuales ofrecidas por bancos tradicionales y fondos Money Market.",
                link: "https://www.ambito.com/finanzas",
                thumbnail: "../../assets/bubo (2).png"
            }
        ];
        mostrarNoticias(respaldo);
    }
});