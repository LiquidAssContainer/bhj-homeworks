document.addEventListener('click', function(e) {
    let {target} = e;
    if (target.classList.contains('tab')) {
        let tabGroup = target.closest('.tabs'),
            activeTab = tabGroup.getElementsByClassName('tab_active')[0],
            activeTabContent = tabGroup.getElementsByClassName('tab__content_active')[0];

        activeTab.classList.remove('tab_active');
        activeTabContent.classList.remove('tab__content_active');
        target.classList.add('tab_active');

        let currentTabs = tabGroup.getElementsByClassName('tab'),
            index = [...currentTabs].indexOf(target),
            newActiveTabContent = tabGroup.getElementsByClassName('tab__content')[index];

        newActiveTabContent.classList.add('tab__content_active');
    }
})