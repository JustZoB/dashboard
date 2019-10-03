export let Modal = {
    closeLastModal() {
        let highModal = Modal.getHighModal();
        if (highModal.hasClass("modal_simple")) {
            $(highModal).addClass('hidden').css("zIndex", 9000);
        } else if (highModal.hasClass("modal_secondry")) {
            highModal.detach();
        } else if (highModal.hasClass("modal_dynamic")) {
            Modal.emptyDynamic();
        }
        if (+Modal.getHighModal().css("zIndex") === 9000) {
            $(".modal__background").addClass('hidden');
            $("body").css({"overflow" : "auto"});
        }
    },

    backgroundEvent() {
        $(".modal__background").off();
        $(".modal__background").on('click', function () {
            Modal.closeLastModal();
        });
    },

    escapeEvent() {
        $(document).off();
        $(document).keyup(function(e) {
            if (e.key === "Escape") {
                Modal.closeLastModal();
            }
       });
    },

    eventsDynamic() {
        Modal.backgroundEvent();
        Modal.escapeEvent();
        $(".modal__header__close").on('click', function () {
            Modal.emptyDynamic();
        });
    },

    emptyDynamic() {
        let dynamic = $('.modal_dynamic');
        dynamic.addClass('hidden').removeAttr("name").css("zIndex", 9000);
        dynamic.find('.modal__content').empty();
        dynamic.find(".modal__header__title").empty();
    },

    simple(name, modalName) {
        Modal.backgroundEvent();
        Modal.escapeEvent();
        $(`[name=${name}]`).on('click', function () {
            $(".modal__background").removeClass('hidden');
            $(`[name=${modalName}]`).removeClass('hidden');
            $("body").css({"overflow" : "hidden"});
            Modal.setZIndex(modalName);
        });

        $(".modal__header__close").on('click', function () {
            $(`[name=${modalName}]`).addClass('hidden').css("zIndex", 9000);
            $(".modal__background").addClass('hidden');
            $("body").css({"overflow" : "auto"});
        });
    },

    dynamic(url, type, name, callback) {
        Modal.eventsDynamic();
        $(`[name=${name}]`).on('click', function () {
            let modalData = {},
                errors = false;
            $.ajax({ 
                type: "GET",   
                url: url,   
                async: false,
                success : function(data) {
                    modalData = data;
                },
                error : function() {
                    console.error(`"${url}" 404 (Not found)`);
                    errors = true;
                },
            });
            if (type === "json") {
                if (typeof modalData !== "object") {
                    console.error(`Data is not this type: ${type}`);
                    errors = true;
                }
            }
            
            if (!errors) {
                $(".modal__background").removeClass('hidden');
                if ($(".modal_dynamic").attr("name") === undefined) {
                    $(".modal_dynamic").attr("name", `modal_${name}`).removeClass('hidden');
                    $("body").css({"overflow" : "hidden"});
                } else {
                    Modal.createNewModal(`modal_${name}`);
                }                
                if (type === "json") {
                    Modal.appendJson(`modal_${name}`, modalData);
                }
            }
            Modal.setZIndex(`modal_${name}`);
            
            if (callback !== undefined) {
                callback();
            }
        });
    },

    appendJson(name, modalData) {
        let modal = $(`[name=${name}]`);
        modal.find(".modal__header__title").append(`<h2>${modalData.title}</h2>`);
        modalData.objects.forEach(element => {
            if (!element.buttonFloatRight) {
                modal.find(".modal__content").append(`<${element.tag}/>`);
            } else {
                modal.find(".modal__content").append(`<div class="modal__button_right"><${element.tag}/></div>`);
            }
            
            if (element.attributes !== undefined) {
                for (const [name, value] of Object.entries(element.attributes)) {
                    modal.find(element.tag).last().attr(name, value);
                }
            }
        });
    },

    createNewModal(name) {
        $("body").append(`<div class="modal modal_secondry" name=${name}>
            <div class="modal__header">
                <div class="modal__header__title"></div>
                <div class="modal__header__close">
                    <i class="fas fa-times fa-lg"></i>
                </div>
            </div>
            <div class="modal__content"></div>
        </div>`);
        $(`[name=${name}]`).find(".modal__header__close").on('click', function () {
            $(`[name=${name}]`).detach();
        });
    },

    setZIndex(name) {
        let zIndex = $(`.modal_dynamic`).css("zIndex");
        $(`.modal`).each((key, elem) => {
            if (zIndex < $(elem).css("zIndex")) {
                zIndex = $(elem).css("zIndex");
            }
        });
        $(`[name=${name}]`).css("zIndex", +zIndex + 1);
    },

    getHighModal() {
        let zIndex = $(`.modal_dynamic`).css("zIndex"),
            highModal = $(`.modal_dynamic`);
        $(`.modal`).each((key, elem) => {
            if (zIndex < $(elem).css("zIndex")) {
                zIndex = $(elem).css("zIndex");
                highModal = $(elem);
            }
        });
        return highModal;
    },
}
