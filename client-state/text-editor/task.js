let editor = document.getElementById('editor'),
    clear = document.getElementsByClassName('clear')[0];

if (localStorage.savedText) {
    editor.value = localStorage.savedText;
}

editor.addEventListener('input', function() {
    localStorage.savedText = this.value;
});

clear.addEventListener('click', () => {
    editor.value = '';
    localStorage.savedText = '';
});