const BTAI = document.getElementById("BTAI");
const POPUPI = document.getElementById("POPUPI");
const BTAgI= document.getElementById("BTAgI");

const TI = document.getElementById("TI");
const TG = document.getElementById("TG");
const TO = document.getElementById("TO");




BTAI.addEventListener("click",MostrarPopup);
BTAgI.addEventListener("click",AgregarIngreso);

function MostrarPopup(){
    POPUPI.style.display="block";
}

function AgregarIngreso(){
    
    
    
    if (FI=="" || EI=="" || MI<=0 || FI=="Seleccionar"){
        alert("LLene todos los campos para continuar");
    }
    else{
        const EI = document.getElementById("EI").value;
        const MI = Number(document.getElementById("MI").value);
        const FI = document.getElementById("FI").value;
        const Datos=[EI,MI,FI]
        const Fila= document.createElement("tr");
        const FIB=document.getElementById("FIB");
        POPUPI.style.display="none";
        for (let i=0; i<Datos.length;i++){
            const Celda=document.createElement("td");
            Celda.textContent=(Datos[i]);
            Fila.appendChild(Celda);
        }
        const BEI=document.createElement("button");
        BEI.textContent="Editar";
        BEI.addEventListener("click", BotonEditar);
        const CBT=document.createElement("td");
        CBT.appendChild(BEI)
        Fila.appendChild(CBT);
        const BBI=document.createElement("button");
        BBI.textContent="Borrar";
        CBT.appendChild(BBI)
        Fila.appendChild(CBT);
        TI.appendChild(Fila);
        TI.appendChild(FIB);
        document.getElementById("EI").value = "";
        document.getElementById("MI").value = "";
        document.getElementById("FI").value = "Seleccionar";

    }
    
}
function BotonEditar(event){
    const Tabla=event.target.parentElement.parentElement.parentElement
    if (Tabla==TI){
        alert("estoy en tabla ingreso");
        const Fila = event.target.parentElement.parentElement;
        const DatosFila = [];
        for (let i = 0; i < 3; i++) {
         DatosFila[i] = Fila.children[i].textContent;
        }

    }
    else if (Tabla==TG){
        alert("estoy en tabla gasto");

    }
    else{
        alert("estoy en tabla objetivos");

    }

}