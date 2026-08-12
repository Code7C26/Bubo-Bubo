const BTAI = document.getElementById("BTAI");
const POPUPI = document.getElementById("POPUPI");
const BTAgI= document.getElementById("BTAgI");



BTAI.addEventListener("click",MostrarPopup);
BTAgI.addEventListener("click",AgregarIngreso);

function MostrarPopup(){
    POPUPI.style.display="block";
}

function AgregarIngreso(){
    
    const EI = document.getElementById("EI").value;
    const MI = Number(document.getElementById("MI").value);
    const FI = document.getElementById("FI").value;
    const Datos=[EI,MI,FI]
    const TI = document.getElementById("TI");
    if (FI=="" || EI=="" || MI<=0 || FI=="Seleccionar"){
        alert("LLene todos los campos para continuar");
    }
    else{
        const Fila= document.createElement("tr");
        const FIB=document.getElementById("FIB");
        POPUPI.style.display="none";
        for (let i=0; i<Datos.length;i++){
            const Celda=document.createElement("td");
            Celda.textContent=(Datos[i])
            Fila.appendChild(Celda);
        }
        TI.appendChild(Fila);
        TI.appendChild(FIB);
        document.getElementById("EI").value = "";
        document.getElementById("MI").value = "";
        document.getElementById("FI").value = "Seleccionar";

    }
    
}