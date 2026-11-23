
// INTRO CUTSCENE

const cutscene = document.getElementById("cutscene");
const sceneLabel = document.getElementById("sceneLabel");
const sceneTitle = document.getElementById("sceneTitle");
const sceneText = document.getElementById("sceneText");

const skipButton = document.getElementById("skipButton");
const continueButton = document.getElementById("continueButton");

const gameContent = document.getElementById("gameContent");
const cutsceneMusic = document.getElementById("cutsceneMusic");

let currentScene = 0;
let finished = false;

const scenes = [

    {
        label: "LUMA MEMORY ARCHIVE",
        title: "VEYRA",
        text: "Some memories are never truly lost."
    },

    {
        label: "ARCHIVE RECORD — UNKNOWN",
        title: "A CITY OF ECHOES",
        text: "Once, this city remembered everything. Every voice. Every face. Every moment."
    },

    {
        label: "SYSTEM WARNING",
        title: "THE FORGOTTEN",
        text: "But something happened. Memories began to disappear, and the archive could no longer distinguish truth from illusion."
    },

    {
        label: "PERSONAL MEMORY",
        title: "A FAMILIAR VOICE",
        text: "Your mother left behind an unfinished collection. And somewhere inside it, something is waiting for you."
    },

    {
        label: "LUMA CONNECTION ESTABLISHED",
        title: "WELCOME BACK",
        text: "Your journey through Veyra begins now."
    }

];


// START CUTSCENE

window.addEventListener("load", () => {

    cutscene.classList.add("active");

    cutsceneMusic.volume = 0.35;

    cutsceneMusic.play().catch(() => {
        console.log("Music will start after user interaction.");
    });

    showScene();

});


// DISPLAY SCENES

function showScene() {

    if (finished) return;

    const scene = scenes[currentScene];

    sceneLabel.textContent = scene.label;
    sceneTitle.textContent = scene.title;
    sceneText.textContent = scene.text;

    sceneText.classList.remove("visible");

    setTimeout(() => {
        sceneText.classList.add("visible");
    }, 300);

    if (currentScene === scenes.length - 1) {
        continueButton.style.display = "block";
    }

}


// NEXT SCENE

continueButton.addEventListener("click", () => {

    if (currentScene < scenes.length - 1) {

        currentScene++;
        showScene();

    } else {

        endCutscene();

    }

});


// SKIP INTRO

skipButton.addEventListener("click", () => {

    endCutscene();

});


// END CUTSCENE

function endCutscene() {

    if (finished) return;

    finished = true;

    cutscene.classList.remove("active");

    cutsceneMusic.pause();

    setTimeout(() => {

        cutscene.style.display = "none";

        gameContent.style.display = "flex";

        requestAnimationFrame(() => {
            gameContent.classList.add("visible");
        });

    }, 2000);

}
