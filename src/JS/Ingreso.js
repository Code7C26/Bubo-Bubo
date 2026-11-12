//GUARDA USUARIO ESCRITO
/*function ValUsua() 
{
    const usuario= document.getElementById("usuario").value
    const foto = document.getElementById("FtoP").files[0]
    if (usuario !== "")
    {
        localStorage.setItem("usuario", usuario)
        if (foto) {
            const lector = new FileReader()

            lector.onload = function() {
                localStorage.setItem("FtoP", lector.result)
                window.location.href = "basico.html" // Cambiado aquí
            }

            lector.readAsDataURL(foto)
        }
        else {
            window.location.href = "basico.html" // Y cambiado aquí también
        }
    }
    else
    {
        document.getElementById("sn").textContent =
            "Ingrese un nombre para poder continuar"
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputArchivo = document.getElementById('FtoP');
    const previewImg = document.getElementById('preview-img');
    const textoArchivo = document.getElementById('texto-archivo');

    inputArchivo.addEventListener('change', function(e) {
        const archivo = e.target.files[0];
        
        if (archivo) {
            // Muestra el nombre del archivo seleccionado
            textoArchivo.textContent = archivo.name;
            
            // Genera la vista previa y la muestra en la imagen circular
            const urlImagen = URL.createObjectURL(archivo);
            previewImg.src = urlImagen;
            previewImg.style.display = 'block'; // Hace visible la imagen circular
        } else {
            textoArchivo.textContent = 'Ningún archivo seleccionado';
            previewImg.style.display = 'none';
        }
    });
});
*/

//GUARDA USUARIO ESCRITO
function ValUsua() 
{
    const inputUsuario = document.getElementById("usuario");
    const usuario = inputUsuario.value.trim();
    const foto = document.getElementById("FtoP").files[0];
    const mensajeError = document.getElementById("sn");

    // Definimos el mínimo y máximo de caracteres
    const minCaracteres = 3;
    const maxCaracteres = 15;

    // Validar si está vacío
    if (usuario === "") {
        mensajeError.textContent = "Ingrese un nombre para poder continuar";
        return;
    }

    // Validar longitud máxima (por seguridad extra)
    if (usuario.length > maxCaracteres) {
        mensajeError.textContent = `El usuario no puede superar los ${maxCaracteres} caracteres.`;
        return;
    }

    // Si pasa todas las validaciones, limpia el error y continúa con tu lógica
    mensajeError.textContent = "";
    localStorage.setItem("usuario", usuario);

    if (foto) {
        const lector = new FileReader();

        lector.onload = function() {
            localStorage.setItem("FtoP", lector.result);
            window.location.href = "basico.html";
        }

        lector.readAsDataURL(foto);
    }
    else {
        window.location.href = "basico.html";
    }
}