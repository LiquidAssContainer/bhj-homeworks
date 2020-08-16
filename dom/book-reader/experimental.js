'use strict'

let controlButtons = document.querySelectorAll('.book__control a'),
    book = document.getElementById('book');

for (let button of controlButtons) {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        let controlGroup = this.parentElement;
        let activeClassPrefix, bookPropertyName, bookPropertyClasses, datasetProperty;

        if (controlGroup.classList.contains('book__control_font-size')) {
            activeClassPrefix = 'font-size';
            bookPropertyName = 'book_fs';
            bookPropertyClasses = ['book_fs-big', 'book_fs-small'];
            datasetProperty = 'size';
        }

        if (controlGroup.classList.contains('book__control_color')) {
            activeClassPrefix = 'color';
            bookPropertyName = 'book_color';
            bookPropertyClasses = ['book_color-gray', 'book_color-whitesmoke'];
            datasetProperty = 'color';
        }

        if (controlGroup.classList.contains('book__control_background')) {
            activeClassPrefix = 'color';
            bookPropertyName = 'book_bg';
            bookPropertyClasses = ['book_bg-gray', 'book_bg-black'];
            datasetProperty = 'color';
        }

        let activeControl = controlGroup.getElementsByClassName(`${activeClassPrefix}_active`)[0];
        
        activeControl.classList.remove(`${activeClassPrefix}_active`);
        this.classList.add(`${activeClassPrefix}_active`);
        book.classList.remove(...bookPropertyClasses);

        let property = this.dataset[datasetProperty];
        if (property) {
            book.classList.add(`${bookPropertyName}-${property}`);
        }
    })
}