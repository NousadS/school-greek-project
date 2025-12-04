var animationID = 0;
var start = 0;

function onStartGame() {
    console.log("Starting game...");

    closeInterface("intro");

    setTimeout(() => {openInterface("intro");}, 500)
}

function onGameCycle(time) {
    console.log("Game Cycle...");
}
