let startValue = 60 * 1000,
    timer = document.getElementById('timer'),
    lastTime = new Date(),
    tick = setInterval(updateTimer, 20);

timer.textContent = getFormattedTime(startValue);

function updateTimer() {
    let now = new Date(),
        difference = now - lastTime,
        remainingTime = startValue - difference;

    if (remainingTime <= 0) {
        clearInterval(tick);
        timer.textContent = getFormattedTime(0);
        window.location = 'https://gitlab.com/CalcProgrammer1/OpenRGB/uploads/74a0931f48e744497b485b2d0e1527e1/OpenRGB_0.3_32_308bb6f9.7z';
    } else {
        timer.textContent = getFormattedTime(remainingTime);
    }
}

function getFormattedTime(time) { // ожидается в миллисекундах
    let remaining = time;
    let ms = remaining % 1000;
    remaining = (remaining - ms) / 1000;
    let s = remaining % 60;
    remaining = (remaining - s) / 60;
    let m = remaining % 60;
    remaining = (remaining - m) / 60;
    let h = remaining;

    return `${twoDigits(h)}:${twoDigits(m)}:${twoDigits(s)}.${twoDigits(Math.round(ms / 10))}`; // длинновато получилось

    function twoDigits(digit) {
        return (digit < 10) ? '0' + digit : digit;
    }
}