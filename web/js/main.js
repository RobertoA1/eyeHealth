var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// temp
var Timertype = 0;
function calcEndTime(hour, minute, second) {
    return Date.now() + (hour * 3600 + minute * 60 + second) * 1000;
}
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
    Timertype = 0;
});
btnAlarm_type_short.addEventListener("click", function () {
    timer.firstElementChild.innerHTML = "05:00";
    Timertype = 1;
});
btnAlarm_type_long.addEventListener("click", function () {
    timer.firstElementChild.innerHTML = "15:00";
    Timertype = 2;
});
/* Timer */
var notificar = function () {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
    else {
        if (Timertype == 0) {
            var notif = new Notification("eyeHealth", {
                body: "¡Hey! Es hora de que descanses un poco. Descansa por al menos 5 minutos para seguir usando la computadora."
            });
        }
        else if (Timertype == 1 || Timertype == 2) {
            var notif = new Notification("eyeHealth", {
                body: "¡Se ha terminado tu descanso! Puedes seguir usando la computadora."
            });
        }
    }
};
var updateTimer = function (lastTimestamp) {
    if (lastTimestamp === void 0) { lastTimestamp = 0; }
    var remaining = lastTimestamp - Date.now();
    var minutes = Math.floor(remaining / 60000);
    if (Math.floor(remaining / 60000) < 0)
        minutes = 0;
    var seconds = Math.floor(remaining / 1000) - minutes * 60;
    if (seconds < 10)
        timer.firstElementChild.innerHTML = minutes + ":0" + seconds;
    else
        timer.firstElementChild.innerHTML = minutes + ":" + seconds;
    if (minutes < 0 || seconds < 0) {
        notificar();
        startBtn.style.transform = "translate(0)";
        startBtn.firstElementChild.innerHTML = "Iniciar";
        timer.firstElementChild.innerHTML = "30:00";
        started = false;
        location.reload();
    }
};
var getID = function () { return __awaiter(_this, void 0, void 0, function () {
    var sessionId, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('http://localhost/api/getSession')];
            case 1:
                sessionId = _a.sent();
                return [4 /*yield*/, sessionId.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data.sessionId];
        }
    });
}); };
var firstTime = function (endTime) { return __awaiter(_this, void 0, void 0, function () {
    var sessionId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getID()];
            case 1:
                sessionId = _a.sent();
                fetch("http://localhost/api/session/".concat(sessionId, "?timestamp=").concat(endTime.toString()), {
                    method: "POST",
                });
                return [2 /*return*/];
        }
    });
}); };
var verifyExists = function () { return __awaiter(_this, void 0, void 0, function () {
    var sessionId, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getID()];
            case 1:
                sessionId = _a.sent();
                return [4 /*yield*/, fetch("http://localhost/api/getTimestamp?sessionId=".concat(sessionId))];
            case 2:
                data = _a.sent();
                if (!(data.status == 404 || data.status == 500)) return [3 /*break*/, 3];
                return [2 /*return*/, false];
            case 3: return [4 /*yield*/, data.text()];
            case 4: 
            // console.log(await data.text());
            return [2 /*return*/, _a.sent()];
        }
    });
}); };
var intervalId;
var startTimer = function () { return __awaiter(_this, void 0, void 0, function () {
    var timeAdded, endTime, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                timeAdded = parseInt(timer.firstElementChild.innerHTML);
                endTime = calcEndTime(0, timeAdded, 0);
                return [4 /*yield*/, verifyExists()];
            case 1:
                res = _a.sent();
                if (res == false) {
                    firstTime(endTime);
                    intervalId = setInterval(updateTimer, 1000, endTime + 1000);
                }
                else
                    intervalId = setInterval(updateTimer, 1000, res);
                return [2 /*return*/];
        }
    });
}); };
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
            startBtn.firstElementChild.innerHTML = "Finalizar";
            document.querySelector('.alarm').append(saltar);
            startTimer();
            started = true;
        }
        else { // Pausar -> Continuar
            var restTimestamp = function () { return __awaiter(_this, void 0, void 0, function () {
                var sessionId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getID()];
                        case 1:
                            sessionId = _a.sent();
                            fetch("http://localhost/api/restartTimestamp?sessionId=".concat(sessionId));
                            return [2 /*return*/];
                    }
                });
            }); };
            restTimestamp();
            clearInterval(intervalId);
            startBtn.style.transform = "translate(0)";
            startBtn.firstElementChild.innerHTML = "Iniciar";
            timer.firstElementChild.innerHTML = "30:00";
            started = false;
            location.reload();
        }
    });
}
/* actualizar contador */
function loadLastSession() {
    return __awaiter(this, void 0, void 0, function () {
        var res, sessionId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, verifyExists()];
                case 1:
                    res = _a.sent();
                    if (!(res != false && Number(res) > Date.now())) return [3 /*break*/, 2];
                    setInterval(updateTimer, 1000, res);
                    startBtn.style.transform = "translate(-80%)";
                    startBtn.firstElementChild.innerHTML = "Finalizar";
                    document.querySelector('.alarm').append(saltar);
                    started = true;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, getID()];
                case 3:
                    sessionId = _a.sent();
                    fetch("http://localhost/api/restartTimestamp?sessionId=".concat(sessionId));
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
Notification.requestPermission();
loadLastSession();
