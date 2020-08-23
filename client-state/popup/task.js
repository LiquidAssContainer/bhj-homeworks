let modal = document.getElementById('subscribe-modal'),
    modalClose = document.getElementsByClassName('modal__close')[0];

if (getCookie('modal_closed') !== 'true') {
    modal.classList.add('modal_active');
}

modalClose.addEventListener('click', () => {
    document.cookie = 'modal_closed=true';
    modal.classList.remove('modal_active');
});

function getCookie(name) {
    const value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts
            .pop()
            .split(";")
            .shift();
    }
}