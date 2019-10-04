export let Modal = {
    eventsBackground() {
        $('.modal__background').on('click', function () {
            Modal.closeLastModal();
        });

        $(document).off('keyup document').keyup(function(e) {
            if (e.key === 'Escape') {
                Modal.closeLastModal();
            }
       });
    },

    closeLastModal() {
        let $highModal = Modal.getHighModal();
        $(`.modal__background.${$highModal.attr('name')}`).detach();

        if ($highModal.hasClass('modal_simple')) {
            $($highModal).addClass('hidden').css('z-index', 100);
        } else if ($('.modal_dynamic').length > 1) {
            $highModal.detach();
        } else {
            Modal.emptyDynamic();
        }
        
        if ($highModal.css('z-index') === '100') {
            $('body').css({'overflow' : 'auto'});
        }
    },

    emptyDynamic() {
        $('.modal_dynamic').addClass('hidden').removeAttr('name').css('z-index', 100).empty();
    },

    simple(name, modalName, options = {}) {
        if (options.eventOn === undefined) { // дефолтный объект
            options.eventOn = 'click';
        }
        $(`[name=${name}]`).on(options.eventOn, function () {
            $('body').append(`<div class='modal__background ${modalName}'></div>`).css({'overflow' : 'hidden'});
            $(`[name=${modalName}]`).removeClass('hidden');
            Modal.eventsBackground();
            Modal.setZIndex(modalName);
        });

        $(`[name=${modalName}]`).find('.modal__header__close').on('click', function () {
            $(`[name=${modalName}]`).addClass('hidden').css('z-index', 100);
            $(`.modal__background.${modalName}`).detach();
            $('body').css({'overflow' : 'auto'});
        });
    },

    dynamic(url, type, name, callback) {
        $(`[name=${name}]`).on('click', function () {
            let modalData = {},
                errors = false;
            $.ajax({ 
                type: 'GET',   
                url: url,   
                async: false,
                success : function(data) {
                    modalData = data;
                },
                error : function() {
                    console.error(`"${url}" 404 (Not found)`); // 503 ?
                    errors = true;
                },
            });
            if (type === 'json') {
                if (typeof modalData !== 'object') {
                    console.error(`Data is not this type: ${type}`);
                    errors = true;
                }
            }
            
            if (!errors) {
                let modalName = `modal_${name}`;
                if ($('.modal_dynamic').attr('name') === undefined) {
                    Modal.appendDynamicElements(modalName);
                } else {
                    Modal.createNewModal(modalName);
                }
                if (type === 'json') {
                    Modal.appendJson(modalName, modalData);
                }
                Modal.setZIndex(modalName);
            }

            if (callback !== undefined) {
                callback();
            }
        });
    },

    appendDynamicElements(name) {
        $('.modal_dynamic').append(`
            <div class='modal__container'>
                <div class='modal__header'>
                    <div class='modal__header__title'></div>
                    <div class='modal__header__close'>
                        <i class='fas fa-times fa-lg'></i>
                    </div>
                </div>
                <div class='modal__content'></div>
            </div>`)
            .attr('name', name)
            .removeClass('hidden');

        $('body').append(`<div class='modal__background ${name}'></div>`).css({'overflow' : 'hidden'});
        Modal.eventsBackground();
        $(`[name=${name}]`).find('.modal__header__close').on('click', function () {
            Modal.closeLastModal();
        });
    },

    createNewModal(name) {
        $('body').append(`<div class='modal modal_dynamic' name=${name}>
            <div class='modal__container'>
                <div class='modal__header'>
                    <div class='modal__header__title'></div>
                    <div class='modal__header__close'>
                        <i class='fas fa-times fa-lg'></i>
                    </div>
                </div>
                <div class='modal__content'></div>
            </div>
        </div>
        <div class='modal__background ${name}'></div>`);

        Modal.eventsBackground();
        $(`[name=${name}]`).find('.modal__header__close').on('click', function () {
            $(`[name=${name}]`).detach();
            $(`.modal__background.${name}`).detach();
        });
    },

    appendJson(name, modalData) {
        let $modal = $(`[name=${name}]`);
        $modal.find('.modal__header__title').append(`<h2>${modalData.title}</h2>`);
        modalData.objects.forEach(element => {
            if (!element.buttonFloatRight) {
                $modal.find('.modal__content').append(`<${element.tag}/>`);
            } else {
                $modal.find('.modal__content').append(`<div class='modal__button_right'><${element.tag}/></div>`);
            }
            
            if (element.attributes !== undefined) {
                for (const [name, value] of Object.entries(element.attributes)) {
                    $modal.find(element.tag).last().attr(name, value);
                }
            }
        });
    },

    setZIndex(name) {
        let zIndex = $(`.modal_dynamic`).css('z-index');
        $(`.modal`).each((key, $elem) => {
            if (zIndex < $($elem).css('z-index')) {
                zIndex = $($elem).css('z-index');
            }
        });
        $(`[name=${name}]`).css('z-index', parseInt(zIndex) + 1);
        $(`.modal__background.${name}`).css('z-index', parseInt(zIndex));
    },

    getHighModal() {
        let zIndex = $(`.modal_dynamic`).css('z-index'),
            $highModal = $(`.modal_dynamic`);
        $(`.modal`).each((key, $elem) => {
            if (zIndex < $($elem).css('z-index')) {
                zIndex = $($elem).css('z-index');
                $highModal = $($elem);
            }
        });

        return $highModal;
    },
}
