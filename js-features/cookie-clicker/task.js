let counter = 0,
    counterSpan = document.getElementById('clicker__counter'),
    cookie = document.getElementById('cookie'),
    lastClickDate = new Date();

let clickerSpeed = document.createElement('div'); // можно было и в разметке написать, но решил создать через JS
clickerSpeed.innerHTML = "Скорость клика: <span id='clicker__speed'>0</span>";

let clickerStatus = document.querySelector('.clicker__status');
clickerStatus.appendChild(clickerSpeed);

cookie.addEventListener('click', () => {
    cookie.style.width = (cookie.style.width === '190px') ? '200px' : '190px'; // с классами или анимацией, наверное, было бы лучше
    ++counter;
    counterSpan.textContent = counter;

    let clickerSpeedSpan = document.getElementById('clicker__speed');
    clickerSpeedSpan.textContent = Math.round(1000 / (new Date() - lastClickDate) * 100) / 100; // работает вроде верно
    lastClickDate = new Date();
})