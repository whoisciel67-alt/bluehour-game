
document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("chapterMusic");

    // PAGE ENTRANCE
    document.body.classList.add("page-entering");

    // BACKGROUND MUSIC
    if (music) {

        music.volume = 0.35;

        function startMusic() {
            music.play().catch(() => {
                console.log("Waiting for music interaction.");
            });
        }

        startMusic();

        document.addEventListener("pointerdown", startMusic, { once: true });
        document.addEventListener("keydown", startMusic, { once: true });
    }

    // PAGE NAVIGATION
    let navigating = false;

    const links = document.querySelectorAll(
        ".chapter-button[href], .back-button"
    );

    links.forEach(link => {

        link.addEventListener("click", event => {

            if (navigating) {
                event.preventDefault();
                return;
            }

            navigating = true;
            event.preventDefault();

            const destination = link.href;

            document.body.classList.add("page-leaving");

            setTimeout(() => {
                window.location.href = destination;
            }, 850);

        });

    });

});
