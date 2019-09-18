export let Container = {
    add() {
        let $container = $('.container'),
            $row = $container.find('.row');

            Container.addChart($row, 'medium', 'chart_revenue', 'Revenue');
            Container.addTextInGraphTop($('.container__item').last(), 'container__item__text container__item__text_left', '$433,534,300', 'Sold 12.332 Items');
            Container.addChart($row, 'medium', 'chart_product-order', 'Product Order');
            Container.addDoubleBlock($row, 'medium');
            Container.addChart($row, 'big', 'chart_customers', 'Customers');
            Container.addTextInGraphTop($('.container__item').last(), 'container__item__text container__item__text_center', '284,123');
            Container.addTextInGraphBottom($('.container__item').last(), 'container__item__text container__item__text_bottom', 'Yesterday - 22 October 2016', '06:00 AM > 11:00 PM');
            Container.addChart($row, 'big', 'chart_exchange', 'Exchange rates');
            Container.addOptionsExchange($('.container__item').last().find(".options").find(".options__popup"));
            //Container.addBlockGraph($row, 'big', 'chart__daily-sales', 'Daily Sales');
            //Container.addChart($row, 'big', 'chart_daily-sales', 'Daily Sales');
            Container.addChart($row, 'big', 'chart_month-sales', 'Monthly Sales');
            Container.addChart($row, 'big', 'chart_department-sales', 'Department Sales');
            
    },

    addChart($list, size = '', graph_id = '', title = '', height = '80%', width = '80%') {
        let block_size = (size === 'medium') ? 'col-lg-4 col-md-6 col-xs-12' : 
            (size === 'big') ? 'col-lg-6 col-md-12 col-xs-12' : 
            'col-lg-4 col-md-6 col-xs-12';

        $($list).append(`<div class="container__item container_${size} ${block_size}">
            <div class="container__item__head">
                <div class="container__item__title text_dark-blue">${title}</div>
            </div>
            <div class="chart__wrap">
                <canvas height="${height}" width="${width}" id="${graph_id}"></canvas>
            </div>
        </div>`);
        Container.addError($list.find('.container__item').last());
        Container.addOptions($list.find('.container__item').last());
        Container.addWindowControl($list.find('.container__item').last());
    },

    addBlockGraph($list, size = '', graph_id = '', title = '', subtitle = '') {
        let block_size = (size === 'medium') ? 'col-lg-4 col-md-6 col-xs-12' : 
            (size === 'big') ? 'col-lg-6 col-md-12 col-xs-12' : 
            'col-lg-4 col-md-6 col-xs-12';
        $($list).append(`<div class="container__item container_${size} ${block_size}">
            <div class="container__item__head">
                <div class="container__item__title text_dark-blue">${title}</div>
                <div class="container__item__subtitle text_ligth-gray">${subtitle}</div>
            </div>
            <div class="chart__wrap">
                <div class="chart" id="${graph_id}"></div>
            </div>
        </div>`);
        Container.addOptions($list.find('.container__item').last());
        Container.addWindowControl($list.find('.container__item').last());
    },

    addDoubleBlock($list, size = '') {
        let block_size = (size === 'medium') ? 'col-lg-4 col-md-12 col-xs-12' :
            (size === 'big') ? 'col-lg-6 col-md-12 col-xs-12' :
            'col-lg-6 col-md-12 col-xs-12';
        $($list).append(`<div class="container_${size} container__double-block ${block_size}"></div>`);
        Container.addHalfBlock($('.container__double-block'), 'light-sky-blue-bg', 'img/basket.png', 'Shopping basket', 'text_light-blue', '$433,534,300', 'Sold 12.332 Items');
        Container.addHalfBlock($('.container__double-block'), 'light-green-bg', 'img/box.png', 'Box', 'text_light-green', '53.345', 'Order');
    },

    addHalfBlock($list, block_color = '', img_src = '', img_alt = '', text_color = '', span_text = '', text = '') {
        $($list).append(`<div class="container__half-block-wrap ${block_color}">
            <div class="container__half-block">
                <div class="container__half-block__img">
                    <img src="${img_src}" alt="${img_alt}">
                </div>
                <div class="container__half-block__text ${text_color}">
                    <span class="text_big">${span_text}</span><p class=''>${text}</p>
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
            <select class="exchange_basedOn"></select>
            <select class="exchange_basedFor"></select>
            <input type="date" class="exchange_start" value="2015-01-01" min="2000-01-01" max="2019-09-01">
            <input type="date" class="exchange_end" value="2018-01-01" min="2000-01-01" max="2019-09-01">
            <button class="exchange__input">Input</button>
        </div>`);
    },

    addError($list) {
        ($list).append(`
        <div class="chart_error hidden">
            <p>Can't draw a chart. No data. Please check your internet connection</p>
        </div>`);
    },
}
