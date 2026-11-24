
document.addEventListener("DOMContentLoaded", () => {

    const loadingScreen = document.querySelector(".loading-screen");
    const progress = document.getElementById("progress");
    const percentage = document.getElementById("percentage");
    const loadingText = document.getElementById("loadingText");
    const mainMenu = document.getElementById("mainMenu");
    const menuMusic = document.getElementById("menuMusic");
    const soundHint = document.getElementById("soundHint");

    if (!loadingScreen || !mainMenu) return;

    // PAGE ENTRANCE
    document.body.classList.add("page-entering");

    // MUSIC
    if (menuMusic) {
        menuMusic.volume = 0.35;

        function startMusic() {
            menuMusic.play().then(() => {
                if (soundHint) soundHint.style.display = "none";
            }).catch(() => {
                if (soundHint) soundHint.style.display = "block";
            });
        }

        window.startMenuMusic = startMusic;
    }

    // LOADING SCREEN
    let count = 0;

    const messages = [
        { percent: 0, message: "SYNCHRONIZING MEMORIES..." },
        { percent: 20, message: "RESTORING ARCHIVE..." },
        { percent: 40, message: "SEARCHING FOR LOST DATA..." },
        { percent: 60, message: "MEMORY FRAGMENTS FOUND..." },
        { percent: 80, message: "RECONNECTING TO VEYRA..." },
        { percent: 100, message: "WELCOME BACK TO VEYRA." }
    ];

    const loadingInterval = setInterval(() => {

        count++;

        progress.style.width = count + "%";
        percentage.textContent = count + "%";

        for (let i = messages.length - 1; i >= 0; i--) {
            if (count >= messages[i].percent) {
                loadingText.textContent = messages[i].message;
                break;
            }
        }

        if (count >= 100) {

            clearInterval(loadingInterval);

            setTimeout(() => {

                loadingScreen.classList.add("fade-out");

                setTimeout(() => {

                    loadingScreen.style.display = "none";
                    mainMenu.style.display = "flex";

                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            mainMenu.classList.add("show");
                        });
                    });

                    if (window.startMenuMusic) {
                        window.startMenuMusic();
                    }

                }, 1800);

            }, 500);
        }

    }, 35);


    // ENABLE MUSIC AFTER INTERACTION
    function unlockMusic() {
        if (mainMenu.classList.contains("show") && window.startMenuMusic) {
            window.startMenuMusic();
        }
    }

    document.addEventListener("pointerdown", unlockMusic);
    document.addEventListener("keydown", unlockMusic);


    // BUTTON CLICK SOUND
    let audioContext;

    function playClickSound() {

        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) return;

        audioContext ||= new AudioContextClass();

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        const now = audioContext.currentTime;

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(880, now);
        oscillator.frequency.exponentialRampToValueAtTime(440, now + 0.12);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.2);
    }


    // MENU NAVIGATION
    let navigating = false;

    document.querySelectorAll(".menu-options button").forEach(button => {

        button.addEventListener("click", () => {

            const destination = button.dataset.page;

            if (!destination || navigating) return;

            navigating = true;

            playClickSound();

            document.body.classList.add("page-leaving");

            setTimeout(() => {
                window.location.href = destination;
            }, 750);

        });

    });

});
