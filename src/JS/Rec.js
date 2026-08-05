console.log("¡El archivo Rec.js se cargó correctamente!");
function Vadmin()
{
 const modo = localStorage.getItem("modo");
  if (modo==="basico")
 {
     window.location.href="BasAdmin.html";
 }
 else
 {
     window.location.href="AvanAdmin.html";
 }
}
function Vapren()
{
 const modo = localStorage.getItem("modo");
 if (modo==="basico")
 {
     window.location.href="Basico.html";
 }
 else
 {
     window.location.href="Avanzado.html";
 }
}