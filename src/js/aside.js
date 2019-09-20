export let Aside = {
    add() {
        let $aside = $('.aside'),
            $list = $aside.find('.aside__menu');
            
        Aside.addHtml($list, 'Option 1', 'fas fa-chart-bar', 'active');
        Aside.addHtml($list, 'Option 2', 'fas fa-user-friends');
        Aside.addHtml($list, 'Option 3', 'fas fa-address-card'); 
        Aside.addHtml($list, 'Option 4', 'fas fa-tablet-alt');
        Aside.addHtml($list, 'Option 5', 'fas fa-calendar-alt');
        Aside.addHtml($list, 'Option 6', 'fas fa-server'); 
        Aside.addHtml($list, 'Option 7', 'fas fa-sliders-h');
        Aside.addHtml($list, 'Option 8', 'fas fa-power-off');
    },

    addHtml($list, menuName = '', icon = '', active = '') {
        $list.append(`
        <li class="aside__menu__item ${active}">
            <div class="aside__menu__item__icon">
                <i class="${icon} fa-2x "></i>
            </div>
            <div class="aside__menu__item__name hidden">
                <p>${menuName}</p>
            </div>
        </li>`);
    },
}
