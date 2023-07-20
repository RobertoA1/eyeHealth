"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcEndTime = void 0;
function calcEndTime(hour, minute, second) {
    return Date.now() + (hour * 3600 + minute * 60 + second) * 1000;
}
exports.calcEndTime = calcEndTime;
