//MUESTRA EL USUARIO
const usuario =localStorage.getItem("usuario");
document.getElementById("usuario").textContent = usuario;

//MUESTRA LA FOTO DE PERFIL
const foto = localStorage.getItem("FtoP");
if (foto)
{
    document.getElementById("ImgP").src = foto;
}
else
{
    document.getElementById("ImgP").src = "../../assets/logo.png";
}

//MUESTRA POPUP Y GUARDA CAMBIOS
const POPUPP = document.getElementById("POPUPP");
//muestra popup
const BTEP=document.getElementById("BTEP");
BTEP.addEventListener("click", MostrarPopupP);
//guarda los cambios
const BTAEP=document.getElementById("BTAEP");
BTAEP.addEventListener("click", Guardado);


//FUNCIONES
function MostrarPopupP(){
    document.getElementById("usuarioE").value = localStorage.getItem("usuario");
    document.getElementById("ImgPEActual").src = localStorage.getItem("FtoP");
    POPUPP.style.display="block";
}
function Guardado(){
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
}
