/* Seleccion de alarma */
var alarm_type = document.querySelectorAll('.alarm_type');
var timer = document.querySelector('.timer');
if (alarm_type != null) {
    alarm_type.forEach(function (e) {
        e.addEventListener("mouseover", function () {
            e.style.backgroundColor = "#4E8FCA";
            e.style.cursor = "pointer";
        });
        e.addEventListener("mouseleave", function () {
            e.style.backgroundColor = "transparent";
            e.style.cursor = "default";
        });
    });
}
var btnAlarm_type_default = document.getElementById("alarm_type-default");
var btnAlarm_type_short = document.getElementById('alarm_type-short');
var btnAlarm_type_long = document.getElementById("alarm_type-long");
btnAlarm_type_default.addEventListener("click", function () {
    timer.firstElementChild.innerHTML = "30:00";
});
btnAlarm_type_short.addEventListener("click", function () {
    timer.firstElementChild.innerHTML = "05:00";
});
btnAlarm_type_long.addEventListener("click", function () {
    timer.firstElementChild.innerHTML = "15:00";
});
/* Timer */
/* Boton Start */
var started = false;
var startBtn = document.querySelector('.start');
var saltar = document.createDocumentFragment();
var saltarBtn = document.createElement("DIV");
saltarBtn.innerHTML = "<p>Saltar >></p>";
saltarBtn.classList.add("saltar");
saltar.appendChild(saltarBtn);
if (startBtn != null) {
    startBtn.addEventListener("mouseover", function () {
        startBtn.style.cursor = "pointer";
    });
    startBtn.addEventListener("mouseleave", function () {
        startBtn.style.cursor = "default";
    });
    startBtn.addEventListener("click", function () {
        if (!started) { // Iniciar -> Pausar
            startBtn.style.transform = "translate(-80%)";
            startBtn.firstElementChild.innerHTML = "Pausar";
            document.querySelector('.alarm').append(saltar);
            started = true;
        }
        else { // Pausar -> Continuar
            startBtn.style.transform = "translate(0)";
            startBtn.firstElementChild.innerHTML = "Continuar";
            started = false;
        }
    });
}
