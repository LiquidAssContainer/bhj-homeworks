'use strict'

let menuLinks = document.getElementsByClassName('menu__link');

for (let link of menuLinks) {
    link.addEventListener('click', function(event) {
        if (this.href.includes('http')) { // если открывать файлы локально, то приходится делать такую проверку, а не просто if (this.href)
            return;
        }
        event.preventDefault();

        let currentMenuSub = this.nextElementSibling, // очевидно, работает лишь когда в HTML за ссылкой сразу следует подменю, но не знаю, стоит ли усложнять
            menuMain = this.closest('.menu'), // для возможности наличия нескольких меню
            previousActiveMenu = menuMain.getElementsByClassName('menu_active')[0];

        if (previousActiveMenu) {
            previousActiveMenu.classList.remove('menu_active');
        }
        if (currentMenuSub !== previousActiveMenu) {
            currentMenuSub.classList.add('menu_active');
        }
    })
}