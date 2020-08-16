'use strict'

let controlButtons = document.querySelectorAll('.book__control a'),
    book = document.getElementById('book');

for (let button of controlButtons) {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        let controlGroup = this.parentElement;

        if (controlGroup.classList.contains('book__control_font-size')) { // не уверен, что есть способ написать код изящнее и короче, чем с тремя похожими проверками
            let activeControl = controlGroup.getElementsByClassName('font-size_active')[0];
            activeControl.classList.remove('font-size_active');
            this.classList.add('font-size_active');
            book.classList.remove('book_fs-big', 'book_fs-small');

            let size = this.dataset.size;
            if (size) {
                book.classList.add(`book_fs-${size}`);
            }
        }

        if (controlGroup.classList.contains('book__control_color')) {
            let activeControl = controlGroup.getElementsByClassName('color_active')[0];
            activeControl.classList.remove('color_active');
            this.classList.add('color_active');
            book.classList.remove('book_color-gray', 'book_color-whitesmoke');

            let color = this.dataset.color;
            if (color) {
                book.classList.add(`book_color-${color}`);
            }
        }

        if (controlGroup.classList.contains('book__control_background')) {
            let activeControl = controlGroup.getElementsByClassName('color_active')[0];
            activeControl.classList.remove('color_active');
            this.classList.add('color_active');
            book.classList.remove('book_bg-black', 'book_bg-gray');

            let color = this.dataset.color;
            if (color) {
                book.classList.add(`book_bg-${color}`);
            }
        }
    })
}