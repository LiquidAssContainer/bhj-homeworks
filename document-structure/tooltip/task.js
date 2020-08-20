document.addEventListener('click', (e) => { // наверное, здесь бы ещё доработать/отрефакторить, но отправлю так. в реальности же более удобные способы реализации? с помощью CSS и прочее
    let {target} = e;

    if (target.classList.contains('has-tooltip')) {
        e.preventDefault();

        let active = document.getElementsByClassName('tooltip_active')[0];
        if (active) {
            active.remove();
        }
        if (target.nextElementSibling === active) {
            return;
        }

        let {left, top, right, bottom} = target.getBoundingClientRect();
        let toolTipStyle,
            tooltipPosition = target.dataset.position;

        switch(tooltipPosition) {
            case 'top':
                toolTipStyle = `left: ${left}px; bottom: ${window.innerHeight - top}px`;
                break;
            case 'left':
                toolTipStyle = `right: ${window.innerWidth - left}px; top: ${top}px`;
                break;
            case 'right':
                toolTipStyle = `left: ${right}px; top: ${top}px`;
                break;
            case 'bottom':
            default:
                toolTipStyle = `left: ${left}px; top: ${bottom}px`;
        }

        let tooltip = `
        <div class="tooltip tooltip_active" style="${toolTipStyle}">
            ${target.title}
        </div>`;
        target.insertAdjacentHTML('afterend', tooltip);
    } else if (!target.classList.contains('tooltip_active')) {
        let active = document.getElementsByClassName('tooltip_active')[0];
        if (active) {
            active.remove();
        }
    }
});