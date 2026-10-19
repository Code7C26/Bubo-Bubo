//FUNCIONES
//bloque 1
function B1(){
    let cont = 0
    let R1 = document.querySelector('input[name="pregunta1"]:checked');
    let R2 = document.querySelector('input[name="pregunta2"]:checked');
    let R3 = document.querySelector('input[name="pregunta3"]:checked');
    let R4 = document.querySelector('input[name="pregunta4"]:checked');
    if(R1==null || R2==null || R3==null || R4==null){
        alert("Complete todas las preguntas para continuar");
    }
    else{
        let r1=R1.value;
        let r2=R2.value;
        let r3=R3.value;
        let r4=R4.value;
        if (r1=="c"){
            cont++;
            R1.parentElement.style.backgroundColor = "#47f175";
        }
        else{
            R1.parentElement.style.backgroundColor = "#de3445"
            let RC = document.querySelector('input[name="pregunta1"][value="c"]');
            RC.parentElement.style.backgroundColor="#47f175";
        }
        if (r2=="c"){
            cont++;
            R2.parentElement.style.backgroundColor = "#47f175";
        }
        else{
            R2.parentElement.style.backgroundColor = "#de3445";
            let RC2 = document.querySelector('input[name="pregunta2"][value="c"]');
            RC2.parentElement.style.backgroundColor="#47f175";
        }
        if (r3=="a"){
            cont++;
            R3.parentElement.style.backgroundColor = "#47f175";
        }
        else{
            R3.parentElement.style.backgroundColor = "#de3445";
            let RC3 = document.querySelector('input[name="pregunta3"][value="a"]');
            RC3.parentElement.style.backgroundColor="#47f175";
        }
        if (r4=="d"){
            cont++;
            R4.parentElement.style.backgroundColor = "#47f175";
        }
        else{
            R4.parentElement.style.backgroundColor = "#de3445"
            let RC4 = document.querySelector('input[name="pregunta4"][value="d"]');
            RC4.parentElement.style.backgroundColor="#47f175";
        }
        document.getElementById("RTA").innerHTML = cont + "/4";
        const BR=document.createElement("button");
        BR.textContent="Rehacer";
        document.body.appendChild(BR);
        BR.addEventListener("click", reini);
        Ter.disabled=true;
    }

}

//bloque 2
function B2(){
    let cont = 0
    let R1 = document.querySelector('input[name="pregunta1"]:checked');
    let R2 = document.querySelector('input[name="pregunta2"]:checked');
    let R3 = document.querySelector('input[name="pregunta3"]:checked');
    let R4 = document.querySelector('input[name="pregunta4"]:checked');
    if(R1==null || R2==null || R3==null || R4==null){
        alert("Complete todas las preguntas para continuar");
    }
    else{
        let r1=R1.value;
        let r2=R2.value;
        let r3=R3.value;
        let r4=R4.value;
        if (r1=="a"){
            cont=cont+1;
            R1.parentElement.style.backgroundColor = "#47f175";
        }
        else{
            R1.parentElement.style.backgroundColor = "#de3445"
            let RC = document.querySelector('input[name="pregunta1"][value="a"]');
            RC.parentElement.style.backgroundColor="#47f175";
        }
        if (r2=="d"){
            cont++;
            R2.parentElement.style.backgroundColor = "#47f175";
        }
        else{
            R2.parentElement.style.backgroundColor = "#de3445";
            let RC2 = document.querySelector('input[name="pregunta2"][value="d"]');
            RC2.parentElement.style.backgroundColor="#47f175";
        }
        if (r3=="a"){
            cont++;
            R3.parentElement.style.backgroundColor = "#47f175";
        }
        else{
            R3.parentElement.style.backgroundColor = "#de3445";
            let RC3 = document.querySelector('input[name="pregunta3"][value="a"]');
            RC3.parentElement.style.backgroundColor="#47f175";
        }
        if (r4=="d"){
            cont++;
            R4.parentElement.style.backgroundColor = "#47f175";
        }
        else{
            R4.parentElement.style.backgroundColor = "#de3445"
            let RC4 = document.querySelector('input[name="pregunta4"][value="d"]');
            RC4.parentElement.style.backgroundColor="#47f175";
        }
        document.getElementById("RTA").innerHTML = cont + "/4";
        const BR=document.createElement("button");
        BR.textContent="Rehacer";
        document.body.appendChild(BR);
        BR.addEventListener("click", reini);
        Ter.disabled=true;
    }

}
function B3(){
    let cont = 0
    let R1 = document.querySelector('input[name="pregunta1"]:checked');
    let R2 = document.querySelector('input[name="pregunta2"]:checked');
    let R3 = document.querySelector('input[name="pregunta3"]:checked');
    let R4 = document.querySelector('input[name="pregunta4"]:checked');
    if(R1==null || R2==null || R3==null || R4==null){
        alert("Complete todas las preguntas para continuar");
    }
    else{
        let r1=R1.value;
        let r2=R2.value;
        let r3=R3.value;
        let r4=R4.value;
        if (r1=="b"){
            cont++;
            R1.parentElement.style.backgroundColor = "#47f175";
        }
        else{
            R1.parentElement.style.backgroundColor = "#de3445"
            let RC = document.querySelector('input[name="pregunta1"][value="b"]');
            RC.parentElement.style.backgroundColor="#47f175";
        }
        if (r2=="b"){
            cont++;
            R2.parentElement.style.backgroundColor = "#47f175";
        }
        else{
            R2.parentElement.style.backgroundColor = "#de3445";
            let RC2 = document.querySelector('input[name="pregunta2"][value="b"]');
            RC2.parentElement.style.backgroundColor="#47f175";
        }
        if (r3=="d"){
            cont++;
            R3.parentElement.style.backgroundColor = "#47f175";
        }
        else{
            R3.parentElement.style.backgroundColor = "#de3445";
            let RC3 = document.querySelector('input[name="pregunta3"][value="d"]');
            RC3.parentElement.style.backgroundColor="#47f175";
        }
        if (r4=="c"){
            cont++;
            R4.parentElement.style.backgroundColor = "#47f175";
        }
        else{
            R4.parentElement.style.backgroundColor = "#de3445"
            let RC4 = document.querySelector('input[name="pregunta4"][value="c"]');
            RC4.parentElement.style.backgroundColor="#47f175";
        }
        document.getElementById("RTA").innerHTML = cont + "/4";
        const BR=document.createElement("button");
        BR.textContent="Rehacer";
        document.body.appendChild(BR);
        BR.addEventListener("click", reini);
        const Ter=document.getElementById('Ter');
        Ter.disabled=true;

    }

}

//reiniciar la pag
function reini(){
    Ter.disabled=false;
    location.reload();
}
