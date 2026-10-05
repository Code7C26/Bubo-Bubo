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
