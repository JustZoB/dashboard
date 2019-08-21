let Container = {
    add: function() {
        let container = $(".container"),
            row = container.find(".row");

            Container.addBlockGraph(row, 'medium', 'chart__revenue', 'Revenue', 'This year');
            Container.addTextInGraphTop($(".container__item").last(), 'container__item__text container__item__text_left', '$433,534,300', 'Sold 12.332 Items');
            Container.addBlockGraph(row, 'medium', 'chart__product-order', 'Product Order'); /* , 'This month' */
            Container.addDoubleBlock(row, 'medium');
            Container.addBlockGraph(row, 'big', 'chart__customers', 'Customers');
            Container.addTextInGraphTop($(".container__item").last(), 'container__item__text container__item__text_center', '284,123');
            Container.addTextInGraphBottom($(".container__item").last(), 'container__item__text container__item__text_bottom', 'Yesterday - 22 October 2016', '06:00 AM > 11:00 PM');
            Container.addBlockGraph(row, 'big', 'chart__daily-sales', 'Daily Sales');
            Container.addBlockGraph(row, 'big', 'chart__monthly-sales', 'Monthly Sales', '(In Millions)');
            Container.addBlockGraph(row, 'big', 'chart__department-sales', 'Department Sales');
    },
    
    addBlockGraph: function(list, size, graph_id, title, subtitle) {
        let block_size = 'col-lg-4 col-md-6 col-xs-12';
        if (size === 'medium') {
            block_size = 'col-lg-4 col-md-6 col-xs-12';
        } else if (size === 'big') {
            block_size = 'col-lg-6 col-md-12 col-xs-12';
        }
        if (subtitle === undefined) {
            subtitle = "";
        }
        $(list).append(`<div class="container__item container_${ size } ${ block_size } white box-shadow">
            <div class="options">
                <div class="options__button">
                    <i class="text_light-blue-gray fas fa-ellipsis-h fa-lg"></i>
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
            <div class="chart__wrap">
                <div class="chart" id="${ graph_id }"></div>
            </div>
        </div>`);
    },

    addDoubleBlock: function(list, size) {
        let block_size = 'col-lg-4 col-md-6 col-xs-12';
        if (size === 'medium') {
            block_size = 'col-lg-4 col-md-12 col-xs-12';
        } else if (size === 'big') {
            block_size = 'col-lg-6 col-md-12 col-xs-12';
        }
        $(list).append(`<div class="container_${ size } container__double-block ${ block_size }"></div>`);
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
