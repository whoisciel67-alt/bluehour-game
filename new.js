// VEYRA — VIDEO CUTSCENE

document.addEventListener("DOMContentLoaded", () => {

    const video = document.getElementById("introVideo");
    const cutscene = document.getElementById("cutscene");
    const skipButton = document.getElementById("skipButton");
    const continueButton = document.getElementById("continueButton");

    let hasFinished = false;

    // Smoothly reveal the cutscene
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            cutscene.classList.add("active");
        });
    });

    // Start video
    video.play().catch(() => {
        console.log("Video playback was blocked.");
    });

    // Show Continue when video ends
    video.addEventListener("ended", () => {
        continueButton.hidden = false;
        skipButton.hidden = true;
    });

    // Skip video
    skipButton.addEventListener("click", () => {
        finishCutscene();
    });

    // Continue after video
    continueButton.addEventListener("click", () => {
        finishCutscene();
    });

    // End cutscene and enter the game
    function finishCutscene() {

        if (hasFinished) return;

        hasFinished = true;

        video.pause();
        cutscene.classList.remove("active");
        cutscene.classList.add("fade-out");

        setTimeout(() => {
            window.location.href = "game.html";
        }, 1500);
    }

});
