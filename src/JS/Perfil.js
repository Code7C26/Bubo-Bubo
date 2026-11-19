// --- FUNCIÓN GLOBAL PARA CERRAR CUALQUIER POPUP (Usada por la X, el overlay y los botones) ---
function CerrarPopupP(idPopup) {
    const popup = document.getElementById(idPopup);
    if (popup) {
        popup.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // --- 0. APLICAR TEMA VISUAL GLOBAL AL CARGAR LA PÁGINA ---
    const temaGuardado = localStorage.getItem("bubo_tema") || "clasico";
    document.documentElement.classList.remove("tema-clasico", "tema-crema", "tema-tierra");
    document.documentElement.classList.add(`tema-${temaGuardado}`);

    // 1. CARGAR DATOS DEL PERFIL AL INICIAR
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
        const elemUsuario = document.getElementById("usuario");
        if (elemUsuario) elemUsuario.textContent = usuario;
    }

    const foto = localStorage.getItem("FtoP");
    const imgP = document.getElementById("ImgP");
    if (imgP) {
        imgP.src = foto ? foto : "../../assets/logo.png";
    }

    const biografiaGuardada = localStorage.getItem("biografia");
    if (biografiaGuardada) {
        const elemBio = document.getElementById("biografia");
        if (elemBio) elemBio.textContent = biografiaGuardada;
    }

    // --- 2. LÓGICA DEL POPUP DE EDITAR PERFIL ---
    const btnEditar = document.getElementById("BTEP");
    const popupPerfil = document.getElementById("POPUPP");
    const btnGuardarPerfil = document.getElementById("BTAEP");
    
    const inputUsuarioE = document.getElementById("usuarioE");
    const textareaBioE = document.getElementById("biografiaE");
    const txtUsuario = document.getElementById("usuario");
    const txtBio = document.getElementById("biografia");
    
    const inputImgE = document.getElementById("ImgPE");
    const imgPerfilActual = document.getElementById("ImgPEActual");
    const imgPerfilHeader = document.getElementById("ImgP");

    if (btnEditar && popupPerfil) {
        btnEditar.addEventListener("click", () => {
            if (inputUsuarioE) inputUsuarioE.value = txtUsuario ? txtUsuario.textContent : "";
            if (textareaBioE) textareaBioE.value = txtBio && txtBio.textContent !== "Escribe tu biografía" ? txtBio.textContent : "";
            if (imgPerfilActual) imgPerfilActual.src = localStorage.getItem("FtoP") || "../../assets/logo.png";
            popupPerfil.style.display = "flex";
        });
    }

    if (btnGuardarPerfil) {
        btnGuardarPerfil.addEventListener("click", () => {
            const nuevoUsuario = inputUsuarioE ? inputUsuarioE.value.trim() : "";
            const nuevaBio = textareaBioE ? textareaBioE.value.trim() : "";

            if (nuevoUsuario !== "") {
                localStorage.setItem("usuario", nuevoUsuario);
                if (txtUsuario) txtUsuario.textContent = nuevoUsuario;
            }
            
            const bioFinal = nuevaBio !== "" ? nuevaBio : "Escribe tu biografía";
            localStorage.setItem("biografia", bioFinal);
            if (txtBio) txtBio.textContent = bioFinal;

            CerrarPopupP("POPUPP");
        });
    }

    if (inputImgE) {
        inputImgE.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const resultado = event.target.result;
                    localStorage.setItem("FtoP", resultado);
                    if (imgPerfilActual) imgPerfilActual.src = resultado;
                    if (imgPerfilHeader) imgPerfilHeader.src = resultado;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- 3. LÓGICA DEL POPUP DE CONFIGURACIÓN (TEMAS VISUALES GLOBALES) ---
    const btnAbrirConfig = document.getElementById("btnAbrirConfig");
    const btnGuardarConfig = document.getElementById("btnGuardarConfig");
    const selectTema = document.getElementById("selectTema");
    const checkSonidos = document.getElementById("checkSonidos");

    function aplicarTemaVisual(tema) {
        const htmlTag = document.documentElement;
        htmlTag.classList.remove("tema-clasico", "tema-crema", "tema-tierra");
        htmlTag.classList.add(`tema-${tema}`);
    }

    const sonidoGuardado = localStorage.getItem("bubo_sonidos") !== "false";

    if (selectTema) selectTema.value = temaGuardado;
    if (checkSonidos) checkSonidos.checked = sonidoGuardado;

    if (btnAbrirConfig) {
        btnAbrirConfig.addEventListener("click", (e) => {
            e.preventDefault();
            const popConfig = document.getElementById("POPUP_CONFIG");
            if (popConfig) popConfig.style.display = "flex";
        });
    }

    if (btnGuardarConfig) {
        btnGuardarConfig.addEventListener("click", () => {
            const temaElegido = selectTema ? selectTema.value : "clasico";
            const conSonido = checkSonidos ? checkSonidos.checked : true;

            localStorage.setItem("bubo_tema", temaElegido);
            localStorage.setItem("bubo_sonidos", conSonido);

            aplicarTemaVisual(temaElegido);
            CerrarPopupP("POPUP_CONFIG");
        });
    }

    // --- 4. LÓGICA DEL POPUP DE IDIOMA ---
    const btnAbrirIdioma = document.getElementById("btnAbrirIdioma");
    const btnGuardarIdioma = document.getElementById("btnGuardarIdioma");
    const selectIdioma = document.getElementById("selectIdioma");

    const traducciones = {
        es: {
            opciones_titulo: "Opciones de cuenta",
            opcion_config: "Configuración",
            opcion_idioma: "Idioma",
            opcion_salir: "Cerrar sesión",
            config_tema_label: "Tema visual de la plataforma",
            config_sonido: "Sonidos y efectos en juegos",
            idioma_label: "Seleccioná el idioma de la plataforma",
            btn_guardar: "Guardar",
            btn_aplicar: "Aplicar"
        },
        en: {
            opciones_titulo: "Account options",
            opcion_config: "Settings",
            opcion_idioma: "Language",
            opcion_salir: "Log out",
            config_tema_label: "Platform visual theme",
            config_sonido: "Game sounds and effects",
            idioma_label: "Select platform language",
            btn_guardar: "Save",
            btn_aplicar: "Apply"
        },
        pt: {
            opciones_titulo: "Opções da conta",
            opcion_config: "Configurações",
            opcion_idioma: "Idioma",
            opcion_salir: "Sair",
            config_tema_label: "Tema visual da plataforma",
            config_sonido: "Sons e efeitos nos jogos",
            idioma_label: "Selecione o idioma da plataforma",
            btn_guardar: "Salvar",
            btn_aplicar: "Aplicar"
        }
    };

    function aplicarIdioma(lang) {
        const textos = traducciones[lang] || traducciones.es;
        document.querySelectorAll("[data-trad]").forEach(el => {
            const clave = el.getAttribute("data-trad");
            if (textos[clave]) {
                el.textContent = textos[clave];
            }
        });
    }

    const idiomaGuardado = localStorage.getItem("bubo_idioma") || "es";
    if (selectIdioma) selectIdioma.value = idiomaGuardado;
    aplicarIdioma(idiomaGuardado);

    if (btnAbrirIdioma) {
        btnAbrirIdioma.addEventListener("click", (e) => {
            e.preventDefault();
            const popIdioma = document.getElementById("POPUP_IDIOMA");
            if (popIdioma) popIdioma.style.display = "flex";
        });
    }

    if (btnGuardarIdioma) {
        btnGuardarIdioma.addEventListener("click", () => {
            const idiomaElegido = selectIdioma ? selectIdioma.value : "es";
            localStorage.setItem("bubo_idioma", idiomaElegido);
            aplicarIdioma(idiomaElegido);
            CerrarPopupP("POPUP_IDIOMA");
        });
    }

    // --- 5. CERRAR SESIÓN ---
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuarioActivo");
            sessionStorage.clear();
            window.location.href = "Login.html";
        });
    }
});



/*function Guardado(){
    const NUser = document.getElementById("usuarioE").value;
    if (NUser==""){
        alert("Escriba su nombre de usuario")
    }
    else{
        localStorage.setItem("usuario", NUser);
        document.getElementById("usuario").textContent = NUser;
        const nuevaFoto = document.getElementById("ImgPE").files[0];
        if (nuevaFoto) {
            const lector = new FileReader();
            lector.onload = function(){
                localStorage.setItem("FtoP", lector.result);
                document.getElementById("ImgP").src = lector.result;
            };
            lector.readAsDataURL(nuevaFoto);
        }
        POPUPP.style.display="none";
    }
}
function CerrarPopupP(){
    POPUPP.style.display="none"
};*/

window.CerrarPopupP = CerrarPopupP;