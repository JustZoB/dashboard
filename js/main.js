let Container = {
    add: function() {
        let container = $(".container"),
            row = container.find(".row");

            Container.addBlockGraph(row, 'medium', 'chart__revenue', 'Revenue', 'This year');
            Container.addTextInGraphTop($(".container__item").last(), 'container__item__text_left', '$433,534,300', 'Sold 12.332 Items');
            Container.addBlockGraph(row, 'medium', 'chart__product-order', 'Product Order', 'This month');
            Container.addDoubleBlock(row, 'medium');
            Container.addBlockGraph(row, 'big', 'chart__customers', 'Customers');
            Container.addTextInGraphTop($(".container__item").last(), 'container__item__text_center', '284,123');
            Container.addTextInGraphBottom($(".container__item").last(), 'container__item__text_bottom', 'Yesterday - 22 October 2016', '06:00 AM > 11:00 PM');
            Container.addBlockGraph(row, 'big', 'chart__daily-sales', 'Daily Sales');
            Container.addBlockGraph(row, 'big', 'chart__monthly-sales', 'Monthly Sales', '(In Millions)');
            Container.addBlockGraph(row, 'big', 'chart__department-sales', 'Department Sales');
    },
    
    addBlockGraph: function(list, size, graph_id, title, subtitle) {
        let block_size = 'col-lg-4';
        if (size === 'medium') {
            block_size = 'col-lg-4';
        } else if (size === 'big') {
            block_size = 'col-lg-6';
        }
        if (subtitle === undefined) {
            subtitle = "";
        }
        $(list).append(`<div class="container__item container_${ size } ${ block_size } white box-shadow">
            <div class="options">
                <div class="options__button">
                    <i class="text_light-blue-gray fas fa-ellipsis-h fa-lg"></i>
                </div>
            </div>
            <div class="change">
                <div class="change__button minimize">
                    <i class="text_light-blue-gray far fa-window-minimize fa-lg"></i>
                </div>
                <div class="change__button close">
                    <i class="text_light-blue-gray fas fa-times fa-lg"></i>
                </div>
            </div>
            <div class="container__item__head">
                <div class="container__item__title text_dark-blue">${ title }</div>
                <div class="container__item__subtitle text_ligth-gray">${ subtitle }</div>
            </div>
            <div class="chart" id="${ graph_id }"></div>
        </div>`);
    },

    addDoubleBlock: function(list, size) {
        let block_size = 'col-lg-4';
        if (size === 'medium') {
            block_size = 'col-lg-4';
        } else if (size === 'big') {
            block_size = 'col-lg-6';
        }
        $(list).append(`<div class="container__item container_${ size } container__double-block ${ block_size }"></div>`);
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
                <div class="change">
                    <div class="change__button minimize">
                        <i class="text_ligth-gray far fa-window-minimize fa-lg"></i>
                    </div>
                    <div class="change__button close">
                        <i class="text_ligth-gray fas fa-times fa-lg"></i>
                    </div>
                </div>
                <div class="container__half-block__img">
                    <img src="${ img_src }" alt="${ img_alt }">
                </div>
                <div class="container__half-block__text ${ text_color }">
                    <span class="text_big">${ span_text }</span><p class="">${ text }</p>
                </div>
            </div>  
        </div>`);
    },

    addTextInGraphTop: function(list, position, title, subtitle) {
        if (subtitle === undefined) {
            subtitle = "";
        }
        $(list).append(`<div class="${ position }">
            <p class="text_dark-blue text_big">${ title }</p>
            <p class="text_gray">${ subtitle }</p>
        </div>`);
    },

    addTextInGraphBottom: function(list, position, text_1, text_2) { 
        $(list).append(`<div class="${ position } text_gray">
            <p>${ text_1 }</p>
            <p>${ text_2 }</p>
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

$(".header__profile").hover(function() {
    $(".header__profile__wrap").css("background-color", "#71b1f1").css("cursor", "pointer");
}, function() {
    $(".header__profile__wrap").css("background-color", "#5a98d5").css("cursor", "default");
},);


$('.header__profile').on('click', function() {
    $(".profile").toggleClass("hidden");
});
$('.header__pop .close').on('click', function() {
    $(this).parents().eq(2).toggleClass("hidden");
});


$('.header__messages__icon').on('click', function() {
    $(".messages").toggleClass("hidden");
    $(".messages_not-read").addClass("hidden");
});
$('.header__notifications__icon').on('click', function() {
    $(".notifications").toggleClass("hidden");
    $(".notifications__counts").addClass("hidden");
});
$('.header__search__input').on('click', function() {
    $(".search_select").toggleClass("hidden");
});

$('body').on('click', ".container__half-block-wrap .close", function() {
    let half_block = $(this).parents().eq(2),
        block = $(this).parents().eq(3);
    if (half_block.hasClass("container__half-block__minimize")) {
        block.height(block.height() - 100);
    } else {
        block.height(block.height() - 200);
    }
        
    half_block.detach();
    if (block.is(":empty")) {
        block.detach();
    }
});
$('body').on('click', ".container__half-block-wrap .minimize", function() {
    let half_block = $(this).parents().eq(2),
        block = $(this).parents().eq(3);
    if (half_block.hasClass("container__half-block__minimize")) {
        block.height(block.height() + 100);
    } else {
        block.height(block.height() - 100);
    }
    half_block.toggleClass('container__half-block__minimize');
    half_block.find(".container__half-block__img").toggleClass("hidden");
    half_block.find("span").toggleClass("hidden");
    half_block.find(".container__half-block__text").toggleClass("container__text__minimize");
});

$('body').on('click', ".container__item .close", function() {
    $(this).parents().eq(1).detach();
});
$('body').on('click', ".container__item .minimize", function() {
    let block = $(this).parents().eq(1);
    block.toggleClass('container__item__minimize');
    block.find(".chart").toggleClass("hidden");
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
