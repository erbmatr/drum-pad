// INITIALIZATION - Get elements once
const pads = document.querySelectorAll(".pad"); // get all pads
const volumeControl = document.getElementById("volume"); // get volume slider
const resetButton = document.getElementById("reset"); // get reset button

// LOAD FROM LOCAL STORAGE
const savedKeys = JSON.parse(localStorage.getItem("padKeys")) || {}; // retrieve all saved pad, if nothing in saved {}

pads.forEach((pad, index) => { // for each pad on vérifie s'il existe un pad save on remplace le pad par le saved on met a jour
    if (savedKeys[index]) {
        pad.dataset.keyboard = savedKeys[index];
        pad.querySelector(".key").textContent = savedKeys[index];
    }
});

// REMAP KEYBOARD
let padToConfig = null; //savoir quel pad configurer, tant que ce n'est pas = null pas en mode config.

// add click listeners to all config buttons
pads.forEach((pad, index) => { //for each pad, on récupère bouton, et on mémorise pad+index, on informe user
    
    const configButton = pad.querySelector(".config"); // get config button

    configButton.addEventListener("click", () => {

        // exit previous mode config
        if (padToConfig) {
            padToConfig.pad.classList.remove("config-mode");
        }
        
        // enter config mode for clicked pad
        padToConfig = { pad, index }; // store pad+index
        pad.classList.add("config-mode"); // effet visuel
    });
});

// Listen for keyboardpressed in config mode
document.addEventListener("keydown", (e) => {
    if (!padToConfig) return; // si pas de config on sort

    const newKey = e.key.toUpperCase(); // normalize keyboard to uppercase

    // update pad with new keyboard
    padToConfig.pad.dataset.keyboard = newKey // récupération de la touche préssée
    padToConfig.pad.querySelector(".key").textContent = newKey; // MAJ du pad

    // save to localstorage
    savedKeys[padToConfig.index] = newKey;
    localStorage.setItem("padKeys", JSON.stringify(savedKeys));

    // exit config mode
    padToConfig.pad.classList.remove("config-mode"); // remove visual indic
    padToConfig = null; // reset config state
});

// RESET BUTTON = clear custom mappings
resetButton.addEventListener("click", () => {
    localStorage.removeItem("padKeys");
    location.reload();
});

// PLAY SOUND
function playSound(pad) {
    const audio = new Audio(pad.dataset.sound); // create new audio object
    audio.volume = volumeControl.value || 1; // set volum default
    audio.currentTime = 0; // reset to start
    audio.play(); // play sound


    pad.classList.add("active"); // add orange effect
    setTimeout(() => pad.classList.remove("active"), 100); // remove effect after 100ms
}

// MOUSE CLICK
pads.forEach(pad => {
    pad.addEventListener("click", (e) => {

        // prevent triggering
        if (e.target.classList.contains("config")) return;
        
        playSound(pad); // play sound when pad is clicked
    });
});

// KEYBOARD INTERACTION
document.addEventListener("keydown", (e) => {
    if (padToConfig) return;  // on écoute toutes les touches préssées, si pas de config on sort

    const key = e.key.toUpperCase(); // normalize keyboard to uppercase
    const pad = document.querySelector(`.pad[data-keyboard="${key}"]`); // find matching pad
    if (pad) playSound(pad); // if pad exist play
});
