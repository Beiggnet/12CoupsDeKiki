
// ---------------------------------------------------------------------------------------------------------------------

// AJOUTER JOUEUR
$("#addPlayerButton").on("click", function () {
    let playerName = $(".textInput").val().trim();
    if (playerName === "") {
        return;
    }

    const playerItem = `<div class="playerItem">
            <span class="playerName"></span>
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

    const node = $(playerItem);
    node.find(".playerName").text(playerName)

    setChronoText(node, getDurationSeconds(node));

    $(".listPlayers").append(node);
    $(".textInput").val("");
});



// BARRES DE COULEURS

const COULEUR_BARRE_VERTE = "rgb(18, 170, 18"
const COULEUR_BARRE_ORANGE = "rgb(240, 152, 0"
const COULEUR_BARRE_ROUGE = "rgb(197, 8, 8)"
const COULEUR_BARRE_NOIRE = "rgb(0, 0, 0)"

function toggleBarre(barre, onColor) {
    const isOff = barre.css("background-color") === COULEUR_BARRE_NOIRE;
    barre.css("background-color", isOff ? onColor : COULEUR_BARRE_NOIRE)
}

$(document).on("click", ".playerItem .barreVerte", function () {
    toggleBarre($(this), COULEUR_BARRE_VERTE);
});

$(document).on("click", ".playerItem .barreOrange", function () {
    toggleBarre($(this), COULEUR_BARRE_ORANGE);
});

$(document).on("click", ".playerItem .barreRouge", function () {
    toggleBarre($(this), COULEUR_BARRE_ROUGE);
});




// CHRONO

function pad(n) {
    return String(n).padStart(2, "0");
}

function formatMMSS(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `00:${pad(m)}:${pad(s)}`
}

function getDurationSeconds(player) {
    const sec = parseInt(player.find(".seconds").val(), 10) || 0;
    const min = parseInt(player.find(".minutes").val(), 10) || 0;
    return min * 60 + sec;
}

function setChronoText(player, totalSeconds) {
    player.find(".chrono").text(formatMMSS(totalSeconds));
}

function getOrCreateTimer(player) {
    let timer = player.data("timer");
    if (!timer) {
        timer = new easytimer.Timer();

        timer.addEventListener('secondsUpdated', function () {
            player.find(".chrono").text(timer.getTimeValues().toString());
        });
        timer.addEventListener('started', function () {
            player.find(".chrono").text(timer.getTimeValues().toString());
        });
        timer.addEventListener('reset', function () {
            player.find(".chrono").text(timer.getTimeValues().toString());
        });

        player.data("timer", timer);
    }
    return timer;
}

//----------------

$(document).on("change", ".playerItem .chronoDurationInput", function () {
    const player = $(this).closest(".playerItem");
    setChronoText(player, getDurationSeconds(player));
});

$(document).on("click", ".playerItem .startButton", function () {
    const player = $(this).closest(".playerItem");
    const timer = getOrCreateTimer(player);
    const duration = getDurationSeconds(player);

    timer.start({ countdown: true, startValues: {seconds: duration}})
});

$(document).on("click", ".playerItem .pauseButton", function () {
    const player = $(this).closest(".playerItem");
    const timer = getOrCreateTimer(player);

    timer.pause();
});

$(document).on("click", ".playerItem .resetButton", function () {
    const player = $(this).closest(".playerItem");
    const timer = getOrCreateTimer(player);

    timer.reset();
    timer.pause();

    setChronoText(player, getDurationSeconds(player))
    
});