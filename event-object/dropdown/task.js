let dropdownValues = document.getElementsByClassName('dropdown__value'),
    dropdownLinks = document.getElementsByClassName('dropdown__link');

for (let value of dropdownValues) {
    value.addEventListener('click', function() {
        let dropdownList = this.nextElementSibling,
            activeList = document.getElementsByClassName('dropdown__list_active')[0];

        if (activeList) {
            activeList.classList.remove('dropdown__list_active');
        }

        if (dropdownList !== activeList) {
            dropdownList.classList.add('dropdown__list_active');
        }
    })
}

for (let link of dropdownLinks) {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        let dropdownMenu = this.closest('.dropdown'),
            dropdownList = dropdownMenu.getElementsByClassName('dropdown__list')[0],
            dropdownValue = dropdownMenu.getElementsByClassName('dropdown__value')[0];

        dropdownList.classList.remove('dropdown__list_active');
        dropdownValue.textContent = this.textContent;
    })
}