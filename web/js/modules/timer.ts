function calcEndTime(hour: number, minute: number, second: number){
    return Date.now() + (hour*3600 + minute*60 + second)*1000;
}

export { calcEndTime };
