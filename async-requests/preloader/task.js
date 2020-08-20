let loader = document.getElementById('loader'),
    items = document.getElementById('items');

let localData = localStorage.getItem('currencies');
if (localData) {
    localData = JSON.parse(localData);
    renderCurrencies(localData);
}

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://netology-slow-rest.herokuapp.com/');
xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        let parsed = JSON.parse(xhr.response),
            valute = parsed.response.Valute;

        loader.classList.remove('loader_active'); // если есть данные в кэше, то loader будет отображаться внизу, пока не будут получены новые данные
        renderCurrencies(valute);

        let localData = JSON.stringify(valute);
        localStorage.setItem('currencies', localData);
    }
});
xhr.send();

function renderCurrencies(valute) {
    let valuteList = '';
    for (let item in valute) {
        valuteList += `
        <div class="item">
            <div class="item__code">${valute[item].CharCode}</div>
            <div class="item__value">${valute[item].Value}</div>
            <div class="item__currency">руб.</div>
        </div>`;
    }
    items.innerHTML = valuteList;
}