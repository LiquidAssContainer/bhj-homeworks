let progressBar = document.getElementById('progress'),
    send = document.getElementById('send'),
    form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    send.disabled = true;

    let formData = new FormData(form);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
    xhr.upload.onprogress = (e) => progressBar.value = e.loaded / e.total;
    xhr.upload.onloadend = () => {
        send.disabled = false;
        progressBar.value = 0;
        form.reset();
        console.log('Успех! А модальное окно лень делать');
    }
    xhr.send(formData);
});