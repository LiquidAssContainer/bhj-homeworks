const rotators = document.getElementsByClassName('rotator')

function rotate() {
    for (rotator of rotators) {
        const ad = rotator.querySelector('.rotator__case_active')
        const nextAd = ad.nextElementSibling
        const currentAd = nextAd ? nextAd : ad.parentElement.firstElementChild
        ad.classList.remove('rotator__case_active')
        currentAd.classList.add('rotator__case_active')
        currentAd.style.color = currentAd.dataset.color
        setTimeout(rotate, currentAd.dataset.speed)
    }
}

setTimeout(rotate, 1000)