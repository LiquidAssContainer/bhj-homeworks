let signin = document.getElementById('signin'),
    signinBtn = document.getElementById('signin__btn'),
    form = document.getElementById('signin__form'),
    logout = document.getElementsByClassName('logout')[0],
    logoutBtn = document.getElementById('logout_btn'),
    idSpan = document.getElementById('user_id'),
    welcome = document.getElementById('welcome');

if (localStorage.id) {
    welcome.classList.add('welcome_active');
    logout.classList.add('logout_active');
    idSpan.textContent = localStorage.id;
} else {
    signin.classList.add('signin_active');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    signinBtn.disabled = true;

    let formData = new FormData(form);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);
    xhr.addEventListener('loadend', () => {
        form.reset();
        signinBtn.disabled = false;

        let response = JSON.parse(xhr.response);
        if (response.success) {
            localStorage.id = response.user_id;
            idSpan.textContent = response.user_id;
            toggleSignin();
        } else {
            alert('Ошибка');
        }
    });
    xhr.send(formData);
});

logoutBtn.addEventListener('click', () => {
    delete localStorage.id;
    toggleSignin();
});

function toggleSignin() {
    signin.classList.toggle('signin_active');
    logout.classList.toggle('logout_active');
    welcome.classList.toggle('welcome_active');
}