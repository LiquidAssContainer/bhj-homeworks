let checkboxes = document.querySelectorAll('input[type="checkbox"]');

for (let checkbox of checkboxes) {
    checkbox.addEventListener('change', (e) => {
        let childInputs = [...e.target.closest('li').getElementsByTagName('input')];

        childInputs.forEach( (item) => {
            item.indeterminate = false;
            item.checked = e.target.checked;
        })

        checkParentIndeterminate(e.target);

        function checkParentIndeterminate(elem) {
            let parentGroupLi = elem.closest('ul').closest('li');

            if (!parentGroupLi) {
                return;
            }

            let parentInput = parentGroupLi.firstElementChild.getElementsByTagName('input')[0],
                parentUl = elem.closest('ul'),
                hasCheckedInput = parentUl.querySelector('input:checked'),
                hasUncheckedInput = parentUl.querySelector('input:not(:checked)');

            if (hasCheckedInput && hasUncheckedInput) {
                parentInput.checked = false;
                parentInput.indeterminate = true;
            } else {
                parentInput.indeterminate = false;
                parentInput.checked = (hasCheckedInput) ? true : false;
            }

            checkParentIndeterminate(parentInput);
        }
    })
}