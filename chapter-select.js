

document.addEventListener("DOMContentLoaded", () => {

    const page = document.querySelector(".chapter-select-page");
    const music = document.getElementById("chapterMusic");

    // BACKGROUND MUSIC
    if (music) {
        music.volume = 0.35;

        // Browsers may block autoplay until the user interacts.
        music.play().catch(() => {
            console.log("Music playback requires user interaction.");
        });
    }

    // PAGE TRANSITIONS
    const navigationLinks = document.querySelectorAll(
        ".chapter-button[href], .back-button"
    );

    navigationLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const destination = link.href;

            page.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = destination;
            }, 800);

        });

    });

});

//audio

const music = document.getElementById("chapterMusic");

if (music) {
    music.volume = 0.35;

    music.play().catch(() => {
        // Browser may require the user to interact first.
        document.addEventListener("click", () => {
            music.play();
        }, { once: true });
    });
}