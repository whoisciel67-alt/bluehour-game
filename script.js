// loading screen //

window.addEventListener("load", () => {
    //get html elements//
    const loadingScreen = document.querySelector(".loading.screen")
    const progress = document.getElementById("progress");
    const percentage = document.getElementById("percentage");
    const loadingText = document.getElementById("loadingText");
    const mainMenu = document.getElementById("mainMenu");

    if (
        !loadingScreen ||
        !progress ||
        !percentage ||
        !loadingText ||
        !mainMenu
    ){
        console.error("LUMA ERROR: Loading screen elements missing.");
        return;
    }

    let count = 0;
    const loadingSpeed = 35; //milliseconds
    const loadingMessages = [
        {
            percent: 0,
            message: "SYNCHRONIZING MEMORIES..."
        },

        {
            percent: 20,
            message: "RESTORING ARCHIVE..."
        },

        {
            percent: 40,
            message: "SEARCHING FOR LOST DATA..."
        },

        {
            percent: 60,
            message: "MEMORY FRAGMENTS FOUND..."
        },

        {
            percent: 80,
            message: "RECONNECTING TO VEYRA..."
        },

        {
            percent: 100,
            message: "WELCOME BACK TO VEYRA."
        }
    ];

    //loading animation//

    loadingText.textContent = loadingMessages[0].message;

    const loadingInterval = setInterval(() => {

        count++;

        //update progress bar
        progress.style.width = count + "%";

        //update progress text
        percentage.textContent = count + "%";

    //update loading msgs

        for (let i = loadingMessages.length - 1; i >= 0; i--) {

            if (count >= loadingMessages[i].percent) {

                loadingText.textContent = loadingMessages[i].message;

                break;

            }

        }

    //finish loading

        if (count >= 100) {
            clearInterval(loadingInterval);

            //wait before transition
            setTimeout(() => {
                //fade out
                loadingScreen.style.opaciy = "0";

                //wait for fade animation
                setTimeout(() => {
                    loadingScreen.style.display = "none";

                    //show main menu
                    mainMenu.style.display = "flex";

                }, 1500);
            }, 700);
        }

    }, loadingSpeed);

});