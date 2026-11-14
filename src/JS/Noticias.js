document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("lista-noticias");
    
    if (!contenedor) return;
    contenedor.innerHTML = `<p style="margin-left: 0; color: #022b43;">Actualizando noticias económicas en vivo...</p>`;

    // Feed RSS de Economía de Ámbito Financiero
    const rssUrl = encodeURIComponent("https://www.ambito.com/rss/pages/economia.xml");
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error("Error en la red");
            return response.json();
        })
        .then(data => {
            if (data.status === "ok" && data.items && data.items.length > 0) {
                mostrarNoticiasEnVivo(data.items);
            } else {
                throw new Error("Sin ítems en el RSS");
            }
        })
        .catch(error => {
            console.error("No se pudo conectar al feed en vivo:", error);
            contenedor.innerHTML = `<p style="margin-left: 0; color: #d9534f;">No se pudo conectar con el servicio de noticias en vivo.</p>`;
        });

    function mostrarNoticiasEnVivo(articulos) {
        contenedor.innerHTML = ""; // Limpia el cargando

        // Banco inteligente de imágenes temáticas financieras de alta calidad
        const imagenesDinamicas = [
            "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80", // Gráficos / Bolsa
            "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80", // Monedas / Ahorro
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80", // Tecnología financiera / Billeteras
            "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=80", // Inversiones / Crecimiento
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80", // Planificación / Economía
            "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&auto=format&fit=crop&q=80"  // Negocios / Análisis
        ];

        articulos.slice(0, 6).forEach((noticia, index) => {
            // Limpiamos texto del HTML del RSS
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = noticia.description || "";
            const textoLimpio = tempDiv.textContent || tempDiv.innerText || "";

            // Fecha real de la noticia
            const fechaPub = noticia.pubDate ? new Date(noticia.pubDate).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }) : "Hoy";

            // Asignación automática rotativa de imagen temática según el orden de la noticia en vivo
            const imagenAsignada = imagenesDinamicas[index % imagenesDinamicas.length];

            const tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta-noticia";
            tarjeta.innerHTML = `
                <img src="${imagenAsignada}" alt="${noticia.title}">
                <div class="contenido-noticia">
                    <span class="fecha-noticia">${fechaPub}</span>
                    <h3>${noticia.title}</h3>
                    <p>${textoLimpio.slice(0, 130)}...</p>
                    <a href="${noticia.link}" target="_blank" rel="noopener noreferrer">
                        <button type="button">Leer más</button>
                    </a>
                </div>
            `;
            contenedor.appendChild(tarjeta);
        });
    }
});