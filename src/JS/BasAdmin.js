//VARIABLES
//TablaIngresos
const BTAI = document.getElementById("BTAI");
const POPUPI = document.getElementById("POPUPI");
const BTAgI= document.getElementById("BTAgI");
const POPUPIE=document.getElementById("POPUPIE");
//TablaGastos
const BTAG=document.getElementById("BTAG");
const POPUPG=document.getElementById("POPUPG");
const BTAgG=document.getElementById("BTAgG");
const POPUPGE=document.getElementById("POPUPGE");


//TABLAS
const TI = document.getElementById("TI");
const TG = document.getElementById("TG");
const TO = document.getElementById("TO");

//BOTON ACEPTAR PARA EDITAR
const BAcI = document.getElementById("BAcI");
BAcI.addEventListener("click", AceptarEditar);
const BAcG = document.getElementById("BAcG");
BAcG.addEventListener("click", AceptarEditar);

let FilaEditar;

//APRETA MAS Y MUESTRA EL POPUP GASTO
BTAG.addEventListener("click",MostrarPopupG);
//APRETA AGREGAR Y AGREGA EL ELEMENTO EN GASTO
BTAgG.addEventListener("click",AgregarGasto);
//APRETA MAS Y MUESTRA EL POPUP INGRESO
BTAI.addEventListener("click",MostrarPopupI);
//APRETA AGREGAR Y AGREGA EL ELEMENTO EN INGRESO
BTAgI.addEventListener("click",AgregarIngreso);
//FUNCIONES

function MostrarPopupI(){
    POPUPI.style.display="block";
}
function MostrarPopupG(){
    POPUPG.style.display="block";
}

function AgregarIngreso(){
    
    const EI = document.getElementById("EI").value;
    const MI = Number(document.getElementById("MI").value);
    const FI = document.getElementById("FI").value;
    
    if (FI=="" || EI=="" || MI<=0 || FI=="Seleccionar"){
        alert("LLene todos los campos para continuar");
    }
    else{
       
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
        CBT.appendChild(BEI);
        const BBI=document.createElement("button");
        BBI.textContent="Borrar";
        BBI.addEventListener("click", BotonBorrar);
        CBT.appendChild(BBI);
        Fila.appendChild(CBT);
        TI.appendChild(Fila);
        TI.appendChild(FIB);
        document.getElementById("EI").value = "";
        document.getElementById("MI").value = "";
        document.getElementById("FI").value = "Seleccionar";

    }
    
}

function AgregarGasto(){
    
    const EG = document.getElementById("EG").value;
    const MG = Number(document.getElementById("MG").value);
    const FVG = document.getElementById("FVG").value;
    
    if (FVG=="" || EG=="" || MG<=0 || FVG=="Seleccionar"){
        alert("LLene todos los campos para continuar");
    }
    else{
       
        const Datos=[EG,MG,FVG]
        const Fila= document.createElement("tr");
        const FGB=document.getElementById("FGB");
        POPUPG.style.display="none";
        for (let i=0; i<Datos.length;i++){
            const Celda=document.createElement("td");
            Celda.textContent=(Datos[i]);
            Fila.appendChild(Celda);
        }
        const BEG=document.createElement("button");
        BEG.textContent="Editar";
        BEG.addEventListener("click", BotonEditar);
        const CBT=document.createElement("td");
        CBT.appendChild(BEG);
        const BBG=document.createElement("button");
        BBG.textContent="Borrar";
        BBG.addEventListener("click", BotonBorrar);
        CBT.appendChild(BBG);
        Fila.appendChild(CBT);
        TG.appendChild(Fila);
        TG.appendChild(FGB);
        document.getElementById("EG").value = "";
        document.getElementById("MG").value = "";
        document.getElementById("FVG").value = "Seleccionar";

    }
    
}

function BotonEditar(event){
    const Tabla=event.target.parentElement.parentElement.parentElement;
    if (Tabla==TI){
        const Fila = event.target.parentElement.parentElement;
        const DatosFila = [];
        FilaEditar=Fila;
        for (let i = 0; i < 3; i++) {
         DatosFila[i] = Fila.children[i].textContent;
        }
        document.getElementById("EIE").value = DatosFila[0]
        document.getElementById("MIE").value = DatosFila[1]
        document.getElementById("FIE").value = DatosFila[2]
        POPUPIE.style.display="block";
       
        
    }
    else if (Tabla==TG){
        const Fila = event.target.parentElement.parentElement;
        const DatosFila = [];
        FilaEditar=Fila;
        for (let i = 0; i < 3; i++) {
         DatosFila[i] = Fila.children[i].textContent;
        }
        document.getElementById("EGE").value = DatosFila[0]
        document.getElementById("MGE").value = DatosFila[1]
        document.getElementById("FGE").value = DatosFila[2]
        POPUPGE.style.display="block";

    }
    else{
        alert("estoy en tabla objetivos");

    }

}

function AceptarEditar(){
    const Tabla=FilaEditar.parentElement;
      if (Tabla==TI){
        const EIE = document.getElementById("EIE").value;
        const MIE = Number(document.getElementById("MIE").value);
        const FIE = document.getElementById("FIE").value;
        if (EIE == "" || MIE <= 0 || FIE=="Seleccionar"){
            alert("Llene todos los campos para continuar");  
        }
        else {
        FilaEditar.children[0].textContent=EIE;
        FilaEditar.children[1].textContent=MIE;
        FilaEditar.children[2].textContent=FIE;
        POPUPIE.style.display="none";
        }
        
    }
    else if (Tabla==TG){
        const EGE = document.getElementById("EGE").value;
        const MGE = Number(document.getElementById("MGE").value);
        const FVE = document.getElementById("FVE").value;
        if (EGE == "" || MGE <= 0 || FVE=="Seleccionar"){
            alert("Llene todos los campos para continuar");  
        }
        else {
        FilaEditar.children[0].textContent=EGE;
        FilaEditar.children[1].textContent=MGE;
        FilaEditar.children[2].textContent=FVE;
        POPUPGE.style.display="none";
        }

    }
    else{
        alert("estoy en tabla objetivos");

    }
}

function BotonBorrar(event){
     const Tabla = event.target.parentElement.parentElement.parentElement;
      if (Tabla==TI){
        const Fila = event.target.parentElement.parentElement;
        Fila.remove();
    }
    else if (Tabla==TG){
        const Fila = event.target.parentElement.parentElement;
        Fila.remove();

    }
    else{
        const Fila = event.target.parentElement.parentElement;
        Fila.remove();

    }
}
