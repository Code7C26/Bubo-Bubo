//VARIABLES
//TablaIngresos
/*const BTAI = document.getElementById("BTAI");
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

window.POPUPI = POPUPI;
window.POPUPIE = POPUPIE;
window.POPUPG = POPUPG;
window.POPUPGE = POPUPGE;
window.POPUPO = POPUPO;
window.POPUPOE = POPUPOE;
window.CerrarPopup = CerrarPopup;*/


// Importaciones de Firestore y configuración de Firebase de Bubo²
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase.js";

// --- VARIABLES DE POPUPS Y CONTROLES ---
const BTAI = document.getElementById("BTAI");
const POPUPI = document.getElementById("POPUPI");
const BTAgI = document.getElementById("BTAgI");
const POPUPIE = document.getElementById("POPUPIE");

const BTAG = document.getElementById("BTAG");
const POPUPG = document.getElementById("POPUPG");
const BTAgG = document.getElementById("BTAgG");
const POPUPGE = document.getElementById("POPUPGE");

const BTAO = document.getElementById("BTAO");
const POPUPO = document.getElementById("POPUPO");
const BTAgO = document.getElementById("BTAgO");
const POPUPOE = document.getElementById("POPUPOE");

let MF = 0;
let FilaEditar = null;

// --- TABLAS Y TOTALES ---
const TI = document.getElementById("TI");
const TG = document.getElementById("TG");
const TO = document.getElementById("TO");

const ToI = document.getElementById("ToI");
const ToG = document.getElementById("ToG");
const TGI = document.getElementById("TGI");

// --- IDENTIFICADOR DEL USUARIO ACTUAL ---
function obtenerIdUsuario() {
    return (
        localStorage.getItem("usuarioActivo") ||
        localStorage.getItem("emailUsuario") ||
        ""
    ).trim().toLowerCase();
}

// --- FUNCIONES DE POPUPS ---
function MostrarPopupI() {
    POPUPI.style.display = "block";
}
function MostrarPopupG() {
    POPUPG.style.display = "block";
}
function MostrarPopupO() {
    POPUPO.style.display = "block";
}

function CerrarPopup(Popup) {
    document.getElementById(Popup).style.display = "none";

    if (Popup == "POPUPI") {
        document.getElementById("EI").value = "";
        document.getElementById("MI").value = "";
        document.getElementById("FI").value = "Seleccionar";
    } else if (Popup == "POPUPIE") {
        document.getElementById("EIE").value = "";
        document.getElementById("MIE").value = "";
        document.getElementById("FIE").value = "Seleccionar";
    } else if (Popup == "POPUPG") {
        document.getElementById("EG").value = "";
        document.getElementById("MG").value = "";
        document.getElementById("FVG").value = "Seleccionar";
    } else if (Popup == "POPUPGE") {
        document.getElementById("EGE").value = "";
        document.getElementById("MGE").value = "";
        document.getElementById("FVE").value = "Seleccionar";
    } else if (Popup == "POPUPO") {
        document.getElementById("EO").value = "";
        document.getElementById("MO").value = "";
        document.getElementById("AO").value = "";
        document.getElementById("PO").value = "Seleccionar";
    } else if (Popup == "POPUPOE") {
        document.getElementById("EOE").value = "";
        document.getElementById("MOE").value = "";
        document.getElementById("AOE").value = "";
        document.getElementById("POE").value = "Seleccionar";
    }
}

window.POPUPI = POPUPI;
window.POPUPIE = POPUPIE;
window.POPUPG = POPUPG;
window.POPUPGE = POPUPGE;
window.POPUPO = POPUPO;
window.POPUPOE = POPUPOE;
window.CerrarPopup = CerrarPopup;

// --- CONSTRUCTORES DE FILAS ---
function RenderizarCeldaProgreso(celda, valor, ahorrado) {
    const porcentaje = valor > 0 ? Math.min(100, Math.round((ahorrado / valor) * 100)) : 0;
    celda.innerHTML = `
        <span class="monto-ahorrado-texto">${ahorrado}</span>
        <div class="barra-progreso-contenedor" title="${porcentaje}% completado">
            <div class="barra-progreso-llenado" style="width: ${porcentaje}%;"></div>
        </div>
        <small style="font-size: 11px; opacity: 0.85;">${porcentaje}%</small>
    `;
}

function crearFilaIngreso(etiqueta, monto, frecuencia) {
    const Fila = document.createElement("tr");
    const FIB = document.getElementById("FIB");
    const Datos = [etiqueta, Number(monto), frecuencia];

    for (let i = 0; i < Datos.length; i++) {
        const Celda = document.createElement("td");
        Celda.textContent = Datos[i];
        Fila.appendChild(Celda);
    }

    const BEI = document.createElement("button");
    BEI.textContent = "Editar";
    BEI.addEventListener("click", BotonEditar);

    const BBI = document.createElement("button");
    BBI.textContent = "Borrar";
    BBI.addEventListener("click", BotonBorrar);

    const CBT = document.createElement("td");
    CBT.appendChild(BEI);
    CBT.appendChild(BBI);
    Fila.appendChild(CBT);

    TI.appendChild(Fila);
    TI.appendChild(FIB);
}

function crearFilaGasto(etiqueta, monto, tipo) {
    const Fila = document.createElement("tr");
    const FGB = document.getElementById("FGB");
    const Datos = [etiqueta, Number(monto), tipo];

    for (let i = 0; i < Datos.length; i++) {
        const Celda = document.createElement("td");
        Celda.textContent = Datos[i];
        Fila.appendChild(Celda);
    }

    const BEG = document.createElement("button");
    BEG.textContent = "Editar";
    BEG.addEventListener("click", BotonEditar);

    const BBG = document.createElement("button");
    BBG.textContent = "Borrar";
    BBG.addEventListener("click", BotonBorrar);

    const CBT = document.createElement("td");
    CBT.appendChild(BEG);
    CBT.appendChild(BBG);
    Fila.appendChild(CBT);

    TG.appendChild(Fila);
    TG.appendChild(FGB);
}

function crearFilaObjetivo(etiqueta, valor, ahorrado, prioridad) {
    const Fila = document.createElement("tr");
    const filaBoton = document.getElementById("FBO").parentElement;
    const Datos = [etiqueta, Number(valor), Number(ahorrado), String(prioridad)];

    for (let i = 0; i < Datos.length; i++) {
        const Celda = document.createElement("td");
        if (i === 2) {
            RenderizarCeldaProgreso(Celda, Number(valor), Number(ahorrado));
        } else {
            Celda.textContent = Datos[i];
        }
        Fila.appendChild(Celda);
    }

    const BEO = document.createElement("button");
    BEO.textContent = "Editar";
    BEO.addEventListener("click", BotonEditar);

    const BBO = document.createElement("button");
    BBO.textContent = "Borrar";
    BBO.addEventListener("click", BotonBorrar);

    const CBT = document.createElement("td");
    CBT.appendChild(BEO);
    CBT.appendChild(BBO);
    Fila.appendChild(CBT);

    filaBoton.parentNode.insertBefore(Fila, filaBoton);
}

// --- LECTURA Y PERSISTENCIA EN FIRESTORE ---
function extraerDatosTablas() {
    const ingresos = [];
    for (let x = 1; x < TI.rows.length - 1; x++) {
        const fila = TI.rows[x];
        ingresos.push({
            etiqueta: fila.children[0].textContent,
            monto: Number(fila.children[1].textContent),
            frecuencia: fila.children[2].textContent
        });
    }

    const gastos = [];
    for (let i = 1; i < TG.rows.length - 1; i++) {
        const fila = TG.rows[i];
        gastos.push({
            etiqueta: fila.children[0].textContent,
            monto: Number(fila.children[1].textContent),
            tipo: fila.children[2].textContent
        });
    }

    const objetivos = [];
    for (let o = 1; o < TO.rows.length - 1; o++) {
        const fila = TO.rows[o];
        const spanA = fila.children[2].querySelector(".monto-ahorrado-texto");
        objetivos.push({
            etiqueta: fila.children[0].textContent,
            valor: Number(fila.children[1].textContent),
            ahorrado: Number(spanA ? spanA.textContent : fila.children[2].textContent),
            prioridad: Number(fila.children[3].textContent)
        });
    }

    const ahorroDestinado = Number(document.getElementById("DA").value) || 0;

    return { ingresos, gastos, objetivos, ahorroDestinado };
}

async function guardarTablasEnFirestore() {
    const idUsuario = obtenerIdUsuario();
    if (!idUsuario) return;

    const payload = extraerDatosTablas();

    try {
        await setDoc(
            doc(db, "usuarios", idUsuario),
            {
                adminBasico: {
                    ...payload,
                    actualizadoEn: new Date().toISOString()
                }
            },
            { merge: true }
        );
    } catch (error) {
        console.error("Error al guardar las tablas en Firestore:", error);
    }
}

function limpiarFilasDatos() {
    while (TI.rows.length > 2) {
        TI.deleteRow(1);
    }
    while (TG.rows.length > 2) {
        TG.deleteRow(1);
    }
    while (TO.rows.length > 2) {
        TO.deleteRow(1);
    }
}

async function cargarTablasDesdeFirestore() {
    const idUsuario = obtenerIdUsuario();
    if (!idUsuario) {
        MontoFinal();
        return;
    }

    try {
        const snap = await getDoc(doc(db, "usuarios", idUsuario));
        if (!snap.exists()) {
            MontoFinal();
            return;
        }

        const adminData = snap.data().adminBasico;
        if (!adminData) {
            MontoFinal();
            return;
        }

        limpiarFilasDatos();

        (adminData.ingresos || []).forEach((item) => {
            crearFilaIngreso(item.etiqueta, item.monto, item.frecuencia);
        });

        (adminData.gastos || []).forEach((item) => {
            crearFilaGasto(item.etiqueta, item.monto, item.tipo);
        });

        (adminData.objetivos || []).slice(0, 5).forEach((item) => {
            crearFilaObjetivo(item.etiqueta, item.valor, item.ahorrado, item.prioridad);
        });

        MontoFinal();

        if (typeof adminData.ahorroDestinado === "number" && adminData.ahorroDestinado > 0) {
            document.getElementById("DA").value = adminData.ahorroDestinado;
        }
    } catch (error) {
        console.error("Error al cargar las tablas desde Firestore:", error);
        MontoFinal();
    }
}

// --- ACCIONES CRUD DE TABLAS ---
function AgregarIngreso() {
    const EI = document.getElementById("EI").value;
    const MI = Number(document.getElementById("MI").value);
    const FI = document.getElementById("FI").value;

    if (FI == "" || EI == "" || MI <= 0 || FI == "Seleccionar") {
        alert("Llene todos los campos para continuar");
    } else {
        POPUPI.style.display = "none";
        crearFilaIngreso(EI, MI, FI);
        document.getElementById("EI").value = "";
        document.getElementById("MI").value = "";
        document.getElementById("FI").value = "Seleccionar";
        MontoFinal();
        guardarTablasEnFirestore();
    }
}

function AgregarGasto() {
    const EG = document.getElementById("EG").value;
    const MG = Number(document.getElementById("MG").value);
    const FVG = document.getElementById("FVG").value;

    if (FVG == "" || EG == "" || MG <= 0 || FVG == "Seleccionar") {
        alert("Llene todos los campos para continuar");
    } else {
        POPUPG.style.display = "none";
        crearFilaGasto(EG, MG, FVG);
        document.getElementById("EG").value = "";
        document.getElementById("MG").value = "";
        document.getElementById("FVG").value = "Seleccionar";
        MontoFinal();
        guardarTablasEnFirestore();
    }
}

function AgregarObjetivo() {
    if (TO.rows.length - 2 >= 5) {
        alert("Solo puedes agregar un máximo de 5 objetivos.");
        POPUPO.style.display = "none";
        return;
    }

    const EO = document.getElementById("EO").value;
    const MO = Number(document.getElementById("MO").value);
    const AO = Number(document.getElementById("AO").value);
    const PO = document.getElementById("PO").value;

    if (AO < 0 || EO == "" || MO <= 0 || PO == "Seleccionar") {
        alert("Llene todos los campos para continuar");
    } else {
        POPUPO.style.display = "none";
        crearFilaObjetivo(EO, MO, AO, PO);

        document.getElementById("EO").value = "";
        document.getElementById("MO").value = "";
        document.getElementById("AO").value = "";
        document.getElementById("PO").value = "Seleccionar";
        guardarTablasEnFirestore();
    }
}

function BotonEditar(event) {
    const Tabla = event.target.parentElement.parentElement.parentElement;
    if (Tabla == TI) {
        const Fila = event.target.parentElement.parentElement;
        FilaEditar = Fila;
        document.getElementById("EIE").value = Fila.children[0].textContent;
        document.getElementById("MIE").value = Fila.children[1].textContent;
        document.getElementById("FIE").value = Fila.children[2].textContent;
        POPUPIE.style.display = "block";
    } else if (Tabla == TG) {
        const Fila = event.target.parentElement.parentElement;
        FilaEditar = Fila;
        document.getElementById("EGE").value = Fila.children[0].textContent;
        document.getElementById("MGE").value = Fila.children[1].textContent;
        document.getElementById("FVE").value = Fila.children[2].textContent;
        POPUPGE.style.display = "block";
    } else {
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

function AceptarEditar() {
    const Tabla = FilaEditar.parentElement;
    if (Tabla == TI) {
        const EIE = document.getElementById("EIE").value;
        const MIE = Number(document.getElementById("MIE").value);
        const FIE = document.getElementById("FIE").value;
        if (EIE == "" || MIE <= 0 || FIE == "Seleccionar") {
            alert("Llene todos los campos para continuar");
        } else {
            FilaEditar.children[0].textContent = EIE;
            FilaEditar.children[1].textContent = MIE;
            FilaEditar.children[2].textContent = FIE;
            POPUPIE.style.display = "none";
            MontoFinal();
            guardarTablasEnFirestore();
        }
    } else if (Tabla == TG) {
        const EGE = document.getElementById("EGE").value;
        const MGE = Number(document.getElementById("MGE").value);
        const FVE = document.getElementById("FVE").value;
        if (EGE == "" || MGE <= 0 || FVE == "Seleccionar") {
            alert("Llene todos los campos para continuar");
        } else {
            FilaEditar.children[0].textContent = EGE;
            FilaEditar.children[1].textContent = MGE;
            FilaEditar.children[2].textContent = FVE;
            POPUPGE.style.display = "none";
            MontoFinal();
            guardarTablasEnFirestore();
        }
    } else {
        const EOE = document.getElementById("EOE").value;
        const MOE = Number(document.getElementById("MOE").value);
        const AOE = Number(document.getElementById("AOE").value);
        const POE = document.getElementById("POE").value;
        if (EOE == "" || MOE <= 0 || AOE < 0 || POE == "Seleccionar") {
            alert("Llene todos los campos para continuar");
        } else {
            FilaEditar.children[0].textContent = EOE;
            FilaEditar.children[1].textContent = MOE;
            RenderizarCeldaProgreso(FilaEditar.children[2], MOE, AOE);
            FilaEditar.children[3].textContent = POE;
            POPUPOE.style.display = "none";
            guardarTablasEnFirestore();
        }
    }
}

function BotonBorrar(event) {
    if (confirm("¿Desea borrar este elemento?")) {
        const Fila = event.target.parentElement.parentElement;
        Fila.remove();
        MontoFinal();
        guardarTablasEnFirestore();
    }
}

// --- CÁLCULOS Y DISTRIBUCIÓN DE AHORRO ---
function MontoFinal() {
    document.getElementById("DA").value = 0;
    let cont = 0;
    let cont1 = 0;
    let gastosFijos = 0;
    let gastosVariables = 0;

    if (TI.rows.length == 2) {
        ToI.textContent = "0";
    } else {
        for (let x = 1; x < TI.rows.length - 1; x++) {
            const Fila = TI.rows[x];
            const monto = Number(Fila.children[1].textContent);
            const frecuencia = Fila.children[2].textContent;
            cont += CalcularMensual(monto, frecuencia);
        }
        ToI.textContent = cont;
    }

    if (TG.rows.length == 2) {
        ToG.textContent = "0";
    } else {
        for (let i = 1; i < TG.rows.length - 1; i++) {
            const Fila1 = TG.rows[i];
            const monto1 = Number(Fila1.children[1].textContent);
            const tipoGasto = Fila1.children[2].textContent;

            cont1 += monto1;

            if (tipoGasto === "Fijo") {
                gastosFijos += monto1;
            } else if (tipoGasto === "Variable") {
                gastosVariables += monto1;
            }
        }
        ToG.textContent = cont1;
    }

    const elFijos = document.getElementById("txt-gastos-fijos");
    const elVariables = document.getElementById("txt-gastos-variables");
    if (elFijos && elVariables) {
        elFijos.textContent = "Gastos Fijos: $" + gastosFijos;
        elVariables.textContent = "Gastos Variables: $" + gastosVariables;
    }

    MF = cont - cont1;
    TGI.textContent = MF;
}

function CalcularMensual(monto, frecuencia) {
    if (frecuencia == "Mensual") return monto;
    if (frecuencia == "Semanal") return monto * 4;
    if (frecuencia == "Quincenal") return monto * 2;
    if (frecuencia == "Anual") return monto / 12;
    return 0;
}

function DistriAhorro() {
    const DA = Number(document.getElementById("DA").value);

    if (DA <= 0 || DA > MF) {
        alert("Ingrese un monto valido para continuar");
        return;
    }

    if (TO.rows.length == 2) {
        alert("Ingrese un objetivo para continuar");
        return;
    }

    let VF = [];
    let EF = [];
    let Pe = [];
    let T = "";

    for (let x = 1; x < TO.rows.length - 1; x++) {
        let E = TO.rows[x].children[0].textContent;
        let M = Number(TO.rows[x].children[1].textContent);
        const spanA = TO.rows[x].children[2].querySelector(".monto-ahorrado-texto");
        let A = Number(spanA ? spanA.textContent : TO.rows[x].children[2].textContent);
        let P = Number(TO.rows[x].children[3].textContent);
        let vf = M - A;

        if (vf <= 0) {
            T += "El objetivo " + E + " ya está cumplido.<br>";
        } else {
            EF.push(E);
            VF.push(vf);

            if (P == 1) Pe.push(5);
            else if (P == 2) Pe.push(4);
            else if (P == 3) Pe.push(3);
            else if (P == 4) Pe.push(2);
            else Pe.push(1);
        }
    }

    if (VF.length === 0) {
        document.getElementById("resultado").innerHTML = T + "<br>No hay objetivos pendientes para asignar dinero.";
        guardarTablasEnFirestore();
        return;
    }

    let PeT = 0;
    for (let i = 0; i < Pe.length; i++) {
        PeT += Pe[i];
    }

    let disponible = DA;

    for (let t = 0; t < VF.length; t++) {
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

    if (disponible > 0) {
        T += "<br>Quedaron <b>$" + disponible.toFixed(2) + "</b> sin asignar.";
    } else {
        T += "<br>Se distribuyó todo el dinero disponible entre los objetivos.";
    }

    document.getElementById("resultado").innerHTML = T;
    guardarTablasEnFirestore();
}

// --- EVENTOS Y CARGA INICIAL ---
document.getElementById("BAcI").addEventListener("click", AceptarEditar);
document.getElementById("BAcG").addEventListener("click", AceptarEditar);
document.getElementById("BAcO").addEventListener("click", AceptarEditar);

BTAG.addEventListener("click", MostrarPopupG);
BTAgG.addEventListener("click", AgregarGasto);

BTAI.addEventListener("click", MostrarPopupI);
BTAgI.addEventListener("click", AgregarIngreso);

BTAO.addEventListener("click", MostrarPopupO);
BTAgO.addEventListener("click", AgregarObjetivo);

document.getElementById("BAcAD").addEventListener("click", DistriAhorro);

document.addEventListener("DOMContentLoaded", () => {
    cargarTablasDesdeFirestore();
});

























/*Agregado tarjetas administracion*/
let acumuladoAsignadoObjetivos = 0;
let acumuladoSobranteDeDA = 0;
let ultimoTextoResultadoProcesado = "";

function parsearMonto(texto) {
    if (!texto) return 0;
    const limpio = String(texto).replace(/[^0-9.-]/g, "");
    const numero = Number(limpio);
    return Number.isFinite(numero) ? numero : 0;
}

function formatearPesos(valor) {
    const num = Math.max(0, Math.round(Number(valor) || 0));
    return `$${num.toLocaleString("es-AR")}`;
}

function convertirIngresoMensual(monto, frecuencia) {
    const freq = String(frecuencia || "").trim().toLowerCase();
    if (freq === "semanal") return monto * 4;
    if (freq === "quincenal") return monto * 2;
    if (freq === "anual") return monto / 12;
    return monto;
}

function procesarDistribucionDesdeResultado() {
    const elResultado = document.getElementById("resultado");
    if (!elResultado) return;

    const textoHTML = elResultado.innerHTML.trim();
    if (!textoHTML || textoHTML === ultimoTextoResultadoProcesado) return;

    const textoPlano = elResultado.innerText || elResultado.textContent || "";
    if (!textoPlano.trim()) return;

    let asignadoEstaVez = 0;
    let sobranteEstaVez = 0;

    const lineas = textoPlano.split("\n");
    lineas.forEach((linea) => {
        const l = linea.trim();
        if (!l) return;

        const matchAsignado = l.match(/se le asign[óo]:\s*\$?\s*([0-9.,]+)/i);
        const matchCompletado = l.match(/se complet[óo] con:\s*\$?\s*([0-9.,]+)/i);
        const matchSobrante = l.match(/Quedaron\s*\$?\s*([0-9.,]+)\s*sin asignar/i);

        if (matchAsignado) {
            asignadoEstaVez += parsearMonto(matchAsignado[1].replace(",", "."));
        } else if (matchCompletado) {
            asignadoEstaVez += parsearMonto(matchCompletado[1].replace(",", "."));
        }

        if (matchSobrante) {
            sobranteEstaVez += parsearMonto(matchSobrante[1].replace(",", "."));
        }
    });

    if (asignadoEstaVez > 0 || sobranteEstaVez > 0) {
        acumuladoAsignadoObjetivos += asignadoEstaVez;
        acumuladoSobranteDeDA += sobranteEstaVez;
        ultimoTextoResultadoProcesado = textoHTML;
    }
}

function actualizarTarjetasSuperioresAdmin() {
    procesarDistribucionDesdeResultado();

    // 1. Ingresos desde #TI
    const filasIngresos = document.querySelectorAll("#TI tr:not(#FIB)");
    let totalIngresos = 0;

    filasIngresos.forEach((fila, index) => {
        if (index === 0) return;
        const celdas = fila.querySelectorAll("td");
        if (celdas.length >= 2) {
            const monto = parsearMonto(celdas[1].textContent);
            const frecuencia = celdas.length >= 3 ? celdas[2].textContent : "Mensual";
            totalIngresos += convertirIngresoMensual(monto, frecuencia);
        }
    });

    const toI = document.getElementById("ToI");
    if (toI && parsearMonto(toI.textContent) > 0 && totalIngresos === 0) {
        totalIngresos = parsearMonto(toI.textContent);
    }

    // 2. Gastos fijos, variables y total desde #TG
    const filasGastos = document.querySelectorAll("#TG tr:not(#FGB)");
    let gastosFijos = 0;
    let gastosVariables = 0;

    filasGastos.forEach((fila, index) => {
        if (index === 0) return;
        const celdas = fila.querySelectorAll("td");
        if (celdas.length >= 3) {
            const monto = parsearMonto(celdas[1].textContent);
            const tipo = celdas[2].textContent.trim().toLowerCase();
            if (tipo.includes("fijo")) {
                gastosFijos += monto;
            } else if (tipo.includes("variable")) {
                gastosVariables += monto;
            }
        }
    });

    const totalGastos = gastosFijos + gastosVariables;

    // 3. Restante (#TGI) y monto destinado al ahorro (#DA)
    const elTGI = document.getElementById("TGI");
    const inputDA = document.getElementById("DA");
    const restante = elTGI ? parsearMonto(elTGI.textContent) : Math.max(0, totalIngresos - totalGastos);
    const destinadoAhorro = inputDA ? parsearMonto(inputDA.value) : 0;

    // 4. Ahorrado en objetivos desde #TO + lo asignado a objetivos
    const filasObjetivos = document.querySelectorAll("#TO tr:not(#JE)");
    let ahorradoEnObjetivos = 0;

    filasObjetivos.forEach((fila, index) => {
        if (index === 0) return;
        const celdas = fila.querySelectorAll("td");
        if (celdas.length >= 3) {
            const spanAhorrado = celdas[2].querySelector(".monto-ahorrado-texto");
            const textoAhorrado = spanAhorrado ? spanAhorrado.textContent : celdas[2].textContent;
            ahorradoEnObjetivos += parsearMonto(textoAhorrado);
        }
    });

    const totalObjetivos = ahorradoEnObjetivos + acumuladoAsignadoObjetivos;

    // Dinero que queda del restante al no destinarlo todo a #DA (ej: 176.000 - 100.000 = 76.000)
    // más cualquier sobrante sin asignar de #DA
    const noDestinadoDeRestante = Math.max(0, restante - destinadoAhorro);
    const ahorroSinObjetivo = Math.max(0, noDestinadoDeRestante + acumuladoSobranteDeDA);

    // Actualizar DOM de las tarjetas superiores
    const elIngresos = document.getElementById("sup-total-ingresos");
    const elTotalGastos = document.getElementById("sup-total-gastos");
    const elGastosFijos = document.getElementById("sup-gastos-fijos");
    const elGastosVariables = document.getElementById("sup-gastos-variables");
    const elTotalAhorros = document.getElementById("sup-total-ahorros");
    const elSinObjetivo = document.getElementById("sup-ahorro-sin-objetivo");

    if (elIngresos) elIngresos.textContent = formatearPesos(totalIngresos);
    if (elTotalGastos) elTotalGastos.textContent = formatearPesos(totalGastos);
    if (elGastosFijos) elGastosFijos.textContent = `Fijos: ${formatearPesos(gastosFijos)}`;
    if (elGastosVariables) elGastosVariables.textContent = `Variables: ${formatearPesos(gastosVariables)}`;
    if (elTotalAhorros) elTotalAhorros.textContent = formatearPesos(totalObjetivos);
    if (elSinObjetivo) elSinObjetivo.textContent = formatearPesos(ahorroSinObjetivo);
}

// Observa cambios en las tablas, en #resultado y en #DA para refrescar las tarjetas en vivo
document.addEventListener("DOMContentLoaded", () => {
    actualizarTarjetasSuperioresAdmin();

    ["TI", "TG", "TO", "ToI", "ToG", "TGI", "resultado"].forEach((id) => {
        const nodo = document.getElementById(id);
        if (nodo) {
            const observer = new MutationObserver(() => actualizarTarjetasSuperioresAdmin());
            observer.observe(nodo, { childList: true, subtree: true, characterData: true });
        }
    });

    const da = document.getElementById("DA");
    const bAcAD = document.getElementById("BAcAD");
    if (da) {
        da.addEventListener("input", actualizarTarjetasSuperioresAdmin);
        da.addEventListener("change", actualizarTarjetasSuperioresAdmin);
    }
    if (bAcAD) {
        bAcAD.addEventListener("click", () => {
            setTimeout(actualizarTarjetasSuperioresAdmin, 0);
        });
    }
});