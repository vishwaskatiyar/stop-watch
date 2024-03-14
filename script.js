let timer;
let isRunning = false;
let lapCounter = 1;

document.getElementById("startStopBtn").addEventListener("click", startStop);
document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("lapBtn").addEventListener("click", lap);

function startStop() {
    if (isRunning) {
        clearTimeout(timer);
        document.getElementById("startStopBtn").innerText = "Start";
    } else {
        runTimer();
        document.getElementById("startStopBtn").innerText = "Stop";
    }
    isRunning = !isRunning;
}

function runTimer() {
    timer = setTimeout(function () {
        updateDisplay();
        runTimer();
    }, 10);
}

function reset() {
    clearTimeout(timer);
    document.getElementById("display").innerText = "00:00:00";
    document.getElementById("startStopBtn").innerText = "Start";
    isRunning = false;
    lapCounter = 1;
    document.getElementById("lapTimes").innerHTML = "";
}

function updateDisplay() {
    let display = document.getElementById("display");
    let currentTime = display.innerText;
    let timeArray = currentTime.split(":");
    let minutes = parseInt(timeArray[0]);
    let seconds = parseInt(timeArray[1]);
    let milliseconds = parseInt(timeArray[2]);

    milliseconds += 1;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds += 1;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes += 1;
    }

    display.innerText =
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + ":" +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds);
}

function lap() {
    let currentTime = document.getElementById("display").innerText;
    let lapTimesList = document.getElementById("lapTimes");
    let lapItem = document.createElement("li");
    lapItem.innerText = "Lap " + lapCounter + ": " + currentTime;
    lapTimesList.appendChild(lapItem);
    lapCounter++;
}
