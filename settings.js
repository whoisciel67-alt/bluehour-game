/*global settings*/

document.addEventListener("DOMContentLoaded", () => {

    const soundButton = document.getElementById("soundToggle");
    const settingsButton = document.getElementById("settingsButton");
    const settingsOverlay = document.getElementById("settingsOverlay");
    const closeSettings = document.getElementById("closeSettings");

    const musicVolume = document.getElementById("musicVolume");
    const sfxVolume = document.getElementById("sfxVolume");
    const dialogueSize = document.getElementById("dialogueSize");

    if (!soundButton || !settingsButton || !settingsOverlay) return;

    // Load saved settings
    const savedSettings = JSON.parse(
        localStorage.getItem("veyraSettings") || "{}"
    );

    const settings = {
        soundEnabled: savedSettings.soundEnabled ?? true,
        musicVolume: savedSettings.musicVolume ?? 70,
        sfxVolume: savedSettings.sfxVolume ?? 85,
        dialogueSize: savedSettings.dialogueSize ?? "medium"
    };

    // Save settings
    function saveSettings() {
        localStorage.setItem("veyraSettings", JSON.stringify(settings));
    }

    // Identify music and sound effects
    function getAudioType(audio) {
        if (audio.dataset.audioType) {
            return audio.dataset.audioType;
        }

        const identifier = `${audio.id} ${audio.src}`.toLowerCase();

        return /music|theme|bgmusic|background/.test(identifier)
            ? "music"
            : "sfx";
    }

    // Apply volume and master sound toggle
    function applyAudioSettings() {
        document.querySelectorAll("audio").forEach(audio => {
            const type = getAudioType(audio);

            audio.muted = !settings.soundEnabled;

            audio.volume = type === "music"
                ? settings.musicVolume / 100
                : settings.sfxVolume / 100;
        });

        soundButton.textContent = settings.soundEnabled
            ? "♫ SOUND ON"
            : "♫ SOUND OFF";
    }

    // Apply dialogue text size only
    function applyDialogueSize() {
        document.documentElement.style.setProperty(
            "--veyra-dialogue-size",
            settings.dialogueSize === "small" ? "14px" :
            settings.dialogueSize === "large" ? "22px" :
            "18px"
        );
    }

    // Open popup
    settingsButton.addEventListener("click", () => {
        settingsOverlay.classList.add("open");
    });

    // Close popup
    function hideSettings() {
        settingsOverlay.classList.remove("open");
    }

    closeSettings.addEventListener("click", hideSettings);

    settingsOverlay.addEventListener("click", event => {
        if (event.target === settingsOverlay) {
            hideSettings();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            hideSettings();
        }
    });

    // Master sound toggle
    soundButton.addEventListener("click", () => {
        settings.soundEnabled = !settings.soundEnabled;
        saveSettings();
        applyAudioSettings();
    });

    // Music volume
    musicVolume.addEventListener("input", () => {
        settings.musicVolume = Number(musicVolume.value);
        document.getElementById("musicVolumeValue").textContent =
            `${settings.musicVolume}%`;

        saveSettings();
        applyAudioSettings();
    });

    // Sound effects volume
    sfxVolume.addEventListener("input", () => {
        settings.sfxVolume = Number(sfxVolume.value);
        document.getElementById("sfxVolumeValue").textContent =
            `${settings.sfxVolume}%`;

        saveSettings();
        applyAudioSettings();
    });

    // Dialogue text size
    dialogueSize.addEventListener("change", () => {
        settings.dialogueSize = dialogueSize.value;
        saveSettings();
        applyDialogueSize();
    });

    // Restore saved values in popup
    musicVolume.value = settings.musicVolume;
    sfxVolume.value = settings.sfxVolume;
    dialogueSize.value = settings.dialogueSize;

    document.getElementById("musicVolumeValue").textContent =
        `${settings.musicVolume}%`;

    document.getElementById("sfxVolumeValue").textContent =
        `${settings.sfxVolume}%`;

    // Apply settings
    applyAudioSettings();
    applyDialogueSize();

    // Reapply settings when audio starts playing
    document.addEventListener("play", event => {
        if (event.target instanceof HTMLAudioElement) {
            applyAudioSettings();
        }
    }, true);

    saveSettings();
});