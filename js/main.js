let Container = {
    add: function() {
        let container = $(".container"),
            row = container.find(".row");

            Container.addBlockGraph(row, 'medium', 'chart__revenue');
            Container.addBlockGraph(row, 'medium', 'chart__product-order');
            Container.addDoubleBlock(row, 'medium');
            Container.addBlockGraph(row, 'big', 'chart__customers');
            Container.addBlockGraph(row, 'big', 'chart__daily-sales');
            Container.addBlockGraph(row, 'big', 'chart_monthly-sales');
            Container.addBlockGraph(row, 'big', 'chart_department-sales');
    },

    addDoubleBlock: function(list, size) {
        let block_size = 'col-lg-4';
        if (size === 'medium') {
            block_size = 'col-lg-4';
        } else if (size === 'big') {
            block_size = 'col-lg-6';
        }
        $(list).append(`<div class="container__item container_${ size } container__double-block ${ block_size }">
            <div class="change">
                <div class="change__button">
                    <i class="text_ligth-gray far fa-window-minimize fa-lg"></i>
                </div>
                <div class="change__button">
                    <i class="text_ligth-gray fas fa-times fa-lg"></i>
                </div>
            </div>
        </div>`);
        Container.addHalfBlock($('.container__double-block'), 'light-sky-blue', 'img/basket.png', 'Shopping basket', 'text_light-blue', '$433,534,300', 'Sold 12.332 Items');
        Container.addHalfBlock($('.container__double-block'), 'light-green', 'img/box.png', 'Box', 'text_green', '53.345', 'Order');
    },

    addHalfBlock: function(list, block_color, img_src, img_alt, text_color, span_text, text) {
        $(list).append(`<div class="container__half-block-wrap ${ block_color } box-shadow">
            <div class="container__half-block">
                <div class="options">
                    <div class="options__button">
                        <i class="text_ligth-gray fas fa-ellipsis-h fa-lg"></i>
                    </div>
                </div>
                <div class="container__half-block__img">
                    <img src="${ img_src }" alt="${ img_alt }">
                </div>
                <div class="container__half-block__text">
                    <p class="${ text_color }"><span class="text_big">${ span_text }</span><br />${ text }</p>
                </div>
            </div>  
        </div>`);
    },

    addBlockGraph: function(list, size, graph_id) {
        let block_size = 'col-lg-4';
        if (size === 'medium') {
            block_size = 'col-lg-4';
        } else if (size === 'big') {
            block_size = 'col-lg-6';
        }
        $(list).append(`<div class="container__item container_${ size } ${ block_size } white box-shadow">
            <div class="options">
                <div class="options__button">
                    <i class="text_light-blue-gray fas fa-ellipsis-h fa-lg"></i>
                </div>
            </div>
            <div class="change">
                <div class="change__button">
                    <i class="text_light-blue-gray far fa-window-minimize fa-lg"></i>
                </div>
                <div class="change__button">
                    <i class="text_light-blue-gray fas fa-times fa-lg"></i>
                </div>
            </div>
            <div class="chart" id="${ graph_id }"></div>
        </div>`);
    }
}

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

Container.add();
Aside.add();

$('.header__profile__wrap').on('click', function() {
    $(".profile").toggleClass("hidden");
});

$('.header__messages').on('click', function() {
    $(".messages").toggleClass("hidden");
    $(".messages_not-read").addClass("hidden");
});
$('.header__notifications').on('click', function() {
    $(".notifications").toggleClass("hidden");
    $(".notifications__counts").addClass("hidden");
});
$('.header__search__input').on('click', function() {
    $(".search_select").toggleClass("hidden");
});

$('.header__menu').on('click', function() {
    if ($(this).hasClass("menu_active")) {
        $(".aside").css("left", "-90px");
        $(".main-wrap").css("margin-left", "0");
        $(this).removeClass("menu_active");
    } else {
        $(".aside").css("left", "0");
        $(".main-wrap").css("margin-left", "90px");
        $(this).addClass("menu_active");
    }
});
