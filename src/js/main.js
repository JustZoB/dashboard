/* global Chart */
import { Container } from './container.js';
import { Aside } from './aside.js';
import { Modal } from './modal.js'

let revenueJson = {},
    productOrderJson = {},
    customersJson = {},
    monthSalesJson = {},
    departmentSalesJson = {};
    
$.ajax({ 
    type: "GET",   
    url: 'json/revenue.json',   
    async: false,
    success : function(data) {
        revenueJson = data;
    },
    error : function() {
        let block = $("#chart_revenue").parents().eq(1);
        $("#chart_revenue").addClass("hidden");
        block.find(".container__item__text").addClass("hidden");
        block.find(".chart_error").removeClass("hidden");
    },
});
$.ajax({ 
    type: "GET",   
    url: 'json/product_order.json',   
    async: false,
    success : function(data) {
        productOrderJson = data;
    },
    error : function() {
        let block = $("#chart_product_order").parents().eq(1);
        $("#chart_product_order").addClass("hidden");
        block.find(".container__item__text").addClass("hidden");
        block.find(".chart_error").removeClass("hidden");
    },
});
$.ajax({ 
    type: "GET",   
    url: 'json/customers.json',   
    async: false,
    success : function(data) {
        customersJson = data;
    },
    error : function() {
        let block = $("#chart_customers").parents().eq(1);
        $("#chart_customers").addClass("hidden");
        block.find(".container__item__text").addClass("hidden");
        block.find(".chart_error").removeClass("hidden");
    },
});
$.ajax({ 
    type: "GET",   
    url: 'json/month_sales.json',   
    async: false,
    success : function(data) {
        monthSalesJson = data;
    },
    error : function() {
        let block = $("#chart_month_sales").parents().eq(1);
        $("#chart_month_sales").addClass("hidden");
        block.find(".container__item__text").addClass("hidden");
        block.find(".chart_error").removeClass("hidden");
    },
});
$.ajax({ 
    type: "GET",   
    url: 'json/department_sales.json',   
    async: false,
    success : function(data) {
        departmentSalesJson = data;
    },
    error : function() {
        let block = $("#chart_department_sales").parents().eq(1);
        $("#chart_department_sales").addClass("hidden");
        block.find(".container__item__text").addClass("hidden");
        block.find(".chart_error").removeClass("hidden");
    },
});

Container.add(revenueJson, productOrderJson, customersJson, monthSalesJson, departmentSalesJson);
Aside.add();

const mainWidth = () => {
    if ($(window).width() > '768') {
        if ($('.aside').hasClass('active')) {
            $('.main-wrap').width($(window).width() - 240);
        } else {
            $('.main-wrap').width($(window).width() - 90);
        }
    } else {
        $('.main-wrap').width($(window).width());
    }
}

$('.header__center__mini').on('click', function () {
    $('.header__center__normal').toggleClass('active');
});

$('body').on('click', '.options__button', function () {
    $(this).parent().find(".options__popup").toggleClass('hidden');
});

$('.sales__select i').on('click', function () {
    $(this).siblings().toggleClass('hidden');
});

$('.header__profile__wrap').on('click', function () {
    $('.profile').toggleClass('hidden');
});
$('.header__pop .close').on('click', function () {
    $(this).parents(".header__pop__wrap").toggleClass('hidden');
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
    let $halfBlock = $(this).parents(".container__half-block-wrap"),
        $block = $(this).parents(".container__double-block");
    if ($halfBlock.hasClass('container__half-block__minimize')) {
        $block.height($block.height() - 100);
    } else {
        $block.height($block.height() - 200);
    }
    
    $halfBlock.detach();
    if ($block.is(':empty')) {
        $block.detach();
    }
});
$('body').on('click', '.container__half-block-wrap .minimize', function () {
    const $halfBlock = $(this).parents(".container__half-block-wrap"),
        $block = $(this).parents(".container__double-block");
    if ($halfBlock.hasClass('container__half-block__minimize')) {
        $block.css('min-height', parseInt($block.css('min-height'), 10) + 100);
    } else {
        $block.css('min-height', parseInt($block.css('min-height'), 10) - 100);
    }
    $halfBlock.toggleClass('container__half-block__minimize');
    $halfBlock.find('.container__half-block__img').toggleClass('hidden');
    $halfBlock.find('span').toggleClass('hidden');
    $halfBlock.find('.container__half-block__text').toggleClass('container__text__minimize');
});

$('body').on('click', '.container__item .close', function () {
    $(this).parents(".container__item").addClass('hidden');
});
$('.exchange__options__button').on('click', function () {
    $('.options__exchange-rates').toggleClass('hidden');
});

$('body').on('click', '.container__item .minimize', function () {
    const $block = $(this).parents(".container__item");
    $block.toggleClass('container__item__minimize');
    $block.find('.container__item__text').toggleClass('hidden');
    $block.find('.chart').toggleClass('hidden');
    $block.find('canvas').toggleClass('hidden');
    if ($block.find(".chart__wrap").css("padding-bottom") !== 0) {
        $block.find(".chart__wrap").css("padding-bottom", 0);
    } else {
        $block.find(".chart__wrap").css("padding-bottom", "100%");
    }
});

$('.header__menu').on('click', function () {
    $('.aside__menu__item__name').toggleClass('hidden');
    $('.aside').toggleClass('active');
    $(this).toggleClass('active');
    $('body').toggleClass('menu_active');
    if ($(window).width() > '768') {
        $('.main-wrap').toggleClass('active');
        resizeing();
    }
});

const eventsClose = (classes) => {
    $("body").mouseup((e) => {
        $(classes).each((key, elem) => {
            if ((!$(elem).is(e.target)) && ($(elem).has(e.target).length === 0) 
            && (!$(elem).prev().is(e.target)) && ($(elem).prev().has(e.target).length === 0)) {
                $(elem).addClass('hidden');
            }
        });
    });
}

eventsClose('.options__popup');
eventsClose('.header__pop__wrap');

const resizeing = () => { 
    mainWidth();
}

$(window).on('resize', () => {
    resizeing();
});

setTimeout(window.onload = () => {
    resizeing();
}, 300);

// eslint-disable-next-line no-unused-vars
const revenueData = new Chart(document.getElementById('chart_revenue').getContext('2d'), {
    type: 'line',
    data: {
        labels: revenueJson.xAxis,
        datasets: [
        {
            pointRadius: 0,
            borderWidth: 4,
            pointHitRadius: 15,
            data: revenueJson.data,
            backgroundColor: "rgba(90, 152, 213, 0.5)",
            borderColor: "#5a98d5",
        }, 
    ]
    },
    options: {
        elements: {
            line: {
                tension: 0.000001,
            },
        },
        layout: {
            padding: {
                left: -10,
                right: 0,
                top: 100,
                bottom: -10,
            },
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                    display: false,
                },
                ticks: {
                    display: false,
                    min: 300,
                },
            }],
        },
        legend: {
            display: false,
        },
    },
}),
// eslint-disable-next-line no-unused-vars
productOrderData = new Chart(document.getElementById('chart_product-order').getContext('2d'), {
    type: 'polarArea',
    data: {
        labels: productOrderJson.xAxis,
        datasets: [{
            data: productOrderJson.data,
            backgroundColor: productOrderJson.colors,
        }]
    },
    options: {
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 70,
                bottom: 20,
            },
        },
        legend: {
            position: 'bottom',
            labels: {
                fontSize: 14,
                fontFamily: "'Montserrat', sans-serif",
            },
        },
    },
}),
// eslint-disable-next-line no-unused-vars
customersData = new Chart(document.getElementById('chart_customers').getContext('2d'), {
    type: 'line',

    data: {
        labels: customersJson.xAxis,
        datasets: [{
            fill: false,
            borderWidth: 5,
            pointRadius: 0,
            pointHitRadius: 10,
            label: "Day time",
            backgroundColor: "#accbea",
            borderColor: "#accbea",
            data: customersJson.data.day,
        }, {
            fill: false,
            borderWidth: 5,
            pointRadius: 0,
            pointHitRadius: 10,
            label: "Night time",
            backgroundColor: "#9ab6d3",
            borderColor: "#9ab6d3",
            data: customersJson.data.night,
        },]
    },
    options: {
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 90,
                bottom: 60,
            },
        },
        legend: {
            position: 'top',
            labels: {
                fontSize: 14,
                fontFamily: "'Montserrat', sans-serif",
            },
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                },
                ticks: {
                    display: false,
                    min: 220,
                    max: 380,
                },
            }],
        },
    },
}),
// eslint-disable-next-line no-unused-vars
monthSalesData = new Chart(document.getElementById('chart_month-sales').getContext('2d'), {
    type: 'bar',
    data: {
        labels: monthSalesJson.xAxis,
        datasets: [
            {
                label: "Day time",
                backgroundColor: "#accbea",
                data: monthSalesJson.data.day,
            }, {
                label: "Night time",
                backgroundColor: "#9ab6d3",
                data: monthSalesJson.data.night,
            },
        ]
    },

    options: {
        scales: {
            xAxes: [
            {
                barPercentage: 0.5,
                stacked: true,
                gridLines: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            }],
            yAxes: [
            {
                stacked: true,
                gridLines: {
                    drawBorder: false,
                    zeroLineWidth: 0,
                },
                ticks: {
                    fontSize: 16,
                    fontColor: '#a1a1a1',
                    min: 20,
                    max: 200,
                    stepSize: 50,
                },
            }],
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 70,
                bottom: 20,
            },
        },
        legend: {
           display: false,
        },
    },
}),
// eslint-disable-next-line no-unused-vars
departmentSalesData = new Chart(document.getElementById('chart_department-sales').getContext('2d'), {
    type: 'doughnut',
    data: {
        labels: departmentSalesJson.xAxis,
        datasets: [{
            data: departmentSalesJson.data,
            backgroundColor: departmentSalesJson.colors,
        }]
    },
    options: {
        cutoutPercentage: 75,
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 70,
                bottom: 20,
            },
        },
        legend: {
            position: 'right',
            labels: {
                padding: 10,
                fontSize: 16,
                fontFamily: "'Montserrat', sans-serif",
            },
        },
    },
});

const setTypes = () => {
    let $options = $(".options__exchange-rates"),
        $basedOn = $options.find(".exchange_basedOn"),
        $basedFor = $options.find(".exchange_basedFor"),
        lastTypes = {};
    const getTypesRates = (rates) => {
        Object.keys(rates).sort().forEach(type => {
            $basedOn.append(`<option>${type}</option>`);
            $basedFor.append(`<option>${type}</option>`);
        });
    }

    $basedOn.empty().append('<option>Base(EUR default)</option>');
    $basedFor.empty().append('<option>Based for(All default)</option>');

    $.ajax({ type: "GET",   
        url: 'https://api.exchangeratesapi.io/latest',   
        async: false,
        success : function(data) {
            lastTypes = data;
        }       
    });

    getTypesRates(lastTypes.rates);
}

const exchangeBase = (start = '', end = '', basedOn = '', basedFor = '') => {
    const getLink = (start, end, basedOn) => {
        let link = `https://api.exchangeratesapi.io/history?start_at=${start}&end_at=${end}`;
        if (basedOn !== '') {
            link += `&base=${basedOn}`;
        }
        return link;
    }

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const getRateOnBase = (rates, basedFor) => {
        let objRates = [],
            basedForData = [],
            r = getRandomInt(60, 180),
            g = getRandomInt(60, 180),
            b = getRandomInt(60, 180);

        Object.keys(rates).sort().forEach(date => {
            $.each( rates[date], function( rate, value ) {
                if (rate === basedFor) {
                    basedForData.push(value);
                }
            });
        });

        objRates.push({
            pointRadius: 0,
            borderWidth: 4,
            pointHitRadius: 15,
            label: basedFor,
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`,
            borderColor: `rgb(${r}, ${g}, ${b})`,
            data: basedForData,
        });

        return objRates;
    }

    const getAllRatesOnBase = (rates) => {
        let allNameRates = Object.keys(rates[Object.keys(rates).sort()[0]]),
            objRates = [],
            mapOfDataRates = {};

        allNameRates.forEach(rate => {
            mapOfDataRates[rate] = [];
        });

        Object.keys(rates).sort().forEach(date => {
            $.each( rates[date], function( rate, val ) {
                if (mapOfDataRates[rate] !== undefined) {
                    mapOfDataRates[rate].push(val);
                }
            });
        });

        allNameRates.forEach(item => {
            let r = getRandomInt(60, 180),
                g = getRandomInt(60, 180),
                b = getRandomInt(60, 180);

            objRates.push({
                pointRadius: 0,
                borderWidth: 4,
                pointHitRadius: 15,
                label: item,
                backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`,
                borderColor: `rgb(${r}, ${g}, ${b})`,
                data: mapOfDataRates[item],
            });
        });

        return objRates;
    }

    let response = {},
        head = [],
        allRates = [];

    $.ajax({ 
        type: "GET",   
        url: getLink(start, end, basedOn),   
        async: false,
        success : function(data) {
            response = data;
        },
        error : function() {
            let block = $("#chart_exchange").parents().eq(1);
            $("#chart_exchange").addClass("hidden");
            block.find(".container__item__text").addClass("hidden");
            block.find(".chart_error").removeClass("hidden");
        }, 
    });
    if (!$.isEmptyObject(response)) {
        $.each( response.rates, function( date ) {
            head.push(date);
        });

        allRates = basedFor === 'Based for(All default)' ? getAllRatesOnBase(response.rates) : getRateOnBase(response.rates, basedFor);
    }

    return {'head': head.sort(), 'allRates': allRates, 'basedOn': basedOn};
}

const drawExchangeChartBase = (head, allRates, basedOn) => {
    // eslint-disable-next-line no-unused-vars
    const exchangeRate = new Chart(document.getElementById('chart_exchange').getContext('2d'), {
            type: 'line',
            data: {
                labels: head,
                datasets: allRates,
            },
            options: {
                elements: {
                    line: {
                        tension: 0.000001,
                    },
                },
                layout: {
                    padding: {
                        left: -10,
                        right: 0,
                        top: 60,
                        bottom: -10,
                    },
                },
                title: {
                    display: true,
                    text: 'Based on ' + basedOn,
                }
            },
        });
}

const showError = (text) => {
    $(".error-message")
        .empty()
        .append(`<p>${text}</p>`)
        .css(({ opacity: 0 }))
        .animate({ opacity: 1 }, 200)
        .animate({ opacity: 0 }, 3000);
}

setTypes();

$('.exchange__input').on('click', function () {
    const $block = $(this).parents(".container__item"),
        $options = $(".options__exchange-rates"),
        start = $options.find(".exchange_start").val(),
        end = $options.find(".exchange_end").val(),
        basedFor = $options.find(".exchange_basedFor").val();
    let basedOn = $options.find(".exchange_basedOn").val();

    if (basedOn === 'Base(EUR default)') {
        basedOn = 'EUR';
    }
    if (start === '') {
        showError("Fill in all the fields of 'start date'");
    } else if (end === '') {
        showError("Fill in all the fields of 'end date'");
    } else if (start > end) {
        showError("'Start date' should be bigger then 'end date'"); 
    } else {
        $block.find(".chart__wrap").empty().append(`<canvas height="80%" width="80%" id="chart_exchange"></canvas>`);
        let exchange = exchangeBase(start, end, basedOn, basedFor);
        drawExchangeChartBase(exchange.head, exchange.allRates, exchange.basedOn);
    }
});

let exchange = exchangeBase('2015-01-01', '2018-01-01', 'USD', 'RUB');
drawExchangeChartBase(exchange.head, exchange.allRates, exchange.basedOn);

Modal.simple("SimpleModalHere", "modal_SimpleModalHere");

Modal.dynamic("json/register.json", "json", "UseModalHere", function() {
    Modal.dynamic("json/ad.json", "json", "NewModalHere");
});
