// temp
let Timertype = 0;
function calcEndTime(hour: number, minute: number, second: number){
    return Date.now() + (hour*3600 + minute*60 + second)*1000;
}

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
    Timertype = 0;
})
btnAlarm_type_short!.addEventListener("click", ()=>{
    timer!.firstElementChild!.innerHTML = "05:00";
    Timertype = 1;
})
btnAlarm_type_long!.addEventListener("click", ()=>{
    timer!.firstElementChild!.innerHTML = "15:00";
    Timertype = 2;
})


/* Timer */

const notificar = ()=>{
    if (Notification.permission !== "granted"){
        Notification.requestPermission();
    } else {
        if (Timertype == 0){
            var notif = new Notification("eyeHealth",
            {
                body: "¡Hey! Es hora de que descanses un poco. Descansa por al menos 5 minutos para seguir usando la computadora."
            });
        } else if (Timertype == 1 || Timertype == 2){
            var notif = new Notification("eyeHealth",
            {
                body: "¡Se ha terminado tu descanso! Puedes seguir usando la computadora."
            });
        }

    }
}

const updateTimer = (lastTimestamp = 0)=>{
    const remaining = lastTimestamp - Date.now();
    let minutes = Math.floor(remaining/60000);
    if (Math.floor(remaining/60000) < 0) minutes = 0;
    let seconds = Math.floor(remaining/1000) - minutes*60;
    if (seconds < 10) timer!.firstElementChild!.innerHTML = minutes + ":0" + seconds;
    else timer!.firstElementChild!.innerHTML = minutes + ":" + seconds;
    if (minutes < 0 || seconds < 0){
        notificar();
        startBtn!.style.transform = "translate(0)";
        startBtn!.firstElementChild!.innerHTML = "Iniciar";
        timer!.firstElementChild!.innerHTML = "30:00";
        started = false;
        location.reload();
    }
}

const getID = async()=>{
    const sessionId = await fetch('http://localhost/api/getSession');
    const data = await sessionId.json();
    return data.sessionId;
}

const firstTime = async (endTime)=>{
    const sessionId = await getID();
    fetch(`http://localhost/api/session/${sessionId}?timestamp=${endTime.toString()}`, {
        method: "POST",
    });
}

const verifyExists = async ()=>{
    const sessionId = await getID();
    const data = await fetch(`http://localhost/api/getTimestamp?sessionId=${sessionId}`);
    if (data.status == 404 || data.status == 500){
        return false;
    } else {
        // console.log(await data.text());
        return await data.text();
    }
}

let intervalId;
const startTimer = async ()=>{
    let timeAdded = parseInt(timer!.firstElementChild!.innerHTML);
    let endTime = calcEndTime(0, timeAdded, 0);
    const res = await verifyExists();
    if (res == false){
        firstTime(endTime);
        intervalId = setInterval(updateTimer, 1000, endTime+1000);
    }
    else intervalId = setInterval(updateTimer, 1000, res);
}

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
            startBtn!.firstElementChild!.innerHTML = "Finalizar";
            document.querySelector('.alarm')!.append(saltar);
            startTimer();
            started = true;
        } else { // Pausar -> Continuar
            const restTimestamp= async() =>{
                const sessionId = await getID();
                fetch(`http://localhost/api/restartTimestamp?sessionId=${sessionId}`);
            }
            restTimestamp();
            clearInterval(intervalId);
            startBtn!.style.transform = "translate(0)";
            startBtn!.firstElementChild!.innerHTML = "Iniciar";
            timer!.firstElementChild!.innerHTML = "30:00";
            started = false;
            location.reload();
        }
    })
}

/* actualizar contador */
async function loadLastSession(){
    let res = await verifyExists();
    if (res != false && Number(res) > Date.now()){
        setInterval(updateTimer, 1000, res);
        startBtn!.style.transform = "translate(-80%)";
        startBtn!.firstElementChild!.innerHTML = "Finalizar";
        document.querySelector('.alarm')!.append(saltar);
        started = true;
    } else {
        const sessionId = await getID();
        fetch(`http://localhost/api/restartTimestamp?sessionId=${sessionId}`);
    }
}
if (Notification.permission !== "granted"){
    Notification.requestPermission();
}
loadLastSession();