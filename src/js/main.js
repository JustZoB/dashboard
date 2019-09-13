/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Container } from './container.js';
import { Aside } from './aside.js';

Container.add();
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
    const $half_block = $(this).parents().eq(2),
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
    $(this).parents().eq(1).addClass('hidden');
});
$('.exchange__options__button').on('click', function () {
    $('.options__exchange-rates').toggleClass('hidden');
});

$('body').on('click', '.container__item .minimize', function () {
    const $block = $(this).parents().eq(1);
    $block.toggleClass('container__item__minimize');
    $block.find('.container__item__text').toggleClass('hidden');
    $block.find('.chart').toggleClass('hidden');
    $block.find('canvas').toggleClass('hidden');
});

$('.header__menu').on('click', function () {
    $('.aside__menu__item__name').toggleClass('hidden');
    $('.aside').toggleClass('active');
    $(this).toggleClass('active');
    if ($(window).width() > '768') {
        $('.main-wrap').toggleClass('active');
        mainWidth();
    }
});

const eventsClose = (classes) => {
    $(document).mouseup((e) => {
        const div = $(classes);
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

const resizeing = () => { 
    mainWidth();
}

$(window).on('resize', () => {
    resizeing();
});

setTimeout(window.onload = () => {
    resizeing();
}, 300);
 
let revenue = document.getElementById('chart_revenue').getContext('2d'),
    revenue_data = new Chart(revenue, {
    type: 'line',
    data: {
        labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN'],
        datasets: [
        {
            pointRadius: 0,
            borderWidth: 4,
            pointHitRadius: 15,
            data: [1000, 1250, 1050, 1250, 950, 1300, 1650],
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
});

let product_order = document.getElementById('chart_product-order').getContext('2d'),
    product_order_data = new Chart(product_order, {
    type: 'polarArea',
    data: {
        labels: ['Finished', 'Pending', 'Reject'],
        datasets: [{
            data: [23043, 12435, 4503],
            backgroundColor: ["#486afa", "#f8e367", "#f05757"],
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
                fontFamily: "'Montserrat', serif",
            },
        },
    },
});

let customers = document.getElementById('chart_customers').getContext('2d'),
    customers_data = new Chart(customers, {
    type: 'line',

    data: {
        
        labels: ['06:00 AM', '09:00 AM', '12:00 AM', '03:00 PM', '06:00 PM', '09:00 AM', '11:00 PM'],
        datasets: [{
            fill: false,
            borderWidth: 5,
            pointRadius: 0,
            pointHitRadius: 10,
            label: "Day time",
            backgroundColor: "#accbea",
            borderColor: "#accbea",
            data: [265, 285, 300, 310, 319, 330, 348],
        }, {
            fill: false,
            borderWidth: 5,
            pointRadius: 0,
            pointHitRadius: 10,
            label: "Night time",
            backgroundColor: "#9ab6d3",
            borderColor: "#9ab6d3",
            data: [255, 280, 300, 312, 322, 332, 340],
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
                fontFamily: "'Montserrat', serif",
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
});

let monthly_sales = document.getElementById('chart_monthly-sales').getContext('2d'),
    monthly_sales_data = new Chart(monthly_sales, {
    type: 'bar',
    data: {
        labels: ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: "Day time",
                backgroundColor: "#accbea",
                data: [50, 87, 40, 28, 35, 30, 26, 65, 36],
            }, {
                label: "Night time",
                backgroundColor: "#9ab6d3",
                data: [10, 60, 25, 13, 15, 15, 10, 30, 7],
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
});

let department_sales = document.getElementById('chart_department-sales').getContext('2d'),
    department_sales_data = new Chart(department_sales, {
    type: 'doughnut',
    data: {
        labels: ['Clothing', 'Electronics', 'Kitchen Utility', 'Cardening', 'Food'],
        datasets: [{
            data: [20, 48, 70, 34, 28],
            backgroundColor: ["#f8e367", "#e18197", "#8abe6e", "#93ccce", "#7ababc"],
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
                fontSize: 14,
                fontFamily: "'Montserrat', serif",
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
        success : function(data)
        {
            lastTypes = data;
        }
    });

    getTypesRates(lastTypes.rates);
}

const exchange_base = (start = '', end = '', basedOn = '', basedFor = '') => {
    const getLink = (start, end, basedOn) => {
        let link = 'https://api.exchangeratesapi.io/' + 'history?start_at=' + start + '&end_at=' + end;
        if (basedOn !== '') {
            link += '&base=' + basedOn;
        }
        return link;
    }

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const getRateOnBase = (rates, basedFor) => {
        let objRates = [],
            basedForData = [],
            r = getRandomInt(0, 255),
            g = getRandomInt(0, 255),
            b = getRandomInt(0, 255);

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
            backgroundColor: "rgba(" + r + ", " + g + ", " + b + ", 0.5)",
            borderColor: "rgb(" + r + ", " + g + ", " + b + ")",
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
            let r = getRandomInt(0, 255),
                g = getRandomInt(0, 255),
                b = getRandomInt(0, 255);

            objRates.push({
                pointRadius: 0,
                borderWidth: 4,
                pointHitRadius: 15,
                label: item,
                backgroundColor: "rgba(" + r + ", " + g + ", " + b + ", 0.5)",
                borderColor: "rgb(" + r + ", " + g + ", " + b + ")",
                data: mapOfDataRates[item],
            });
        });

        return objRates;
    }

    let response = {},
        head = [];

    $.ajax({ 
        type: "GET",   
        url: getLink(start, end, basedOn),   
        async: false,
        success : function(data)
        {
            response = data;
        }
    });

    $.each( response.rates, function( date ) {
        head.push(date);
    });

    let allRates = basedFor === 'Based for(All default)' ? getAllRatesOnBase(response.rates) : getRateOnBase(response.rates, basedFor);

    return {'head': head.sort(), 'allRates': allRates, 'basedOn': basedOn};
}

const drawExchangeChartBase = (head, allRates, basedOn) => {
    let exchange_chart = document.getElementById('chart_exchange').getContext('2d'),
        exchange_rate = new Chart(exchange_chart, {
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

let $options = $(".options__exchange-rates"),
    $basedOn = $options.find(".exchange_basedOn"),
    $basedFor = $options.find(".exchange_basedFor"),
    $start = $options.find(".exchange_start"),
    $end = $options.find(".exchange_end");

setTypes();

$('.exchange__input').on('click', function () {
    let basedOn = $basedOn.val(),
        block = $(this).parents().eq(3);
    if (basedOn === 'Base(EUR default)') {
        basedOn = 'EUR';
    }
    if ($start.val() < $end.val()) {
        block.find(".chart__wrap").empty().append(`<canvas height="80%" width="80%" id="chart_exchange"></canvas>`);
        let exchange = exchange_base($start.val(), $end.val(), basedOn, $basedFor.val());
        drawExchangeChartBase(exchange.head, exchange.allRates, exchange.basedOn);
    }
});

let exchange = exchange_base('2015-01-01', '2018-01-01', 'USD', 'RUB');
drawExchangeChartBase(exchange.head, exchange.allRates, exchange.basedOn);
