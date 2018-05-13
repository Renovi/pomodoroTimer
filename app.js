let status = false; 
let pomodoroTime = 25;
let breakTime = 5;
let timer;
let pomidorImg;
let alarmSound = new Audio('alarm.mp3'); //downloaded from https://www.zedge.net/ringtone/972583a3-983f-3111-b663-cb9fa0d6fc93
//alarmSound.loop = true;


function playSound() {
    alarmSound.play();
    setTimeout(function() {
        if(confirm("BREAK TIME!!")){
            playSoundStop();
        } 
        else {playSound();}
        start("break", breakTime);
}, 1000);
}

function playSoundStop() {
    alarmSound.pause();
}

function pomidorBounce() {
    pomidorImg.className += ("animated infinite bounce");
}

function pomidorBounceStop() {
    pomidorImgClasses.remove("animated", "infinite", "bounce");
}


function updatePomodoro(min, sec) {
    document.getElementById("work-min").innerHTML = min;
    document.getElementById("work-sec").innerHTML = sec;
 
}

function updateBreak(min, sec) {
    document.getElementById("break-min").innerHTML = min;
    document.getElementById("break-sec").innerHTML = sec;
}

function count(min, startTime) {
    let timerMinutes = min;
    let timerMiliSec = timerMinutes * 60000;
    let timer = Date.parse(startTime) + timerMiliSec;
    
    let timeLeft = (timer - Date.parse(new Date())) / 1000;
    let timeLeftMin = Math.floor(timeLeft / 60);
    let timeLeftSec = timeLeft - (timeLeftMin * 60)
    return {
        "left": timeLeft, //seconds
        "minutes": timeLeftMin,
        "seconds": timeLeftSec
    };
}

function start(id, min) {
    let startTime = new Date();

    timer = setInterval(function() {
        let time = count(min, startTime);
        if(id === "work") {
            updatePomodoro(time.minutes, time.seconds);
        } else {
            updateBreak(time.minutes, time.seconds);
        }

        if(time.left <= 0) {
            clearInterval(timer);  
            if(id === "work") {
                updatePomodoro(pomodoroTime, "00");
                pomidorBounce();
                playSound();
                //start("break", breakTime);
            } else {
                updateBreak(breakTime, "00");
                pomidorBounceStop();
                start("work", pomodoroTime);
            }
        }
    }, 1000);
}




document.getElementById("go").addEventListener("click", function (){
    updatePomodoro(pomodoroTime, "00");
    updateBreak(breakTime, "00");
    pomidorBounceStop();

    if(status == false) {
        status = true;
        start("work", pomodoroTime);
    } else {
        status = false;
        clearInterval(timer);
        updatePomodoro(pomodoroTime, "00");
        updateBreak(breakTime, "00");
    }
});

document.getElementById("minusP").addEventListener("click", function(){
    if(pomodoroTime > 0) {
        pomodoroTime--;
    } else {
        pomodoroTime = 0;
    }
    updatePomodoro(pomodoroTime, "00");
});

document.getElementById("plusP").addEventListener("click", function(){
    pomodoroTime++;
    updatePomodoro(pomodoroTime, "00");
});


document.getElementById("minusB").addEventListener("click", function(){
    if(breakTime > 0) {
        breakTime--;
    } else {
        breakTime = 0;
    }
    updateBreak(breakTime, "00");
});

document.getElementById("plusB").addEventListener("click", function(){
    breakTime++;
    updateBreak(breakTime, "00");
});

pomidorImg = document.getElementById("pomidor");
pomidorImgClasses = document.getElementById("pomidor").classList;


updatePomodoro(pomodoroTime, "00");
updateBreak(breakTime, "00");

