function ValUsua() 
{
    const usuario= document.getElementById("usuario").value
    if (usuario!=="")
    {
        localStorage.setItem("usuario", usuario)
        window.location.href = "Inicio.html"
    }
    else
    {
        document.getElementById("sn").textContent= "Ingrese un nombre para poder continuar"
    }
}
