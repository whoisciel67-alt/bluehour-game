
// ======================================
// VEYRA — INTRO VIDEO
// ======================================

const video = document.getElementById("introVideo");
const cutscene = document.getElementById("cutscene");
const skipButton = document.getElementById("skipButton");

let hasEnded = false;


// START CUTSCENE

window.addEventListener("load", () => {

    requestAnimationFrame(() => {
        cutscene.classList.add("active");
    });

    video.play().catch(() => {
        console.log("Video playback requires user interaction.");
    });

});


// VIDEO ENDS

video.addEventListener("ended", () => {
    finishCutscene();
});


// SKIP VIDEO

skipButton.addEventListener("click", () => {
    finishCutscene();
});


// FINISH CUTSCENE

function finishCutscene() {

    if (hasEnded) return;

    hasEnded = true;

    cutscene.classList.remove("active");

    setTimeout(() => {
        window.location.href = "game.html";
    }, 1500);

}
