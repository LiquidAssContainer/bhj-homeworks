let botMessages = {
    answers: [
        'Катитесь отсюда, знать вас не хочу',
        'Я вам отвечать ничего не буду',
        'Это вообще вас не касается',
    ],
    questions: [
        'ПОЧЕМУ НИЧЕГО НЕ ПИШЕТЕ?',
        'Здравствуйте, так вы будете что-то писать? Чего я жду? Зачем вы моё время тратите???',
        'Не очень-то и нужно было!',
    ],
};

let messages = document.querySelector( '.chat-widget__messages' ),
    input = document.getElementById('chat-widget__input'),
    widget = document.getElementsByClassName('chat-widget')[0];

widget.addEventListener('click', () => {
    if (!widget.classList.contains('chat-widget_active')) {
        window.timer = setTimeout(askAQuestion, 1000 * 30);
    }
    widget.classList.add('chat-widget_active');
})

document.addEventListener('keydown', (e) => {
    let isFocused = (document.activeElement === input);
    if (e.keyCode === 13 && isFocused && input.value) {
        postMessage(input.value, 'client');
        input.value = '';

        let botAnswer = botMessages.answers[Math.floor(Math.random() * botMessages.answers.length)];
        setTimeout( () => postMessage(botAnswer), 1500);

        clearTimeout(timer);
    }
})

function askAQuestion() {
    let botQuestion = botMessages.questions[Math.floor(Math.random() * botMessages.questions.length)];
    postMessage(botQuestion);
}

function postMessage(message, author) {
  let time = new Date().toLocaleTimeString('ru-RU');
  time = time.substring(0, time.length - 3);

  messages.innerHTML += `
    <div class="message${(author === 'client') ? ' message_client' : ''}">
      <div class="message__time">${time}</div>
      <div class="message__text">
        ${message}
      </div>
    </div>`;

  let container = document.getElementsByClassName('chat-widget__messages-container')[0];
  container.scrollTo(0, container.offsetHeight);
}