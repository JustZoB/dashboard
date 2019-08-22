let Aside = {
    add: function() {
        let aside = $(".aside"),
            list = aside.find(".aside__menu");

            Aside.addHtml(list, 'fas fa-chart-bar', 'text_white', ' active');
            Aside.addHtml(list, 'fas fa-user-friends', 'text_blue');
            Aside.addHtml(list, 'fas fa-file-invoice-dollar', 'text_blue');
            Aside.addHtml(list, 'fas fa-tablet-alt', 'text_blue');
            Aside.addHtml(list, 'fas fa-calendar-alt', 'text_blue');
            Aside.addHtml(list, 'fas fa-file-invoice', 'text_blue');
            Aside.addHtml(list, 'fas fa-sliders-h', 'text_blue');
            Aside.addHtml(list, 'fas fa-power-off', 'text_blue');
    },

    addHtml: function(list, icon, text_color, active) {
        if (active === undefined) {
            active = "";
        }
        list.append(`
        <li class="aside__menu__item${ active }">
            <i class="${ icon } fa-2x ${ text_color }"></i>
        </li>`);
    }
}
