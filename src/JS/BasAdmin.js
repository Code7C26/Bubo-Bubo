//VARIABLES
//TablaIngresos
const BTAI = document.getElementById("BTAI");
const POPUPI = document.getElementById("POPUPI");
const BTAgI = document.getElementById("BTAgI");
const POPUPIE = document.getElementById("POPUPIE");
//TablaGastos
const BTAG = document.getElementById("BTAG");
const POPUPG = document.getElementById("POPUPG");
const BTAgG = document.getElementById("BTAgG");
const POPUPGE = document.getElementById("POPUPGE");
//TablaObjetivos
const BTAO = document.getElementById("BTAO");
const POPUPO = document.getElementById("POPUPO");
const BTAgO = document.getElementById("BTAgO");
const POPUPOE = document.getElementById("POPUPOE");

let MF = 0;

//TABLAS
const TI = document.getElementById("TI");
const TG = document.getElementById("TG");
const TO = document.getElementById("TO");

//BOTON ACEPTAR PARA EDITAR
const BAcI = document.getElementById("BAcI");
BAcI.addEventListener("click", AceptarEditar);
const BAcG = document.getElementById("BAcG");
BAcG.addEventListener("click", AceptarEditar);
const BAcO = document.getElementById("BAcO");
BAcO.addEventListener("click", AceptarEditar);

let FilaEditar;

//APRETA MAS Y MUESTRA EL POPUP GASTO
BTAG.addEventListener("click", MostrarPopupG);
//APRETA AGREGAR Y AGREGA EL ELEMENTO EN GASTO
BTAgG.addEventListener("click", AgregarGasto);

//APRETA MAS Y MUESTRA EL POPUP INGRESO
BTAI.addEventListener("click", MostrarPopupI);
//APRETA AGREGAR Y AGREGA EL ELEMENTO EN INGRESO
BTAgI.addEventListener("click", AgregarIngreso);

//APRETA MAS Y MUESTRA EL POPUP OBJETIVOS
BTAO.addEventListener("click", MostrarPopupO);
//APRETA AGREGAR Y AGREGA EL ELEMENTO EN OBJETIVOS
BTAgO.addEventListener("click", AgregarObjetivo);

const BAcAD = document.getElementById("BAcAD");
BAcAD.addEventListener("click", DistriAhorro);

//TOTALES
const ToI = document.getElementById("ToI");
const ToG = document.getElementById("ToG");
const TGI = document.getElementById("TGI");

//FUNCIONES
//Mostrarpopups
function MostrarPopupI(){
    POPUPI.style.display = "block";
}
function MostrarPopupG(){
    POPUPG.style.display = "block";
}
function MostrarPopupO(){
    POPUPO.style.display = "block";
}

//Renderizar barra de progreso en objetivos (Punto 2)
function RenderizarCeldaProgreso(celda, valor, ahorrado) {
    let porcentaje = valor > 0 ? Math.min(100, Math.round((ahorrado / valor) * 100)) : 0;
    celda.innerHTML = `
        <span class="monto-ahorrado-texto">${ahorrado}</span>
        <div class="barra-progreso-contenedor" title="${porcentaje}% completado">
            <div class="barra-progreso-llenado" style="width: ${porcentaje}%;"></div>
        </div>
        <small style="font-size: 11px; opacity: 0.85;">${porcentaje}%</small>
    `;
}

//Agregar
function AgregarIngreso(){
    const EI = document.getElementById("EI").value;
    const MI = Number(document.getElementById("MI").value);
    const FI = document.getElementById("FI").value;
    
    if (FI == "" || EI == "" || MI <= 0 || FI == "Seleccionar"){
        alert("Llene todos los campos para continuar");
    }
    else{
        const Datos = [EI, MI, FI];
        const Fila = document.createElement("tr");
        const FIB = document.getElementById("FIB");
        POPUPI.style.display = "none";
        for (let i = 0; i < Datos.length; i++){
            const Celda = document.createElement("td");
            Celda.textContent = Datos[i];
            Fila.appendChild(Celda);
        }
        const BEI = document.createElement("button");
        BEI.textContent = "Editar";
        BEI.addEventListener("click", BotonEditar);
        const CBT = document.createElement("td");
        CBT.appendChild(BEI);
        const BBI = document.createElement("button");
        BBI.textContent = "Borrar";
        BBI.addEventListener("click", BotonBorrar);
        CBT.appendChild(BBI);
        Fila.appendChild(CBT);
        TI.appendChild(Fila);
        TI.appendChild(FIB);
        document.getElementById("EI").value = "";
        document.getElementById("MI").value = "";
        document.getElementById("FI").value = "Seleccionar";
        MontoFinal();
    }
}

function AgregarGasto(){
    const EG = document.getElementById("EG").value;
    const MG = Number(document.getElementById("MG").value);
    const FVG = document.getElementById("FVG").value;
    
    if (FVG == "" || EG == "" || MG <= 0 || FVG == "Seleccionar"){
        alert("Llene todos los campos para continuar");
    }
    else{
        const Datos = [EG, MG, FVG];
        const Fila = document.createElement("tr");
        const FGB = document.getElementById("FGB");
        POPUPG.style.display = "none";
        for (let i = 0; i < Datos.length; i++){
            const Celda = document.createElement("td");
            Celda.textContent = Datos[i];
            Fila.appendChild(Celda);
        }
        const BEG = document.createElement("button");
        BEG.textContent = "Editar";
        BEG.addEventListener("click", BotonEditar);
        const CBT = document.createElement("td");
        CBT.appendChild(BEG);
        const BBG = document.createElement("button");
        BBG.textContent = "Borrar";
        BBG.addEventListener("click", BotonBorrar);
        CBT.appendChild(BBG);
        Fila.appendChild(CBT);
        TG.appendChild(Fila);
        TG.appendChild(FGB);
        document.getElementById("EG").value = "";
        document.getElementById("MG").value = "";
        document.getElementById("FVG").value = "Seleccionar";
        MontoFinal();
    }
}

function AgregarObjetivo(){
    // Contamos las filas actuales (descontando encabezado y fila del botón +)
    if (TO.rows.length - 2 >= 5) {
        alert("Solo puedes agregar un máximo de 5 objetivos.");
        POPUPO.style.display = "none";
        return;
    }

    const EO = document.getElementById("EO").value;
    const MO = Number(document.getElementById("MO").value);
    const AO = Number(document.getElementById("AO").value);
    const PO = document.getElementById("PO").value;
    
    if (AO < 0 || EO == "" || MO <= 0 || PO == "Seleccionar"){
        alert("Llene todos los campos para continuar");
    }
    else{
        const Datos = [EO, MO, AO, PO];
        const Fila = document.createElement("tr");
        const filaBoton = document.getElementById("FBO").parentElement;
        
        POPUPO.style.display = "none";
        
        for (let i = 0; i < Datos.length; i++){
            const Celda = document.createElement("td");
            if (i === 2) {
                RenderizarCeldaProgreso(Celda, MO, AO);
            } else {
                Celda.textContent = Datos[i];
            }
            Fila.appendChild(Celda);
        }
        
        const BEO = document.createElement("button");
        BEO.textContent = "Editar";
        BEO.addEventListener("click", BotonEditar);
        
        const CBT = document.createElement("td");
        CBT.appendChild(BEO);
        
        const BBO = document.createElement("button");
        BBO.textContent = "Borrar";
        BBO.addEventListener("click", BotonBorrar);
        
        CBT.appendChild(BBO);
        Fila.appendChild(CBT);
        
        filaBoton.parentNode.insertBefore(Fila, filaBoton);
        
        // Limpiar formulario
        document.getElementById("EO").value = "";
        document.getElementById("MO").value = "";
        document.getElementById("AO").value = "";
        document.getElementById("PO").value = "Seleccionar";
    }
}

//Editar
function BotonEditar(event){
    const Tabla = event.target.parentElement.parentElement.parentElement;
    if (Tabla == TI){
        const Fila = event.target.parentElement.parentElement;
        const DatosFila = [];
        FilaEditar = Fila;
        for (let i = 0; i < 3; i++) {
            DatosFila[i] = Fila.children[i].textContent;
        }
        document.getElementById("EIE").value = DatosFila[0];
        document.getElementById("MIE").value = DatosFila[1];
        document.getElementById("FIE").value = DatosFila[2];
        POPUPIE.style.display = "block";
    }
    else if (Tabla == TG){
        const Fila = event.target.parentElement.parentElement;
        const DatosFila = [];
        FilaEditar = Fila;
        for (let i = 0; i < 3; i++) {
            DatosFila[i] = Fila.children[i].textContent;
        }
        document.getElementById("EGE").value = DatosFila[0];
        document.getElementById("MGE").value = DatosFila[1];
        document.getElementById("FVE").value = DatosFila[2];
        POPUPGE.style.display = "block";
    }
    else{
        const Fila = event.target.parentElement.parentElement;
        FilaEditar = Fila;
        const spanAhorrado = Fila.children[2].querySelector(".monto-ahorrado-texto");
        document.getElementById("EOE").value = Fila.children[0].textContent;
        document.getElementById("MOE").value = Fila.children[1].textContent;
        document.getElementById("AOE").value = spanAhorrado ? spanAhorrado.textContent : Fila.children[2].textContent;
        document.getElementById("POE").value = Fila.children[3].textContent;
        POPUPOE.style.display = "block";
    }
}

//Guardar edicion
function AceptarEditar(){
    const Tabla = FilaEditar.parentElement;
    if (Tabla == TI){
        const EIE = document.getElementById("EIE").value;
        const MIE = Number(document.getElementById("MIE").value);
        const FIE = document.getElementById("FIE").value;
        if (EIE == "" || MIE <= 0 || FIE == "Seleccionar"){
            alert("Llene todos los campos para continuar");  
        }
        else {
            FilaEditar.children[0].textContent = EIE;
            FilaEditar.children[1].textContent = MIE;
            FilaEditar.children[2].textContent = FIE;
            POPUPIE.style.display = "none";
            MontoFinal();
        }
    }
    else if (Tabla == TG){
        const EGE = document.getElementById("EGE").value;
        const MGE = Number(document.getElementById("MGE").value);
        const FVE = document.getElementById("FVE").value;
        if (EGE == "" || MGE <= 0 || FVE == "Seleccionar"){
            alert("Llene todos los campos para continuar");  
        }
        else {
            FilaEditar.children[0].textContent = EGE;
            FilaEditar.children[1].textContent = MGE;
            FilaEditar.children[2].textContent = FVE;
            POPUPGE.style.display = "none";
            MontoFinal();
        }
    }
    else{
        const EOE = document.getElementById("EOE").value;
        const MOE = Number(document.getElementById("MOE").value);
        const AOE = Number(document.getElementById("AOE").value);
        const POE = document.getElementById("POE").value;
        if (EOE == "" || MOE <= 0 || AOE < 0 || POE == "Seleccionar"){
            alert("Llene todos los campos para continuar");  
        }
        else {
            FilaEditar.children[0].textContent = EOE;
            FilaEditar.children[1].textContent = MOE;
            RenderizarCeldaProgreso(FilaEditar.children[2], MOE, AOE);
            FilaEditar.children[3].textContent = POE;
            POPUPOE.style.display = "none";
        }
    }
}

//Borrar fila
function BotonBorrar(event){
    if (confirm("¿Desea borrar este elemento?")){
        const Tabla = event.target.parentElement.parentElement.parentElement;
        if (Tabla == TI){
            const Fila = event.target.parentElement.parentElement;
            Fila.remove();
            MontoFinal();
        }
        else if (Tabla == TG){
            const Fila = event.target.parentElement.parentElement;
            Fila.remove();
            MontoFinal();
        }
        else{
            const Fila = event.target.parentElement.parentElement;
            Fila.remove();
        }
    }
}

//cierra los popup al apretar "x" y borra el contenido
function CerrarPopup(Popup) {
    document.getElementById(Popup).style.display = "none";

    if (Popup == "POPUPI") {
        document.getElementById("EI").value = "";
        document.getElementById("MI").value = "";
        document.getElementById("FI").value = "Seleccionar";
    }
    else if (Popup == "POPUPIE") {
        document.getElementById("EIE").value = "";
        document.getElementById("MIE").value = "";
        document.getElementById("FIE").value = "Seleccionar";
    }
    else if (Popup == "POPUPG") {
        document.getElementById("EG").value = "";
        document.getElementById("MG").value = "";
        document.getElementById("FVG").value = "Seleccionar";
    }
    else if (Popup == "POPUPGE") {
        document.getElementById("EGE").value = "";
        document.getElementById("MGE").value = "";
        document.getElementById("FVE").value = "Seleccionar";
    }
    else if (Popup == "POPUPO") {
        document.getElementById("EO").value = "";
        document.getElementById("MO").value = "";
        document.getElementById("AO").value = "";
        document.getElementById("PO").value = "Seleccionar";
    }
    else if (Popup == "POPUPOE") {
        document.getElementById("EOE").value = "";
        document.getElementById("MOE").value = "";
        document.getElementById("AOE").value = "";
        document.getElementById("POE").value = "Seleccionar";
    }
}

//Calculos
function MontoFinal(){
    document.getElementById("DA").value = 0;
    let cont = 0;
    let cont1 = 0;
    let gastosFijos = 0;
    let gastosVariables = 0;

    if (TI.rows.length == 2){
        ToI.textContent = "0";
    }
    else{
        let monto = 0;
        for(let x = 1; x < TI.rows.length - 1; x++){
            const Fila = TI.rows[x];
            monto = Number(Fila.children[1].textContent);
            const frecuencia = Fila.children[2].textContent;
            const mensual = CalcularMensual(monto, frecuencia);
            cont = cont + mensual;
        }
        ToI.textContent = cont;
    }

    if (TG.rows.length == 2){
        ToG.textContent = "0";
    }
    else{
        let monto1 = 0;
        for(let i = 1; i < TG.rows.length - 1; i++){
            const Fila1 = TG.rows[i];
            monto1 = Number(Fila1.children[1].textContent);
            const tipoGasto = Fila1.children[2].textContent;
            
            cont1 = cont1 + monto1;

            if (tipoGasto === "Fijo") {
                gastosFijos += monto1;
            } else if (tipoGasto === "Variable") {
                gastosVariables += monto1;
            }
        }
        ToG.textContent = cont1;
    }

    // Actualizar distribución de gastos (Punto 3)
    const elFijos = document.getElementById("txt-gastos-fijos");
    const elVariables = document.getElementById("txt-gastos-variables");
    if (elFijos && elVariables) {
        elFijos.textContent = "Gastos Fijos: $" + gastosFijos;
        elVariables.textContent = "Gastos Variables: $" + gastosVariables;
    }

    MF = cont - cont1;
    TGI.textContent = MF;
}

function CalcularMensual(monto, frecuencia){
    if (frecuencia == "Mensual"){
        return monto;
    }
    else if (frecuencia == "Semanal"){
        return monto * 4;
    }
    else if (frecuencia == "Quincenal"){
        return monto * 2;
    }
    else if (frecuencia == "Anual"){
        return monto / 12;
    }
}

function DistriAhorro(){
    const DA = Number(document.getElementById("DA").value);

    // 1. Validaciones básicas
    if (DA <= 0 || DA > MF){
        alert("Ingrese un monto valido para continuar");
        return;
    }

    if (TO.rows.length == 2) {
        alert("Ingrese un objetivo para continuar");
        return;
    }

    let VF = []; // Valores Faltantes (Monto - Ahorrado)
    let EF = []; // Etiquetas / Nombres de los Objetivos
    let Pe = []; // Pesos de Prioridad (5 para P1, 4 para P2, etc.)
    let T = "";  // Texto que mostraremos en pantalla

    // 2. Extraer los datos de la tabla TO
    for (let x = 1; x < TO.rows.length - 1; x++){
        let E = TO.rows[x].children[0].textContent;
        let M = Number(TO.rows[x].children[1].textContent);
        const spanA = TO.rows[x].children[2].querySelector(".monto-ahorrado-texto");
        let A = Number(spanA ? spanA.textContent : TO.rows[x].children[2].textContent);
        let P = Number(TO.rows[x].children[3].textContent);
        let vf = M - A;

        if (vf <= 0){
            T += "El objetivo " + E + " ya está cumplido.<br>";   
        }
        else{
            EF.push(E);
            VF.push(vf);

            // Asignación de peso: a menor número de prioridad, mayor peso
            if (P == 1)      { Pe.push(5); }
            else if (P == 2) { Pe.push(4); }
            else if (P == 3) { Pe.push(3); }
            else if (P == 4) { Pe.push(2); }
            else             { Pe.push(1); }
        }
    }

    // Si todos los objetivos ya estaban completados de antes, mostramos mensaje y salimos
    if (VF.length === 0) {
        document.getElementById("resultado").innerHTML = T + "<br>No hay objetivos pendientes para asignar dinero.";
        return;
    }

    // 3. Calcular la suma total de los pesos
    let PeT = 0;
    for (let i = 0; i < Pe.length; i++){
        PeT += Pe[i]; 
    }

    // 4. Distribuir el dinero proporcionalmente
    let disponible = DA;

    for (let t = 0; t < VF.length; t++){
        let proporcion = Pe[t] / PeT;
        let asignacionTeorica = DA * proporcion;
        let asignacionReal = Math.min(asignacionTeorica, VF[t]);

        disponible -= asignacionReal;

        if (asignacionReal >= VF[t]) {
            T += "El objetivo <b>" + EF[t] + "</b> se completó con: $" + asignacionReal.toFixed(2) + "<br>";
        } else {
            T += "Al objetivo <b>" + EF[t] + "</b> se le asignó: $" + asignacionReal.toFixed(2) + 
                 " (Faltan: $" + (VF[t] - asignacionReal).toFixed(2) + ")<br>";
        }
    }

    // 5. Informe final del sobrante o completado
    if (disponible > 0) {
        T += "<br>Quedaron <b>$" + disponible.toFixed(2) + "</b> sin asignar.";
    } else {
        T += "<br>Se distribuyó todo el dinero disponible entre los objetivos.";
    }

    // 6. Escribir el resultado directamente en el HTML
    document.getElementById("resultado").innerHTML = T;
}

MontoFinal();
// Ordenar objetivos automáticamente por prioridad (1 es la más alta)
function OrdenarTablaObjetivos() {
    const tbody = TO;
    // Tomamos todas las filas excepto la cabecera (fila 0) y la última fila (la del botón +)
    let filas = [];
    for (let x = 1; x < tbody.rows.length - 1; x++) {
        filas.push(tbody.rows[x]);
    }

    // Ordenamos de menor a prioridad numérica (1, 2, 3...)
    filas.sort((a, b) => {
        let prioA = Number(a.children[3].textContent);
        let prioB = Number(b.children[3].textContent);
        return prioA - prioB;
    });

    // Reinsertamos las filas ordenadas antes de la fila del botón (+)
    const filaBoton = document.getElementById("FBO").parentElement;
    for (let i = 0; i < filas.length; i++) {
        tbody.insertBefore(filas[i], filaBoton);
    }
}