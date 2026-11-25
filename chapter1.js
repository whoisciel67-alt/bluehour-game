
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ELEMENTS
    // =====================================

    const cutscene = document.getElementById("openingCutscene");
    const video = document.getElementById("openingVideo");
    const playButton = document.getElementById("playCutscene");
    const skipButton = document.getElementById("skipCutscene");

    const music = document.getElementById("chapterMusic");

    const platform = document.getElementById("platformScene");
    const glassScene = document.getElementById("glassScene");
    const archiveScene = document.getElementById("archiveScene");
    const endingScene = document.getElementById("endingScene");

    const player = document.getElementById("player");
    const ticketGate = document.getElementById("ticketGate");
    const recorderButton = document.getElementById("recorderButton");
    const archiveTerminal = document.getElementById("archiveTerminal");

    const memoryPanel = document.getElementById("memoryPanel");
    const memoryLabel = document.getElementById("memoryLabel");
    const memoryTitle = document.getElementById("memoryTitle");
    const memoryDescription = document.getElementById("memoryDescription");
    const memoryOptions = document.getElementById("memoryOptions");
    const memoryFeedback = document.getElementById("memoryFeedback");
    const alignButton = document.getElementById("alignMemory");

    const closeMemory = document.getElementById("closeMemory");
    const backFromMemory = document.getElementById("backFromMemory");
    const backFromStory = document.getElementById("backFromStory");

    const storyMessage = document.getElementById("storyMessage");
    const messageLabel = document.getElementById("messageLabel");
    const messageTitle = document.getElementById("messageTitle");
    const messageText = document.getElementById("messageText");
    const continueStory = document.getElementById("continueStory");

    const dialogueBox = document.getElementById("dialogueBox");
    const dialogueSpeaker = document.getElementById("dialogueSpeaker");
    const dialogueText = document.getElementById("dialogueText");
    const dialogueContinue = document.getElementById("dialogueContinue");

    const recorderAudio = document.getElementById("recorderAudio");
    const objectiveText = document.getElementById("objectiveText");
    const movementHint = document.getElementById("movementHint");
    const finishChapter = document.getElementById("finishChapter");


    // =====================================
    // CHECK REQUIRED ELEMENTS
    // =====================================

    const requiredElements = {
        cutscene,
        video,
        playButton,
        skipButton,
        platform,
        glassScene,
        archiveScene,
        endingScene,
        player,
        ticketGate,
        memoryPanel,
        memoryLabel,
        memoryTitle,
        memoryDescription,
        memoryOptions,
        memoryFeedback,
        alignButton,
        storyMessage,
        messageLabel,
        messageTitle,
        messageText,
        continueStory
    };

    for (const [name, element] of Object.entries(requiredElements)) {
        if (!element) {
            console.error(`Chapter 1 is missing an HTML element: ${name}`);
        }
    }

    if (Object.values(requiredElements).some(element => !element)) {
        console.error("Chapter 1 could not initialize. Check the missing HTML IDs above.");
        return;
    }


    // =====================================
    // GAME STATE
    // =====================================

    let currentStage = 1;
    let selectedMemory = null;

    let sceneStarted = false;
    let panelOpen = false;
    let gateUnlocked = false;

    let playerPosition = 12;

    const moveSpeed = 0.8;
    const gatePosition = 75;
    const interactionDistance = 10;

    const keys = {};


    // =====================================
    // MUSIC
    // =====================================

    function startMusic() {

        if (!music) return;

        music.volume = 0.7;

        music.play().catch(error => {
            console.warn("Background music could not start:", error);
        });

    }


    // =====================================
    // OPENING CUTSCENE
    // =====================================

    function startPlatform() {

        if (sceneStarted) return;

        sceneStarted = true;

        video.pause();

        cutscene.classList.remove("active");
        platform.classList.add("active");

        startMusic();

    }


    playButton.addEventListener("click", () => {

        video.currentTime = 0;

        video.play()
            .then(() => {
                playButton.style.display = "none";
            })
            .catch(error => {
                console.error("Video playback failed:", error);
            });

    });


    skipButton.addEventListener("click", startPlatform);

    video.addEventListener("ended", startPlatform);


    // =====================================
    // SCENE MANAGEMENT
    // =====================================

    function changeScene(scene) {

        platform.classList.remove("active");
        glassScene.classList.remove("active");
        archiveScene.classList.remove("active");
        endingScene.classList.remove("active");

        scene.classList.add("active");

        panelOpen = false;

        memoryPanel.classList.remove("show");
        dialogueBox?.classList.remove("show");
        storyMessage.classList.remove("show");

        // Stop movement when changing scenes.
        Object.keys(keys).forEach(key => {
            keys[key] = false;
        });

    }


    // =====================================
    // REUSABLE CHOICE PANEL
    // =====================================

    function openChoicePanel(stage) {

        currentStage = stage;
        selectedMemory = null;
        panelOpen = true;

        alignButton.disabled = true;


        // ---------------------------------
        // STAGE 1: PLATFORM 04
        // ---------------------------------

        if (stage === 1) {

            memoryLabel.textContent = "LUMA MEMORY ARCHIVE";

            memoryTitle.textContent = "Conflicting Memories";

            memoryDescription.textContent =
                "Two records. One forgotten moment. Which memory will you trust?";

            memoryOptions.innerHTML = `

                <button class="memory-card" data-memory="official">

                    <span class="memory-type">
                        01 — LUMA OFFICIAL LOG
                    </span>

                    <h3>Departure Record</h3>

                    <p>
                        Passenger departed Veyra six years ago.
                        Return ticket never purchased.
                    </p>

                    <span class="memory-select">
                        SELECT RECORD →
                    </span>

                </button>


                <button class="memory-card" data-memory="mother">

                    <span class="memory-type">
                        02 — MOTHER'S UNFINISHED FRAGMENT
                    </span>

                    <h3>A Familiar Promise</h3>

                    <p>
                        I left a pass at the gate under the old
                        cherry-blossom hologram, just in case you ever came back.
                    </p>

                    <span class="memory-select">
                        SELECT MEMORY →
                    </span>

                </button>

            `;

            memoryFeedback.textContent =
                "Select a memory to continue.";

        }


        // ---------------------------------
        // STAGE 2: GLASS OVERLOOK
        // ---------------------------------

        if (stage === 2) {

            memoryLabel.textContent =
                "RECOVERED AUDIO // UNKNOWN DATE";

            memoryTitle.textContent =
                "A Voice From Somewhere";

            memoryDescription.textContent =
                "The recording is damaged. How much of it will you listen to?";

            memoryOptions.innerHTML = `

                <button class="memory-card" data-memory="listen">

                    <span class="memory-type">
                        01 — COMPLETE RECORDING
                    </span>

                    <h3>Keep Listening</h3>

                    <p>
                        Let the recording play until the end.
                        There may be something worth hearing.
                    </p>

                    <span class="memory-select">
                        LISTEN →
                    </span>

                </button>


                <button class="memory-card" data-memory="stop">

                    <span class="memory-type">
                        02 — INTERRUPTED RECORDING
                    </span>

                    <h3>Stop Here</h3>

                    <p>
                        That voice is familiar.
                        Perhaps hearing more isn't necessary.
                    </p>

                    <span class="memory-select">
                        STOP RECORDING →
                    </span>

                </button>

            `;

            memoryFeedback.textContent =
                "The recorder clicks softly.";

        }


        // ---------------------------------
        // STAGE 3: LOCAL ARCHIVE
        // ---------------------------------

        if (stage === 3) {

            memoryLabel.textContent =
                "LUMA LOCAL ARCHIVE";

            memoryTitle.textContent =
                "Things Left Behind";

            memoryDescription.textContent =
                "Two archive categories remain accessible. Which one will you investigate?";

            memoryOptions.innerHTML = `

                <button class="memory-card" data-memory="personal">

                    <span class="memory-type">
                        01 — PERSONAL ARCHIVE
                    </span>

                    <h3>Childhood Records</h3>

                    <p>
                        Photographs, saved messages, and fragments
                        from a life once lived here.
                    </p>

                    <span class="memory-select">
                        OPEN ARCHIVE →
                    </span>

                </button>


                <button class="memory-card" data-memory="transit">

                    <span class="memory-type">
                        02 — TRANSIT ARCHIVE
                    </span>

                    <h3>Official Records</h3>

                    <p>
                        Passenger history, departure logs,
                        and records modified by LUMA.
                    </p>

                    <span class="memory-select">
                        OPEN RECORDS →
                    </span>

                </button>

            `;

            memoryFeedback.textContent =
                "Choose an archive to investigate.";

        }


        memoryPanel.classList.add("show");


        // ---------------------------------
        // MEMORY SELECTION
        // ---------------------------------

        document.querySelectorAll(".memory-card").forEach(card => {

            card.addEventListener("click", () => {

                document.querySelectorAll(".memory-card").forEach(item => {
                    item.classList.remove("selected");
                });

                card.classList.add("selected");

                selectedMemory = card.dataset.memory;

                alignButton.disabled = false;

                memoryFeedback.textContent =
                    "Selection recorded. Confirm when ready.";

            });

        });

    }


    // =====================================
    // OPEN INTERACTIONS
    // =====================================

    function inspectGate() {

        if (!sceneStarted || gateUnlocked || panelOpen) return;

        const distance = Math.abs(playerPosition - gatePosition);

        if (distance > interactionDistance) {

            memoryFeedback.textContent =
                "You are too far from the gate.";

            console.log("Move closer to the ticket gate.");

            return;
        }

        openChoicePanel(1);

    }


    ticketGate.addEventListener("click", inspectGate);


    if (recorderButton) {

        recorderButton.addEventListener("click", () => {

            if (panelOpen) return;

            openChoicePanel(2);

        });

    }


    if (archiveTerminal) {

        archiveTerminal.addEventListener("click", () => {

            if (panelOpen) return;

            openChoicePanel(3);

        });

    }


    // =====================================
    // CONFIRM CHOICE
    // =====================================

    alignButton.addEventListener("click", () => {

        if (!selectedMemory) return;


        // ---------------------------------
        // SCENE 1: PLATFORM 04
        // ---------------------------------

        if (currentStage === 1) {

            if (selectedMemory === "official") {

                memoryFeedback.textContent =
                    "The record remains unchanged. Something is missing.";

                return;

            }


            if (selectedMemory === "mother") {

                gateUnlocked = true;

                ticketGate.classList.add("unlocked");

                platform.style.filter = "brightness(1.2)";

                memoryPanel.classList.remove("show");

                panelOpen = false;

                showStoryMessage(
                    "MEMORY RESTORED",
                    "The gate remembers.",
                    "A familiar promise opens the frozen barrier."
                );

                return;

            }

        }


        // ---------------------------------
        // SCENE 2: GLASS OVERLOOK
        // ---------------------------------

        if (currentStage === 2) {

            if (selectedMemory === "listen") {

                if (recorderAudio) {
                    recorderAudio.currentTime = 0;

                    recorderAudio.play().catch(error => {
                        console.warn("Recording could not play:", error);
                    });
                }

                showStoryMessage(
                    "RECORDING RECOVERED",
                    "She wasn't always like that.",
                    "The coworker's voice returns through the static. They mention that your mother had been distant long before her departure."
                );

            } else {

                if (recorderAudio) {
                    recorderAudio.pause();
                    recorderAudio.currentTime = 0;
                }

                showStoryMessage(
                    "RECORDING INTERRUPTED",
                    "I know that voice.",
                    "You remember the sound of your mother's voice. The rest of the conversation feels strangely out of reach."
                );

            }

            memoryPanel.classList.remove("show");

            panelOpen = false;

            return;

        }


        // ---------------------------------
        // SCENE 3: LOCAL ARCHIVE
        // ---------------------------------

        if (currentStage === 3) {

            if (selectedMemory === "personal") {

                showStoryMessage(
                    "PERSONAL ARCHIVE OPENED",
                    "A familiar photograph.",
                    "A childhood photograph appears on the screen. You recognize the room, the curtains, and the light. The person standing beside you takes a little longer."
                );

            } else {

                showStoryMessage(
                    "TRANSIT RECORD ACCESSED",
                    "Records modified.",
                    "Several passenger records were altered after the departure date. One entry has no recorded destination."
                );

            }

            memoryPanel.classList.remove("show");

            panelOpen = false;

        }

    });


    // =====================================
    // STORY MESSAGE
    // =====================================

    function showStoryMessage(label, title, message) {

        messageLabel.textContent = label;

        messageTitle.textContent = title;

        messageText.textContent = message;

        storyMessage.classList.add("show");

    }


    // =====================================
    // BACK BUTTONS
    // =====================================

    // Back from the memory selection panel to the scene.
    // Supports either backFromMemory or the older closeMemory ID.

    function closeChoicePanel() {

        memoryPanel.classList.remove("show");

        panelOpen = false;

        selectedMemory = null;

        alignButton.disabled = true;

    }


    backFromMemory?.addEventListener("click", closeChoicePanel);

    closeMemory?.addEventListener("click", closeChoicePanel);


    // Back from the story message to the previous choice panel.
    // The selected choice is preserved.

    backFromStory?.addEventListener("click", () => {

        storyMessage.classList.remove("show");

        memoryPanel.classList.add("show");

        panelOpen = true;

    });


    // =====================================
    // CONTINUE STORY
    // =====================================

    continueStory.addEventListener("click", () => {

        storyMessage.classList.remove("show");


        // ---------------------------------
        // AFTER PLATFORM 04
        // ---------------------------------

        if (currentStage === 1) {

            currentStage = 2;

            if (objectiveText) {
                objectiveText.textContent =
                    "Find the source of the recording.";
            }

            changeScene(glassScene);

            return;

        }


        // ---------------------------------
        // AFTER GLASS OVERLOOK
        // ---------------------------------

        if (currentStage === 2) {

            currentStage = 3;

            if (objectiveText) {
                objectiveText.textContent =
                    "Investigate the local archive.";
            }

            changeScene(archiveScene);

            return;

        }


        // ---------------------------------
        // AFTER LOCAL ARCHIVE
        // ---------------------------------

        if (currentStage === 3) {

            currentStage = 4;

            changeScene(endingScene);

        }

    });


    // =====================================
    // PLAYER MOVEMENT
    // =====================================

    document.addEventListener("keydown", event => {

        const key = event.key.toLowerCase();


        // Prevent page scrolling with movement keys.
        if (
            ["arrowleft", "arrowright", " ", "arrowup", "arrowdown"].includes(key)
        ) {
            event.preventDefault();
        }


        // Do not move while the cutscene or a panel is active.
        if (
            !sceneStarted ||
            panelOpen ||
            storyMessage.classList.contains("show")
        ) {
            return;
        }


        // Record pressed keys.
        keys[key] = true;


        // ---------------------------------
        // INTERACTION KEY: E
        // ---------------------------------

        if (key === "e") {

            if (platform.classList.contains("active")) {

                inspectGate();

            }

            if (glassScene.classList.contains("active")) {

                openChoicePanel(2);

            }

            if (archiveScene.classList.contains("active")) {

                openChoicePanel(3);

            }

        }

    });


    document.addEventListener("keyup", event => {

        keys[event.key.toLowerCase()] = false;

    });


    // Stop movement if the browser window loses focus.
    window.addEventListener("blur", () => {

        Object.keys(keys).forEach(key => {
            keys[key] = false;
        });

    });


    // =====================================
    // MOVEMENT UPDATE
    // =====================================

    function updateMovement() {

        if (
            sceneStarted &&
            platform.classList.contains("active") &&
            !panelOpen &&
            !storyMessage.classList.contains("show")
        ) {

            if (keys["arrowright"] || keys["d"]) {

                playerPosition += moveSpeed;

            }

            if (keys["arrowleft"] || keys["a"]) {

                playerPosition -= moveSpeed;

            }


            // Keep player inside the platform.
            playerPosition = Math.max(
                5,
                Math.min(playerPosition, 90)
            );


            // Update player position.
            player.style.left = `${playerPosition}%`;

        }


        requestAnimationFrame(updateMovement);

    }


    updateMovement();


    // =====================================
    // DIALOGUE CONTROLS
    // =====================================

    dialogueContinue?.addEventListener("click", () => {

        dialogueBox.classList.remove("show");

    });


    // =====================================
    // CHAPTER END
    // =====================================

    finishChapter?.addEventListener("click", () => {

        window.location.href = "chapter2.html";

    });


    // =====================================
    // INITIALIZATION
    // =====================================

    console.log("VEYRA Chapter 1 initialized successfully.");

});
