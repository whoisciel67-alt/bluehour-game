//loading
window.addEventListener("load", () => {

    // GET ELEMENTS

    const loadingScreen = document.querySelector(".loading-screen");
    const progress = document.getElementById("progress");
    const percentage = document.getElementById("percentage");
    const loadingText = document.getElementById("loadingText");

    const mainMenu = document.getElementById("mainMenu");

    const menuMusic = document.getElementById("menuMusic");
    const soundHint = document.getElementById("soundHint");


    // CHECK ELEMENTS

    if (!loadingScreen || !progress || !percentage ||
        !loadingText || !mainMenu || !menuMusic) {

        console.error("LUMA ERROR: Missing elements!");
        return;
    }


    // MUSIC SETTINGS

    menuMusic.volume = 0.35;

    async function startMenuMusic() {

        try {

            await menuMusic.play();

            if (soundHint) {
                soundHint.style.display = "none";
            }

        } catch (error) {

            console.log("LUMA: Waiting for user interaction to play music.");

            if (soundHint) {
                soundHint.style.display = "block";
            }
        }
    }


    // ENABLE MUSIC AFTER USER INTERACTION

    function enableMusic() {

        startMenuMusic();

    }

    document.addEventListener("pointerdown", () => {
        if (mainMenu.style.display === "flex") {
            enableMusic();
        }
    });

    document.addEventListener("keydown", () => {
        if (mainMenu.style.display === "flex") {
            enableMusic();
        }
    });


    // LOADING SETTINGS

    let count = 0;

    const loadingSpeed = 35;

    const loadingMessages = [
        { percent: 0, message: "SYNCHRONIZING MEMORIES..." },
        { percent: 20, message: "RESTORING ARCHIVE..." },
        { percent: 40, message: "SEARCHING FOR LOST DATA..." },
        { percent: 60, message: "MEMORY FRAGMENTS FOUND..." },
        { percent: 80, message: "RECONNECTING TO VEYRA..." },
        { percent: 100, message: "WELCOME BACK TO VEYRA." }
    ];


    // START LOADING

    const loadingInterval = setInterval(() => {

        count++;

        // UPDATE BAR
        progress.style.width = count + "%";

        // UPDATE PERCENTAGE
        percentage.textContent = count + "%";


        // UPDATE MESSAGES
        for (let i = loadingMessages.length - 1; i >= 0; i--) {

            if (count >= loadingMessages[i].percent) {

                loadingText.textContent = loadingMessages[i].message;

                break;
            }
        }


        // FINISH LOADING

// FINISH LOADING

        if (count >= 100) {

            clearInterval(loadingInterval);

            setTimeout(() => {

                // FADE OUT LOADING SCREEN
                loadingScreen.classList.add("fade-out");

                setTimeout(() => {

                    loadingScreen.style.display = "none";

                    // SHOW MAIN MENU
                    mainMenu.style.display = "flex";

                    requestAnimationFrame(() => {
                        mainMenu.classList.add("show");
                    });

                    // START MENU MUSIC
                    startMenuMusic();

                }, 1800);

            }, 700);

        }

    }, loadingSpeed);

});



// menu sound & nav

const menuButtons = document.querySelectorAll(
    ".menu-options button"
);

let clickAudioContext = null;

function playClickSound() {

    // Create audio context when first needed
    if (!clickAudioContext) {

        clickAudioContext = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    }

    if (clickAudioContext.state === "suspended") {
        clickAudioContext.resume();
    }

    const oscillator = clickAudioContext.createOscillator();
    const gain = clickAudioContext.createGain();

    // Soft futuristic chime
    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        880,
        clickAudioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        440,
        clickAudioContext.currentTime + 0.12
    );

    gain.gain.setValueAtTime(
        0.12,
        clickAudioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        clickAudioContext.currentTime + 0.2
    );

    oscillator.connect(gain);
    gain.connect(clickAudioContext.destination);

    oscillator.start();
    oscillator.stop(clickAudioContext.currentTime + 0.2);

}

// BUTTON NAVIGATION

menuButtons.forEach(button => {

    button.addEventListener("click", () => {

        const destination = button.dataset.page;

        if (!destination) {
            return;
        }

        // Play button sound
        playClickSound();

        // Navigate after sound begins
        setTimeout(() => {

            window.location.href = destination;

        }, 250);

    });

});