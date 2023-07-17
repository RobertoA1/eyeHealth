/* Seleccion de alarma */
const alarm_type = document.querySelectorAll<HTMLElement>('.alarm_type');
const timer = document.querySelector<HTMLElement>('.timer');

if (alarm_type != null){
    alarm_type.forEach(e =>{
        e.addEventListener("mouseover", ()=>{
            e.style.backgroundColor = "#4E8FCA";
            e.style.cursor = "pointer";
        })
    
        e.addEventListener("mouseleave", ()=>{
            e.style.backgroundColor = "transparent";
            e.style.cursor = "default";
        })
    })
}


const btnAlarm_type_default = document.getElementById("alarm_type-default");
const btnAlarm_type_short = document.getElementById('alarm_type-short');
const btnAlarm_type_long = document.getElementById("alarm_type-long");
btnAlarm_type_default!.addEventListener("click", ()=>{
    timer!.firstElementChild!.innerHTML = "30:00";
})
btnAlarm_type_short!.addEventListener("click", ()=>{
    timer!.firstElementChild!.innerHTML = "05:00";
})
btnAlarm_type_long!.addEventListener("click", ()=>{
    timer!.firstElementChild!.innerHTML = "15:00";
})


/* Timer */

/* Boton Start */
let started = false;

const startBtn = document.querySelector<HTMLElement>('.start');
const saltar = document.createDocumentFragment();
const saltarBtn = document.createElement("DIV");
saltarBtn.innerHTML = "<p>Saltar >></p>";
saltarBtn.classList.add("saltar");
saltar.appendChild(saltarBtn);

if (startBtn != null){
    startBtn.addEventListener("mouseover", ()=>{
        startBtn.style.cursor = "pointer";
    })
    
    startBtn.addEventListener("mouseleave", ()=>{
        startBtn.style.cursor = "default";
    })
    
    startBtn.addEventListener("click", ()=>{
        if (!started){ // Iniciar -> Pausar
            startBtn.style.transform = "translate(-80%)";
            startBtn!.firstElementChild!.innerHTML = "Pausar";
            document.querySelector('.alarm')!.append(saltar);
            started = true;
        } else { // Pausar -> Continuar
            startBtn!.style.transform = "translate(0)";
            startBtn!.firstElementChild!.innerHTML = "Continuar";
            started = false;
        }
    
    })
}
