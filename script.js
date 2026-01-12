// TIMER 
var timer = new easytimer.Timer();

var chronoValuesInSeconds = 40


$(".chronoDurationInput").on("change", function () {
    $(".chrono").text(changeTimerValues());
});

$('.playerItem .startButton').click(function () {
    timer.start({ countdown: true, startValues: { seconds: chronoValuesInSeconds } });
});

$('.playerItem .pauseButton').click(function () {
    timer.pause();
});

$('.playerItem .resetButton').click(function () {
    timer.reset();
    timer.pause();
    $(".chrono").text(changeTimerValues());
});

timer.addEventListener('secondsUpdated', function (e) {
    $('.playerItem .chrono').html(timer.getTimeValues().toString());
});

timer.addEventListener('started', function (e) {
    $('.playerItem .chrono').html(timer.getTimeValues().toString());
});

timer.addEventListener('reset', function (e) {
    $('.playerItem .chrono').html(timer.getTimeValues().toString());
});

function pad(n) {
    return String(n).padStart(2, "0");
}

function changeTimerValues() {
    s = $(".seconds").val();
    m = $(".minutes").val();

    getTimerInSeconds()

    return `00:${pad(m)}:${pad(s)}`
}

function getTimerInSeconds() {
    const sec = parseInt($(".seconds").val(), 10) || 0;
    const min = parseInt($(".minutes").val(), 10) || 0;
    chronoValuesInSeconds = min * 60 + sec;
    console.log(chronoValuesInSeconds)
}



// BARRES DE COULEURS

$('.barreVerte').click(function () {
    if ($('.barreVerte').css("background-color") == "rgb(0, 0, 0)") {
        $('.barreVerte').css("background-color", "rgb(18, 170, 18")
    }
    else {
        $('.barreVerte').css("background-color", "rgb(0, 0, 0")
    }
});

$('.barreOrange').click(function () {
    if ($('.barreOrange').css("background-color") == "rgb(0, 0, 0)") {
        $('.barreOrange').css("background-color", "rgb(240, 152, 0")
    }
    else {
        $('.barreOrange').css("background-color", "rgb(0, 0, 0")
    }
});

$('.barreRouge').click(function () {
    if ($('.barreRouge').css("background-color") == "rgb(0, 0, 0)") {
        $('.barreRouge').css("background-color", "rgb(197, 8, 8")
    }
    else {
        $('.barreRouge').css("background-color", "rgb(0, 0, 0")
    }
});



// AJOUTER JOUEUR
$("#addPlayerButton").on("click", function () {
    let playerName = $(".textInput").val().trim();
    if (playerName === "") {
        return;
    }

    const playerItem = `<div class="playerItem">
            <span class="playerName">${playerName}</span>
            <div class="chronoDurationSet">
                <input class="chronoDurationInput minutes" type="number" value="0" min="0" max="59">
                <label> min</label>
                <input class="chronoDurationInput seconds" type="number" value="40" min="0" max="59">
            </div>
            <div class="chrono">00:00:40</div>
            <div class="buttonsContainer">
                <button class="startButton chronoButton">Start</button>
                <button class="pauseButton chronoButton">Pause</button>
                <button class="resetButton chronoButton">Reset</button>
            </div>
            <div class="barreVerte"></div>
            <div class="barreOrange"></div>
            <div class="barreRouge"></div>
        </div>`;

    console.log($("listPlayers"))
    
    $(".listPlayers").append(playerItem);
    $(".textInput").val("");
});



