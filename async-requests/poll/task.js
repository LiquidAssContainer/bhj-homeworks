let pollTitle = document.getElementById('poll__title'),
    pollAnswers = document.getElementById('poll__answers');

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php');
xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        let parsed = JSON.parse(xhr.response),
            title = parsed.data.title,
            answers = parsed.data.answers;
            window.id = parsed.id; // возможно, не лучшее решение, чтобы сохранить id

        let buttons = '';
        for (let item of answers) {
            buttons += `<button class="poll__answer">${item}</button>`;
        }
        pollAnswers.innerHTML = buttons;
        pollTitle.innerText = title;
    }
});
xhr.send();

document.addEventListener('click', (e) => {
    let {target} = e;
    if (target.classList.contains('poll__answer')) {
        // target.classList.add('poll__answer_voted');
        // modal.classList.add('modal__active'); // тут не оказалось готовых стилей и разметки; думаю, ничего страшного, если без модального окна
        let answers = pollAnswers.getElementsByClassName('poll__answer');
        let index = [...answers].indexOf(target);
        requestPollResult(id, index);
    }
});

function requestPollResult(id, index) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.addEventListener('load', () => {
        let stat = JSON.parse(xhr.response).stat;
        showPollResult(stat);
    });
    xhr.send(`vote=${id}&answer=${index}`);
}

function showPollResult(result) {
    let totalVotes = 0;
    for (let item of result) {
        totalVotes += item.votes;
    }

    let resultList = '';
    for (let item of result) {
        resultList += `<div>${item.answer}: <span style="font-weight: 700">${+(item.votes / totalVotes * 100).toFixed(2)} %</span></div>`;
    }
    pollAnswers.innerHTML = resultList;
}