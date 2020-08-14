'use strict'

let sliderItems = document.getElementsByClassName('slider__item'),
    sliderDots = document.getElementsByClassName('slider__dot'),
    sliderArrows = document.getElementsByClassName('slider__arrow'),
    index = 0; // не знаю, стоит ли тут использовать глобальную переменную, но вроде удобно

for (let arrow of sliderArrows) {
    arrow.addEventListener('click', clickSliderArrow);
}

function clickSliderArrow() {
    if (this.classList.contains('slider__arrow_prev')) { // проверка, левая стрелка или правая
        index = (sliderItems[index - 1]) ? index - 1 : sliderItems.length - 1; // не знаю, насколько читабельно
    } else {
        index = (sliderItems[index + 1]) ? index + 1 : 0;
    };
    changeActive('dot');
    changeActive('item');
}

for (let dot of sliderDots) {
    dot.addEventListener('click', () => {
        for (let i = 0; i < sliderDots.length; i++) { // можно ли как-то ещё узнать, какой по счёту является кнопка, на которой произошёл клик?
            if (sliderDots[i] === event.target) {
                index = i;
                changeActive('dot');
                changeActive('item');
            }
        }
    })
}

function changeActive(name) { // не знаю, насколько хорошо решение передавать это в качестве параметра и подставлять в название нужного класса
    let active = document.getElementsByClassName(`slider__${name}_active`)[0];
    active.classList.remove(`slider__${name}_active`);

    let newActive = document.querySelector(`.slider__${name}:nth-child(${index + 1})`);
    newActive.classList.add(`slider__${name}_active`);
}