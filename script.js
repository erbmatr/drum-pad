const pads = document.querySelectorAll(".pad");
const volumeControl = document.getElementById("volume");

function playSound(pad) {
    const audio = new Audio(pad.dataset.sound);
    audio.volume = volumeControl.value || 1;
    audio.currentTime = 0;
    audio.play();


    pad.classList.add("active");
    setTimeout(() => pad.classList.remove("active"),100);
}

// MOUSE CLICK
pads.forEach(pad => {
    pad.addEventListener("click",() => playSound(pad));
});

// KEYBOARD PRESSES
document.addEventListener("keydown",(e) => {
    const key = e.key;
    const pad = document.querySelector(`.pad[data-key="${key}"]`);
    if (pad) playSound(pad);
});
