class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timeElement = container.querySelector('.status__time');
    this.timer = null;

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener('keypress', (event) => {
      if (this.currentSymbol.textContent === event.key.toLowerCase()) {
        this.success();
      } else {
        this.fail();
      }
    })
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();
    const time = word.length * 1000;

    this.renderWord(word);

    clearInterval(this.timer);
    this.lastTime = new Date();
    this.timer = setInterval( () => this.updateTimer(time), 10);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript',
        'я люблю javascript',
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  updateTimer(startValue) { // в первую очередь расчёт на точность измерения времени, погрешность равна интервалу времени в setInterval (10 миллисекунд)
    const now = new Date();
    const difference = now - this.lastTime;
    const remainingTime = startValue - difference;

    if (remainingTime <= 0) {
      this.fail();
    } else {
      this.timeElement.textContent = Math.ceil(remainingTime / 1000);
    }
}
  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

