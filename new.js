
document.addEventListener("DOMContentLoaded", () => {

    const video = document.getElementById("introVideo");
    const cutscene = document.getElementById("cutscene");
    const skipButton = document.getElementById("skipButton");
    const continueButton = document.getElementById("continueButton");

    if (!video || !cutscene) return;

    let hasFinished = false;

    // PAGE ENTRANCE
    document.body.classList.add("page-entering");

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            cutscene.classList.add("active");
        });
    });

    // VIDEO SETTINGS
    video.volume = 1;
    video.muted = false;

    video.play().catch(() => {
        console.log("Video autoplay requires interaction.");

        cutscene.addEventListener("pointerdown", () => {
            video.play();
        }, { once: true });
    });

    // VIDEO ENDS
    video.addEventListener("ended", () => {

        continueButton.hidden = false;
        skipButton.hidden = true;

    });

    // SKIP
    skipButton.addEventListener("click", finishCutscene);

    // CONTINUE
    continueButton.addEventListener("click", finishCutscene);


    // FINISH CUTSCENE
    function finishCutscene() {

        if (hasFinished) return;

        hasFinished = true;

        video.pause();

        cutscene.classList.remove("active");
        cutscene.classList.add("fade-out");

        document.body.classList.add("page-leaving");

        setTimeout(() => {
            window.location.href = "chapter-select.html";
        }, 1100);

    }

});
