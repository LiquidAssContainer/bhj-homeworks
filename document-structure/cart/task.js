let cart = document.getElementsByClassName('cart')[0],
    cartProducts = document.getElementsByClassName('cart__products')[0];

let cachedProducts = localStorage.getItem('cartProducts');
cachedProducts = JSON.parse(cachedProducts);
for (let product in cachedProducts) {
    let {id, count, src} = cachedProducts[product];
    addToCart(id, count, src);
}

let cartObserver = new MutationObserver(updateLocalData); // для удобства, чтобы не добавлять updateLocalData() в конкретные места кода и функции
cartObserver.observe(cartProducts, {
    childList: true,
    subtree: true,
})

document.addEventListener('click', function(e) { // задал единый обработчик, но не много ли if'ов выходит? 🤔
    let {target} = e;

    if (target.classList.contains('product__quantity-control_dec')) {
        let value = target.nextElementSibling;
        if (value.innerText > 1) {
            value.innerText = +value.innerText - 1;
        }
    }

    if (target.classList.contains('product__quantity-control_inc')) {
        let value = target.previousElementSibling;
        value.innerText = +value.innerText + 1;
    }

    if (target.classList.contains('product__add')) {
        let product = target.closest('.product'),
            value = product.getElementsByClassName('product__quantity-value')[0],
            id = product.dataset.id,
            src = product.getElementsByTagName('img')[0].src;

        addToCart(id, +value.innerText, src);
        animateAddition(product, id);
        value.innerText = 1;
    }

    if (target.classList.contains('cart__product-dec')) { // фактически никак не требовалось в задании
        let product = target.closest('.cart__product'),
            value = product.getElementsByClassName('cart__product-count')[0];
            
        if (value.innerText > 1) {
            value.innerText = +value.innerText - 1;
        } else {
            cartProductRemove(target);
        }
    }

    if (target.classList.contains('cart__product-inc')) { // фактически никак не требовалось в задании
        let product = target.closest('.cart__product'),
            value = product.getElementsByClassName('cart__product-count')[0];
            
        value.innerText = +value.innerText + 1;
    }

    if (target.classList.contains('cart__product-remove')) {
        cartProductRemove(target);
    }
})

function cartProductRemove(product) {
    product.parentElement.remove();
    if (!cartProducts.getElementsByClassName('cart__product')[0]) {
        cart.classList.remove('cart__active');
    }
}

function addToCart(id, countToAdd, imgSrc) {
    cart.classList.add('cart__active');

    let product = cartProducts.querySelector(`.cart__product[data-id='${id}'`);
    if (product) {
        let count = product.getElementsByClassName('cart__product-count')[0];
        count.innerText = +count.innerText + countToAdd;
    } else {
        let newProduct = `
        <div class="cart__product" data-id="${id}">
            <img class="cart__product-image" src="${imgSrc}">
            <div class="cart__product-count">${countToAdd}</div>
            <a class="cart__product-remove">×</a>
            <a class="cart__product-dec">-</a>
            <a class="cart__product-inc">+</a>
        </div>`;
        cartProducts.insertAdjacentHTML('beforeend', newProduct);
    }
}

function animateAddition(product, id) { // либо ужасный код, либо иначе тут особо никак 🤔
    let cartProduct = cartProducts.querySelector(`.cart__product[data-id='${id}'`),
        startImg = product.getElementsByTagName('img')[0],
        finishImg = cartProduct.getElementsByTagName('img')[0],
        movingImg = startImg.cloneNode(false);

    let startLeft = startImg.getBoundingClientRect().left,
        startTop = startImg.getBoundingClientRect().top,
        finishLeft = finishImg.getBoundingClientRect().left,
        finishTop = finishImg.getBoundingClientRect().top;

    movingImg.style.position = 'fixed';
    product.insertAdjacentElement('afterend', movingImg);

    let n = 1,
        iterationCount = 30;

    let animation = setInterval( () => {
        leftDist = (finishLeft - startLeft) / iterationCount * n;
        topDist = (finishTop - startTop) / iterationCount * n;

        movingImg.style.left = startLeft + leftDist + 'px';
        movingImg.style.top = startTop + topDist + 'px';
        n++;
        if (n === iterationCount) {
            movingImg.remove();
            clearInterval(animation);
        }
    }, 10)
}

function updateLocalData() {
    let products = [...document.getElementsByClassName('cart__product')];
    products = products.map(item => {
        let id = item.dataset.id,
            count = item.getElementsByClassName('cart__product-count')[0].innerText,
            src = item.getElementsByTagName('img')[0].src;
        return {id, count, src};
    });

    let localData = JSON.stringify(products);
    localStorage.setItem('cartProducts', localData);
}