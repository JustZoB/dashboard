import { Container } from './container.js';
import { Aside } from './aside.js';
import revenue from './charts/revenue.js';
import productOrder from './charts/product_order.js';
import customers from './charts/customers.js';
import dailySales from './charts/daily_sales.js';
import monthSales from './charts/month_sales.js';
import departmentSales from './charts/department_sales.js';

Container.add();
Aside.add();

$(window).on('resize', (event) => {
  setTimeout(reInitCharts(), 50);  
});

const reInitCharts = () => {
  revenue();
  productOrder();
  customers();
  dailySales();
  monthSales();
  departmentSales();
};

$('.header__center__mini').on('click', function () {
    $('.header__center__normal').toggleClass('active white-bg box-shadow');
});

$('body').on('click', '.options__button', function () {
    $(this).parents().eq(1).find('.options__popup').toggleClass('hidden');
});

$('.sales__select i').on('click', function () {
    $(this).parent().find('.options__popup').toggleClass('hidden');
});

$('.header__profile__wrap').on('click', function () {
    $('.profile').toggleClass('hidden');
});
$('.header__pop .close').on('click', function () {
    $(this).parents().eq(2).toggleClass('hidden');
});


$('.header__messages').on('click', function () {
    $('.messages').toggleClass('hidden');
    $('.messages_not-read').addClass('hidden');
});
$('.header__notifications').on('click', function () {
    $('.notifications').toggleClass('hidden');
    $('.notifications__counts').addClass('hidden');
});
$('.header__search__input').on('click', function () {
    $('.search_select').toggleClass('hidden');
});

$('body').on('click', '.container__half-block-wrap .close', function () {
    let $half_block = $(this).parents().eq(2),
        $block = $(this).parents().eq(3);
    if ($half_block.hasClass('container__half-block__minimize')) {
        $block.height($block.height() - 100);
    } else {
        $block.height($block.height() - 200);
    }
    
    $half_block.detach();
    if ($block.is(':empty')) {
        $block.detach();
    }
});
$('body').on('click', '.container__half-block-wrap .minimize', function () {
    const $half_block = $(this).parents().eq(2),
        $block = $(this).parents().eq(3);
    if ($half_block.hasClass('container__half-block__minimize')) {
        $block.css('min-height', parseInt($block.css('min-height'),10) + 100);
    } else {
        $block.css('min-height', parseInt($block.css('min-height'),10) - 100);
    }
    $half_block.toggleClass('container__half-block__minimize');
    $half_block.find('.container__half-block__img').toggleClass('hidden');
    $half_block.find('span').toggleClass('hidden');
    $half_block.find('.container__half-block__text').toggleClass('container__text__minimize');
});

$('body').on('click', '.container__item .close', function () {
    $(this).parents().eq(1).detach();
});
$('body').on('click', '.container__item .minimize', function () {
    const $block = $(this).parents().eq(1);
    $block.toggleClass('container__item__minimize');
    $block.find('.container__item__text').toggleClass('hidden');
    $block.find('.chart').toggleClass('hidden');
});

$('.header__menu').on('click', function () {
    $('.aside__menu__item__name').toggleClass('hidden');
    $('.aside').toggleClass('active');
    $(this).toggleClass('active');
    if ($(window).width() >= '768') {
        $('.main-wrap').toggleClass('active');
        setTimeout(reInitCharts, 300);
    }
});

const eventsClose = (classes) => {
    $(document).mouseup((e) => {
        let div = $(classes);
        div.each((key, elem) => {
            if ((!$(elem).is(e.target)) && ($(elem).has(e.target).length === 0) 
            && (!$(elem).prev().is(e.target)) && ($(elem).prev().has(e.target).length === 0)) {
                $(elem).addClass('hidden');
            }
        });
    });
}

eventsClose('.options__popup');
eventsClose('.header__pop__wrap');
