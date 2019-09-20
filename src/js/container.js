export let Container = {
    add(revenue, productOrder, customers, monthSales, deaprtmentSales) {
        let $container = $('.container'),
            $row = $container.find('.row');

            Container.addChart($row, 'medium', 'chart_revenue', revenue.title);
            Container.addTextInGraphTop($('.container__item').last(), 'container__item__text container__item__text_left', revenue.money, revenue.sold);
            Container.addChart($row, 'medium', 'chart_product-order', productOrder.title);
            Container.addDoubleBlock($row, 'medium', revenue);
            Container.addChart($row, 'big', 'chart_customers', customers.title);
            Container.addTextInGraphTop($('.container__item').last(), 'container__item__text container__item__text_center', customers.sold);
            Container.addTextInGraphBottom($('.container__item').last(), 'container__item__text container__item__text_bottom', customers.date, customers.time);
            Container.addChart($row, 'big', 'chart_exchange', 'Exchange rates');
            Container.addOptionsExchange($('.container__item').last().find(".options").find(".options__popup"));
            Container.addChart($row, 'big', 'chart_month-sales', monthSales.title);
            Container.addChart($row, 'big', 'chart_department-sales', deaprtmentSales.title);
            
    },

    addChart($list, size = '', graphId = '', title = '', height = '80%', width = '80%') {
        let blockSize = Container.getGrind(size);
        $($list).append(`<div class="container__item container_${size} ${blockSize}">
            <div class="container__item__head">
                <div class="container__item__title text_dark-blue">${title}</div>
            </div>
            <div class="chart__wrap">
                <canvas height="${height}" width="${width}" id="${graphId}"></canvas>
            </div>
        </div>`);
        Container.addError($list.find('.container__item').last());
        Container.addOptions($list.find('.container__item').last());
        Container.addWindowControl($list.find('.container__item').last());
    },

    addDoubleBlock($list, size = '', revenue) {
        let blockSize = Container.getGrindDouble(size);
        $($list).append(`<div class="container_${size} container__double-block ${blockSize}"></div>`);
        Container.addHalfBlock($('.container__double-block'), 'light-sky-blue-bg', 'img/basket.png', 'Shopping basket', 'text_light-blue', revenue.money, revenue.sold);
        Container.addHalfBlock($('.container__double-block'), 'light-green-bg', 'img/box.png', 'Box', 'text_light-green', revenue.amount, revenue.order);
    },

    addHalfBlock($list, blockColor = '', imgSrc = '', imgAlt = '', textColor = '', spanText = '', text = '') {
        $($list).append(`<div class="container__half-block-wrap ${blockColor}">
            <div class="container__half-block">
                <div class="container__half-block__img">
                    <img src="${imgSrc}" alt="${imgAlt}">
                </div>
                <div class="container__half-block__text ${textColor}">
                    <span class="text_big">${spanText}</span><p class=''>${text}</p>
                </div>
            </div>  
        </div>`);
        Container.addOptions($list.find('.container__half-block').last());
        Container.addWindowControl($list.find('.container__half-block').last());
    },

    addTextInGraphTop($list, position = '', title = '', subtitle = '') {
        $($list).append(`<div class="${position}">
            <p class="text_dark-blue text_big">${title}</p>
            <p class="text_gray">${subtitle}</p>
        </div>`);
    },

    addTextInGraphBottom($list, position = '', text_1 = '', text_2 = '') { 
        $($list).append(`<div class="${position} text_gray">
            <p>${text_1}</p>
            <p>${text_2}</p>
        </div>`);
    },

    addOptions($list) {
        ($list).append(`
        <div class="options">
            <div class="options__button">
                <i class="fas fa-ellipsis-h fa-lg"></i>
            </div>
            <div class="options__popup hidden">
                <div class="options__item">
                    <div class="options__item__icon"><i class="fas fa-share-alt"></i></div>
                    <p>Option 1</p>
                </div>
                <div class="options__item">
                    <div class="options__item__icon"><i class="fas fa-copy"></i></div>
                    <p>Option 2</p>
                </div>
                <div class="options__item">
                    <div class="options__item__icon"><i class="fas fa-comments"></i></div>
                    <p>Option 3</p>
                </div>
            </div>
        </div>`);
    },

    addWindowControl($list) {
        ($list).append(`
        <div class="window-control">
            <div class="window-control__button minimize">
                <i class="far fa-window-minimize fa-lg"></i>
            </div>
            <div class="window-control__button close">
                <i class="fas fa-times fa-lg"></i>
            </div>
        </div>`);
    },

    addOptionsExchange($list) {
        $list.find(".options__item").last().addClass("exchange__options__button");
        ($list).append(`
        <div class="options__exchange-rates hidden">
            <select class="exchange_basedOn button"></select>
            <select class="exchange_basedFor button"></select>
            <input type="date" class="exchange_start" value="2015-01-01" min="2000-01-01" max="2019-09-01">
            <input type="date" class="exchange_end" value="2018-01-01" min="2000-01-01" max="2019-09-01">
            <button class="exchange__input button">Input</button>
        </div>`);
    },

    addError($list) {
        ($list).append(`
        <div class="chart_error hidden">
            <p>Can't draw a chart. No data. Please check your internet connection</p>
        </div>`);
    },

    getGrind(size) {
        if (size === 'medium') {
            return 'col-lg-4 col-md-6 col-xs-12';
        } else if (size === 'big') {
            return 'col-lg-6 col-md-12 col-xs-12';
        }

        return 'col-lg-4 col-md-6 col-xs-12';
    },

    getGrindDouble(size) {
        if (size === 'medium') {
            return 'col-lg-4 col-md-12 col-xs-12';
        } else if (size === 'big') {
            return 'col-lg-6 col-md-12 col-xs-12';
        }

        return 'col-lg-4 col-md-6 col-xs-12';
    },
}
