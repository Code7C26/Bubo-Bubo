//GUARDA USUARIO ESCRITO
function ValUsua() 
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
                window.location.href = "Inicio.html"
            }

            lector.readAsDataURL(foto)
        }
        else {
            window.location.href = "Inicio.html"
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