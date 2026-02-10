const pads = document.querySelectorAll(".pad");

function playSound(pad) {
    const sound = new Audio(pad.dataset.sound);
    sound.currentTime = 0;
    sound.play();


    pad.classList.add("active");
    setTimeout(() => pad.classList.remove("active"),100);
}

// MOUSE CLICK
pads.forEach(pad => {
    pad.addEventListener("click",() => playSound(pad));
});

// KEYBOARD PRESSES
document.addEventListener("keydown",(e) => {
    const key = e.key.toLocaleUpperCase();
    const pad = document.querySelector(`.pad[data-key="${key}"]`);
    if (pad) playSound(pad);
})
