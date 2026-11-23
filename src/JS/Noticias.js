document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("lista-noticias");
    if (!contenedor) return;

    contenedor.innerHTML = `<p style="margin-left: 0; color: #022b43;">Actualizando noticias económicas en vivo...</p>`;

    // Medios nacionales argentinos (sección Economía)
    const FUENTES = [
        { nombre: "Infobae", url: "https://www.infobae.com/arc/outboundfeeds/rss/category/economia/" },
        { nombre: "La Nación", url: "https://www.lanacion.com.ar/arc/outboundfeeds/rss/category/economia/?outputType=xml" }
    ];

    // Imágenes de respaldo (solo si la noticia no trae imagen o falla al cargar)
    const imagenesRespaldo = [
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&auto=format&fit=crop&q=80"
    ];

    // Pide un feed; si falla, devuelve lista vacía para no romper los demás
    async function cargarFuente(fuente) {
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(fuente.url)}`;
        const respuesta = await fetch(apiUrl);
        if (!respuesta.ok) throw new Error(`Error de red en ${fuente.nombre}`);
        const data = await respuesta.json();
        if (data.status !== "ok" || !data.items) throw new Error(`Feed inválido en ${fuente.nombre}`);
        return data.items.map(item => ({ ...item, medio: fuente.nombre }));
    }

    Promise.allSettled(FUENTES.map(cargarFuente)).then(resultados => {
        let noticias = [];
        resultados.forEach((r, i) => {
            if (r.status === "fulfilled") {
                noticias = noticias.concat(r.value);
            } else {
                console.error(`No se pudo cargar ${FUENTES[i].nombre}:`, r.reason);
            }
        });

        if (noticias.length === 0) {
            contenedor.innerHTML = `<p style="margin-left: 0; color: #d9534f;">No se pudo conectar con el servicio de noticias en vivo.</p>`;
            return;
        }

        // Más recientes primero
        noticias.sort((a, b) => parsearFecha(b.pubDate) - parsearFecha(a.pubDate));
        mostrarNoticias(noticias.slice(0, 6));
    });

    // rss2json entrega fechas tipo "2026-11-23 10:00:00" (UTC)
    function parsearFecha(texto) {
        if (!texto) return new Date(0);
        const d = new Date(texto.replace(" ", "T") + "Z");
        return isNaN(d) ? new Date(texto) : d;
    }

    // Busca la imagen real de la noticia en todos los lugares posibles del feed
    function obtenerImagenNoticia(noticia) {
        if (noticia.thumbnail) return noticia.thumbnail;

        if (noticia.enclosure && noticia.enclosure.link) {
            const tipo = noticia.enclosure.type || "";
            if (tipo.startsWith("image") || /\.(jpe?g|png|webp|gif)(\?|$)/i.test(noticia.enclosure.link)) {
                return noticia.enclosure.link;
            }
        }

        const temp = document.createElement("div");
        temp.innerHTML = (noticia.content || "") + (noticia.description || "");
        const img = temp.querySelector("img");
        if (img && img.getAttribute("src")) return img.getAttribute("src");

        return null;
    }

    function mostrarNoticias(articulos) {
        contenedor.innerHTML = "";

        articulos.forEach((noticia, index) => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = noticia.description || "";
            const textoLimpio = tempDiv.textContent || tempDiv.innerText || "";

            const fecha = parsearFecha(noticia.pubDate);
            const fechaPub = noticia.pubDate
                ? fecha.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" })
                : "Hoy";

            const respaldo = imagenesRespaldo[index % imagenesRespaldo.length];
            const imagenNoticia = obtenerImagenNoticia(noticia) || respaldo;

            const tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta-noticia";
            tarjeta.innerHTML = `
                <img src="${imagenNoticia}" alt="${noticia.title}" loading="lazy" referrerpolicy="no-referrer">
                <div class="contenido-noticia">
                    <span class="fecha-noticia">${fechaPub} · ${noticia.medio}</span>
                    <h3>${noticia.title}</h3>
                    <p>${textoLimpio.slice(0, 130)}...</p>
                    <a href="${noticia.link}" target="_blank" rel="noopener noreferrer">
                        <button type="button">Leer más</button>
                    </a>
                </div>
            `;

            const imgEl = tarjeta.querySelector("img");
            imgEl.addEventListener("error", () => {
                if (imgEl.src !== respaldo) imgEl.src = respaldo;
            }, { once: true });

            contenedor.appendChild(tarjeta);
        });
    }
});