// plays the sound
function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    if(!audio) return; // when clicked a button with no audio
    if (e['key'] === " ") { // MUTES THE SOUND
        const key = document.querySelector(`.space[data-key="${e.keyCode}"]`);
        let sounds = document.getElementsByTagName('audio');
        for( let i=0; i<sounds.length; i++ ) sounds[i].pause();
        key.classList.add("playing"); // adds a class to apply styles

    } else { // PLAY
        const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
        audio.currentTime = 0; // rewinds every time it is clicked
        audio.play();

        key.classList.add("playing"); // adds a class to apply styles
    }
}

// remove the class with a transition time event -> to return to its original state
function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // skip if it's not a 'transform' property
    this.classList.remove('playing'); // this -> 'key' (v)
}

// define EventListeners
const keys = document.querySelectorAll('.key');
const space = document.querySelectorAll('.space');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
space.forEach(key => key.addEventListener('transitionend', removeTransition));

// listen and play sound
window.addEventListener('keydown', playSound);
