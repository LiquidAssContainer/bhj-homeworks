document.addEventListener('scroll', () => {
    let reveals = document.getElementsByClassName('reveal');

    for (let reveal of reveals) {
        let windowHeight = window.innerHeight,
            box = reveal.getBoundingClientRect();

        if ((box.top < windowHeight && box.top >= 0) || (box.bottom < windowHeight && box.bottom >= 0) || (box.top < 0 && box.bottom >= 0)) { // также проверка на случай очень длинного блока
            reveal.classList.add('reveal_active');
        } else {
            reveal.classList.remove('reveal_active');
        }
    }
})