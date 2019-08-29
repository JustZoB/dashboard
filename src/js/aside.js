let Aside = {
    add: function() {
        let aside = $(".aside"),
            list = aside.find(".aside__menu");

        Aside.addHtml(list, 'Option 1', 'fas fa-chart-bar', ' active');
        Aside.addHtml(list, 'Option 2', 'fas fa-user-friends');
        Aside.addHtml(list, 'Option 3', 'fas fa-user-friends');
        Aside.addHtml(list, 'Option 4', 'fas fa-tablet-alt');
        Aside.addHtml(list, 'Option 5', 'fas fa-calendar-alt');
        Aside.addHtml(list, 'Option 6', 'fas fa-user-friends');
        Aside.addHtml(list, 'Option 7', 'fas fa-sliders-h');
        Aside.addHtml(list, 'Option 8', 'fas fa-power-off');
    },

    addHtml: function(list, menu_name, icon, active) {
        if (active === undefined) {
            active = "";
        }
        list.append(`
        <li class="aside__menu__item ${ active }">
            <div class="aside__menu__item__icon">
                <i class="${ icon } fa-2x "></i>
            </div>
            <div class="aside__menu__item__name hidden">
                <p>${ menu_name }</p>
            </div>
        </li>`);
    }
}
