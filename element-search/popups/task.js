'use strict'

let modal = document.getElementById('modal_main'),
    modalCloseButtons = document.getElementsByClassName('modal__close_times'),
    showSuccessButtons = document.getElementsByClassName('btn');

modal.classList.add('modal_active');

for (let closeButton of modalCloseButtons) {
    closeButton.addEventListener('click', function() {
        this.closest('.modal').classList.remove('modal_active');
    })
}

for (let successButton of showSuccessButtons) {
    successButton.addEventListener('click', function() {
        this.closest('.modal').classList.remove('modal_active');
        if (this.classList.contains('btn_danger')) {
            let modalSuccess = document.getElementById('modal_success');
            modalSuccess.classList.add('modal_active');
        }
    })
}