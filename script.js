//loading

window.addEventListener("load", () => {

    // GET HTML ELEMENTS

    const loadingScreen = document.querySelector(".loading-screen");
    const progress = document.getElementById("progress");
    const percentage = document.getElementById("percentage");
    const loadingText = document.getElementById("loadingText");
    const mainMenu = document.getElementById("mainMenu");


    // CHECK ELEMENTS

    if (
        !loadingScreen ||
        !progress ||
        !percentage ||
        !loadingText ||
        !mainMenu
    ) {
        console.error("LUMA ERROR: Missing HTML elements!");
        return;
    }


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

        // UPDATE PROGRESS BAR
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
        if (count >= 100) {

            clearInterval(loadingInterval);

            setTimeout(() => {

                // FADE OUT LOADING SCREEN
                loadingScreen.style.opacity = "0";

                setTimeout(() => {

                    // HIDE LOADING SCREEN
                    loadingScreen.style.display = "none";

                    // SHOW MAIN MENU
                    mainMenu.style.display = "flex";

                }, 1500);

            }, 700);

        }

    }, loadingSpeed);

});
