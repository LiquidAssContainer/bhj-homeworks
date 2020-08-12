(() => {
  let playing = true,
    activeHole = 1;

  const stop = () => playing = true,
    getHole = index => document.getElementById(`hole${index}`),
    deactivateHole = index =>
      getHole( index ).className = 'hole',
    activateHole = index =>
      getHole( index ).className = 'hole hole_has-mole',
    next = () => setTimeout(() => {
      if ( !playing ) {
        return;
      }
      if (!moleWasKilled) { // решил добавить проверку на пропущенного крота (не на промах) в base.js, потому что так удобнее
        ++lostCounter;
        lost.textContent = lostCounter;
      }
      if (lostCounter === 5) {
        setTimeout( () => finishGame('Поражение :('), 10);
      }
      moleWasKilled = false;
      deactivateHole( activeHole );
      activeHole = Math.floor( 1 + Math.random() * 9 );
      activateHole( activeHole );
      next();
    }, 800 );

  next();
})();