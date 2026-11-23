
// ======================================
// VEYRA — VIDEO CUTSCENE
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const video = document.getElementById("introVideo");
    const cutscene = document.getElementById("cutscene");
    const skipButton = document.getElementById("skipButton");
    const continueButton = document.getElementById("continueButton");

    let hasFinished = false;

    // Reveal cutscene
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            cutscene.classList.add("active");
        });
    });

    // Check video loading
    video.addEventListener("loadeddata", () => {
        console.log("VEYRA: Video loaded successfully.");
    });

    video.addEventListener("error", () => {
        console.error("VEYRA: Video failed to load.", video.error);
    });

    // Attempt autoplay WITH sound
    video.muted = false;
    video.volume = 1;

    video.play().catch((error) => {
        console.error("VEYRA: Video autoplay failed:", error);
    });

    // Show Continue when video ends
    video.addEventListener("ended", () => {
        continueButton.hidden = false;
        skipButton.hidden = true;
    });

    // Skip video
    skipButton.addEventListener("click", finishCutscene);

    // Continue after video
    continueButton.addEventListener("click", finishCutscene);

    // Finish cutscene
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
