let input = document.getElementById('task__input'),
    tasksList = document.getElementById('tasks__list');

let tasksArray = localStorage.getItem('tasks');
tasksArray = (tasksArray) ? JSON.parse(tasksArray) : [];
for (let task in tasksArray) {
    addTask(tasksArray[task]);
}

let tasksObserver = new MutationObserver(changeLocalStorage); // для удобства; может, некорректно использую
tasksObserver.observe(tasksList, {
    childList: true,
    subtree: true,
})

document.addEventListener('click', function(e) {
    let {target} = e;

    if (target.classList.contains('task__remove')) {
        e.preventDefault();
        target.closest('.task').remove();
    }

    if (target.id === 'tasks__add' && input.value) {
        addTask(input.value);
    }
})

document.addEventListener('keydown', (e) => {
    if (e.keyCode === '13' && input.value && document.activeElement === input) {
        addTask(input.value);
    }
})

document.addEventListener('submit', (e) => e.preventDefault());

function addTask(taskText) {
    let newTask = `
    <div class="task">
        <div class="task__title">${taskText}</div>
        <a href="#" class="task__remove">&times;</a>
    </div>`;
    tasksList.insertAdjacentHTML('beforeend', newTask);
    input.value = '';
}

function changeLocalStorage() {
    let values = [...document.getElementsByClassName('task__title')];
    values = values.map(item => item.innerText);
    let localData = JSON.stringify(values);
    localStorage.setItem('tasks', localData);
}