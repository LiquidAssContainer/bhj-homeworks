let rotators = document.getElementsByClassName('rotator');

for (let rotator of rotators) {
    switchRotatorCase(rotator); // будет начинаться с «Я Лучший программист на земле», гифка в задании тоже с него начинается
}

function switchRotatorCase(rotator) { // для существования множества ротаторов передаю нужную группу ротаторов в качестве аргумента (наверняка можно было найти более хороший способ)
    let activeCase = rotator.getElementsByClassName('rotator__case_active')[0],
        newActiveCase = (activeCase.nextElementSibling) ? activeCase.nextElementSibling : activeCase.parentElement.firstElementChild;

    activeCase.classList.remove('rotator__case_active');
    newActiveCase.classList.add('rotator__case_active');

    let color = newActiveCase.dataset.color,
        delay = newActiveCase.dataset.speed;

    newActiveCase.style.color = color;
    setTimeout( () => switchRotatorCase(rotator), delay);
}