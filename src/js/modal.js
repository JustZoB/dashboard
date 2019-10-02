export let Modal = {
    events() {
        $(".modal__background").on('click', function () {
            $(".modal__background").addClass('hidden');
            $('.modal').addClass('hidden').removeAttr("name");
            $("body").css({"overflow" : "auto"});
            $('.modal__content').empty();
            $(".modal__header__title").empty();
        });
        
        $(".modal__header__close").on('click', function () {
            $(".modal__background").addClass('hidden');
            $('.modal').addClass('hidden').removeAttr("name");
            $("body").css({"overflow" : "auto"});
            $('.modal__content').empty();
            $(".modal__header__title").empty();
        });
    },

    secondryEvents(name) {
        let modal = $(`[name=${name}]`);

        $(".modal__background").off('click');
        $(".modal__background").on('click', function () {
            modal.detach();
            if ($(".modal_secondry").length === 0) {
                $(".modal__background").on('click', function () {
                    $(".modal__background").addClass('hidden');
                    $('.modal').addClass('hidden').removeAttr("name");
                    $("body").css({"overflow" : "auto"});
                    $('.modal__content').empty();
                    $(".modal__header__title").empty();
                });
            }
        });

        modal.find(".modal__header__close").on('click', function () {
            modal.detach();
        });
    },

    dynamic(url, type, name, callback) {
        Modal.events();
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
                if ($(".modal").attr("name") === undefined) {
                    $(".modal").attr("name", `modal_${name}`).removeClass('hidden');
                    $("body").css({"overflow" : "hidden"});
                } else {
                    Modal.createNewModal(`modal_${name}`);
                }                
                if (type === "json") {
                    Modal.appendJson(`modal_${name}`, modalData);
                }
            }
            if (callback !== undefined) {
                callback();
            }
        });
    },

    appendJson(name, modalData) {
        let modal = $(`[name=${name}]`);
        modal.find(".modal__header__title").append(`<h2 name="NewModalHere">${modalData.title}</h2>`);
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
        Modal.secondryEvents(name);
    },
}
