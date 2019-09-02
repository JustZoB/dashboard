$(".header__center__mini").on('click', () => {
    $(".header__center__normal").toggleClass("active white-bg box-shadow");
});

$('body').on('click', ".options__button", () => {
    $(this).parents().eq(1).find(".options__popup").toggleClass("hidden");
});

$('.sales__select i').on('click', () => {
    $(this).parent().find(".options__popup").toggleClass("hidden");
});

$('.header__profile__wrap').on('click', () => {
    $(".profile").toggleClass("hidden");
});
$('.header__pop .close').on('click', () => {
    $(this).parents().eq(2).toggleClass("hidden");
});


$('.header__messages').on('click', () => {
    $(".messages").toggleClass("hidden");
    $(".messages_not-read").addClass("hidden");
});
$('.header__notifications').on('click', () => {
    $(".notifications").toggleClass("hidden");
    $(".notifications__counts").addClass("hidden");
});
$('.header__search__input').on('click', () => {
    $(".search_select").toggleClass("hidden");
});

$('body').on('click', ".container__half-block-wrap .close", () => {
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
$('body').on('click', ".container__half-block-wrap .minimize", () => {
    let half_block = $(this).parents().eq(2),
        block = $(this).parents().eq(3);
        console.log(block.css('min-height'));
    if (half_block.hasClass("container__half-block__minimize")) {
        block.css("min-height", parseInt(block.css('min-height'),10) + 100);
    } else {
        block.css("min-height", parseInt(block.css('min-height'),10) - 100);
    }
    half_block.toggleClass('container__half-block__minimize');
    half_block.find(".container__half-block__img").toggleClass("hidden");
    half_block.find("span").toggleClass("hidden");
    half_block.find(".container__half-block__text").toggleClass("container__text__minimize");
});

$('body').on('click', ".container__item .close", () => {
    $(this).parents().eq(1).detach();
});
$('body').on('click', ".container__item .minimize", () => {
    let block = $(this).parents().eq(1);
    block.toggleClass('container__item__minimize');
    block.find(".container__item__text").toggleClass("hidden");
    block.find(".chart").toggleClass("hidden");
});

$('.header__menu').on('click', () => {
    $(".aside__menu__item__name").toggleClass("hidden");
    $(".aside").toggleClass("active");
    $(this).toggleClass("active");
    if ($(window).width() >= '768') {
        $(".main-wrap").toggleClass("active");
        setTimeout(reInitCharts, 300);
    }
});

var eventsClose = (classes) => {
    $(document).mouseup((e) => {
        let div = $(classes);
        div.each((key, elem) => {
            if ((!$(elem).is(e.target)) && ($(elem).has(e.target).length === 0) 
            && (!$(elem).prev().is(e.target)) && ($(elem).prev().has(e.target).length === 0)) {
                $(elem).addClass("hidden");
            }
        });
    });
}

eventsClose(".options__popup");
eventsClose(".header__pop__wrap");