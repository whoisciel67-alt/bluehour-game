
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ELEMENTS
    // =====================================

    const cutscene = document.getElementById("openingCutscene");
    const video = document.getElementById("openingVideo");
    const skipButton = document.getElementById("skipCutscene");

    const platform = document.getElementById("platformScene");
    const player = document.getElementById("player");

    const ticketGate = document.getElementById("ticketGate");

    const memoryPanel = document.getElementById("memoryPanel");
    const memoryCards = document.querySelectorAll(".memory-card");
    const alignButton = document.getElementById("alignMemory");
    const memoryFeedback = document.getElementById("memoryFeedback");
    const closeMemory = document.getElementById("closeMemory");

    const gateMessage = document.getElementById("gateMessage");
    const continueAfterGate = document.getElementById("continueAfterGate");

    const music = document.getElementById("chapterMusic");
    const gateSfx = document.getElementById("gateSfx");


    // =====================================
    // GAME STATE
    // =====================================

    let playerPosition = 12;
    let selectedMemory = null;

    let sceneStarted = false;
    let gateUnlocked = false;
    let panelOpen = false;

    const moveSpeed = 0.8;
    const gatePosition = 75;
    const interactionDistance = 10;

    const keys = {};


    // =====================================
    // START CUTSCENE
    // =====================================

    video.play().catch(() => {
        // Browser may require a user click before video playback.
        skipButton.textContent = "ENTER PLATFORM →";
    });

    function startPlatform() {

        if (sceneStarted) return;

        sceneStarted = true;

        video.pause();

        cutscene.classList.remove("active");
        platform.classList.add("active");

        music.volume = 0.7;
        music.play().catch(() => {
            console.log("Music will start after user interaction.");
        });

    }

    video.addEventListener("ended", startPlatform);
    skipButton.addEventListener("click", startPlatform);


    // =====================================
    // PLAYER MOVEMENT
    // =====================================

    document.addEventListener("keydown", event => {

        if (
            ["ArrowLeft", "ArrowRight", " "].includes(event.key)
        ) {
            event.preventDefault();
        }

        if (!sceneStarted || panelOpen || gateUnlocked) return;

        keys[event.key.toLowerCase()] = true;

        if (event.key.toLowerCase() === "e") {
            inspectGate();
        }

    });

    document.addEventListener("keyup", event => {
        keys[event.key.toLowerCase()] = false;
    });


    function updateMovement() {

        if (sceneStarted && !panelOpen && !gateUnlocked) {

            if (keys["arrowright"] || keys["d"]) {
                playerPosition += moveSpeed;
            }

            if (keys["arrowleft"] || keys["a"]) {
                playerPosition -= moveSpeed;
            }

            playerPosition = Math.max(
                5,
                Math.min(playerPosition, 90)
            );

            player.style.left = `${playerPosition}%`;
        }

        requestAnimationFrame(updateMovement);
    }

    updateMovement();


    // =====================================
    // TICKET GATE INTERACTION
    // =====================================

    function inspectGate() {

        if (!sceneStarted || gateUnlocked) return;

        const distance = Math.abs(playerPosition - gatePosition);

        if (distance > interactionDistance) {
            return;
        }

        panelOpen = true;
        memoryPanel.classList.add("show");
    }

    ticketGate.addEventListener("click", inspectGate);


    // =====================================
    // MEMORY SELECTION
    // =====================================

    memoryCards.forEach(card => {

        card.addEventListener("click", () => {

            memoryCards.forEach(item => {
                item.classList.remove("selected");
            });

            card.classList.add("selected");

            selectedMemory = card.dataset.memory;

            alignButton.disabled = false;

            memoryFeedback.textContent =
                selectedMemory === "mother"
                    ? "A familiar voice. A place beneath the blossoms."
                    : "The system's record seems incomplete.";

        });

    });


    // =====================================
    // ALIGN MEMORY
    // =====================================

    alignButton.addEventListener("click", () => {

        if (!selectedMemory) return;

        if (selectedMemory === "official") {

            memoryFeedback.textContent =
                "The record remains unchanged. Something is missing.";

            return;
        }

        // Correct memory selected

        panelOpen = false;
        memoryPanel.classList.remove("show");

        gateUnlocked = true;

        ticketGate.classList.add("unlocked");

        gateSfx.currentTime = 0;
        gateSfx.play().catch(() => {});

        // Slightly brighten the platform
        platform.style.filter = "brightness(1.2)";

        // Show unlock message
        setTimeout(() => {
            gateMessage.classList.add("show");
        }, 800);

    });


    // =====================================
    // CLOSE MEMORY PANEL
    // =====================================

    closeMemory.addEventListener("click", () => {

        panelOpen = false;
        memoryPanel.classList.remove("show");

    });


    // =====================================
    // CONTINUE AFTER GATE
    // =====================================

    continueAfterGate.addEventListener("click", () => {

        gateMessage.classList.remove("show");

        // This is where Interaction 2 will begin later.
        document.querySelector(".objective p").textContent =
            "The way forward is open.";

    });

});
