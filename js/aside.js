let Aside = {
    add: function() {
        let aside = $(".aside"),
            list = aside.find(".aside__menu");

        Aside.addHtml(list, 'Option 1', 'fas fa-chart-bar', 'text_white', ' active');
        Aside.addHtml(list, 'Option 2', 'fas fa-user-friends', 'text_blue');
        Aside.addHtml(list, 'Option 3', 'fas fa-file-invoice-dollar', 'text_blue');
        Aside.addHtml(list, 'Option 4', 'fas fa-tablet-alt', 'text_blue');
        Aside.addHtml(list, 'Option 5', 'fas fa-calendar-alt', 'text_blue');
        Aside.addHtml(list, 'Option 6', 'fas fa-file-invoice', 'text_blue');
        Aside.addHtml(list, 'Option 7', 'fas fa-sliders-h', 'text_blue');
        Aside.addHtml(list, 'Option 8', 'fas fa-power-off', 'text_blue');
    },

    addHtml: function(list, menu_name, icon, text_color, active) {
        if (active === undefined) {
            active = "";
        }
        list.append(`
        <li class="aside__menu__item ${ text_color }${ active }">
            <div class="aside__menu__item__icon">
                <i class="${ icon } fa-2x "></i>
            </div>
            <div class="aside__menu__item__name hidden">
                <p>${ menu_name }</p>
            </div>
        </li>`);
    }
}
