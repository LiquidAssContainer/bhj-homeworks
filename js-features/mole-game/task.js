let deadCounter = 0,
    lostCounter = 0,
    moleWasKilled = false,

    dead = document.getElementById('dead'),
    lost = document.getElementById('lost'),
    holes = document.getElementsByClassName('hole');

for (let hole of holes) {
    hole.addEventListener('click', () => {
        if (hole.classList.contains('hole_has-mole')) {
            moleWasKilled = true;
            ++deadCounter;
            dead.textContent = deadCounter;
            hole.classList.remove('hole_has-mole');
            hole.classList.add('hole_dead');
        }
        if (deadCounter === 10) {
            setTimeout( () => finishGame('Победа! :)'), 10);
        }
    });
}

function finishGame(alertMessage) {
    alert(alertMessage);
    dead.textContent = deadCounter = 0;
    lost.textContent = lostCounter = 0;
}