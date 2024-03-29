export let Modal = {
    init() {
        $('.modal__background').on('click', function () {
            Modal.closeLastModal();
        });

        $(document).off('keyup document').keyup(function(e) {
            if (e.key === 'Escape') {
                Modal.closeLastModal();
            }
        });
    },

    closeModalOnCloseButton(name) {
        $(`[name=${name}]`).find('.modal__header__close').on('click', function () {
            Modal.closeLastModal();
        });
    },

    closeLastModal() {
        let $highModal = Modal.getHighModal();
        
        if ($highModal.hasClass('modal_simple')) {
            $($highModal).addClass('hidden').css('z-index', 100);
            $(`.modal__background`).addClass("hidden");
            $('body').css({'overflow' : 'auto'});
        } else if ($('.modal_dynamic').length > 1) {
            $highModal.detach();
            $(`.modal__background`).css('z-index', $highModal.css('z-index') - 2);
        } else {
            $('.modal_dynamic').addClass('hidden').removeAttr('name').css('z-index', 100).empty();
            $(`.modal__background`).addClass("hidden");
            $('body').css({'overflow' : 'auto'});
        }
    },

    configureOptionsList(options) {
        let optionsDefault = {
            eventOn: 'click',
            disableScroll: 'true'
        }
        for (const key in optionsDefault) {
            if (options[key] === undefined) {
                options[key] = optionsDefault[key];
            }
        }

        return options;
    },

    simple(name, options = {}) {
        options = Modal.configureOptionsList(options);
        $(`[name=${name}]`).on(options.eventOn, function () {
            Modal.showSimple(`modal_${name}`, options);
            Modal.modalPosition(`[name=modal_${name}]`);
        });

        Modal.modalOnResizePosition(`[name=modal_${name}]`);
        Modal.closeModalOnCloseButton(`modal_${name}`);
    },

    showSimple(modalName, options = {}) {
        options = Modal.configureOptionsList(options);

        if (options.disableScroll) {
            $('body').css({'overflow' : 'hidden'});
        }
        $(`[name=${modalName}]`).removeClass('hidden');
        Modal.setZIndex(modalName);
    },

    dynamic(url, name, type, callback, options = {}) {
        options = Modal.configureOptionsList(options);

        $(`[name=${name}]`).on('click', function () {
            let modalName = `modal_${name}`;

            if ($('.modal_dynamic').attr('name') === undefined) {
                Modal.appendDynamicElements(modalName, options.disableScroll);
            } else {
                Modal.createNewModal(modalName);
            }
            Modal.setZIndex(modalName);
            
            let modalData = Modal.getModalData(url, function() { $(`[name=${modalName}]`).find(".preloader").detach(); });

            if ((type === 'json') || type === undefined) {
                if (typeof modalData !== 'object') {
                    console.error(`Data is not this type: ${type}`);
                } else {
                    Modal.appendJson(modalName, modalData);
                }
            } else if (type === 'html') {
                Modal.appendHtml(modalName, modalData);
            }

            Modal.modalPosition(`[name=modal_${name}]`);

            if (callback !== undefined) {
                callback();
            }
        });

        Modal.modalOnResizePosition(`[name=modal_${name}]`);
    },

    getModalData(url, callback) {
        let modalData = {};
        $.ajax({ 
            type: 'GET',   
            url: url,   
            async: false,
            success : function(data) {
                modalData = data;
            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.error(textStatus, errorThrown);
                alert(textStatus + ' ' + errorThrown);
            },
        });

        callback();

        return modalData;
    },

    appendDynamicElements(name, disableScroll) {
        $('.modal_dynamic').append(`
            <div class='modal__container'>
                <div class='modal__header'>
                    <div class='modal__header__title'></div>
                    <div class='modal__header__close'>
                        <i class='fas fa-times fa-lg'></i>
                    </div>
                </div>
                <div class='modal__content'>
                    <div class="preloader"></div>
                </div>
            </div>`)
            .attr('name', name)
            .removeClass('hidden');

        if (disableScroll) {
            $('body').css({'overflow' : 'hidden'});
        }

        Modal.closeModalOnCloseButton(name);
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
                <div class='modal__content'>
                    <div class="preloader"></div>
                </div>
            </div>
        </div>`);

        Modal.closeModalOnCloseButton(name);
    },

    appendJson(name, modalData) {
        let $modal = $(`[name=${name}]`);
        if (modalData.title !== undefined) {
            $modal.find('.modal__header__title').append(`<h2>${modalData.title}</h2>`);
        }
        
        if (modalData.objects !== undefined) {
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
        }
    },

    appendHtml(name, modalData) {
        $(`[name=${name}]`).find('.modal__content').append(modalData);
    },

    setZIndex(name) {
        let zIndex = $(`.modal_dynamic`).css('z-index');
        $(`.modal`).each((key, $elem) => {
            if (zIndex < $($elem).css('z-index')) {
                zIndex = $($elem).css('z-index');
            }
        });
        $(`[name=${name}]`).css('z-index', parseInt(zIndex) + 1);
        $(`.modal__background`).removeClass("hidden").css('z-index', zIndex);
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

    modalPosition(modal) {
        $(modal).css("left", ($(window).width() - $(modal).width()) / 2);
        $(modal).css("top", ($(window).height() - $(modal).height()) / 2);
        console.log($(modal).width());
        console.log($(modal).height());
    },

    modalOnResizePosition(modal) {
        let resizeTimer;

        $(window).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                Modal.modalPosition(modal);
            }, 250);
        });
    },
}
