export let Modal = {
    simple() {
        $(".modal__background").on('click', function () {
            $(".modal__background").addClass('hidden');
            $('.modal').addClass('hidden');
            $("body").css({"overflow" : "auto"});
            $('.modal__content').empty();
        });
        
        $(".modal__header__close").on('click', function () {
            $(".modal__background").addClass('hidden');
            $('.modal').addClass('hidden');
            $("body").css({"overflow" : "auto"});
            $('.modal__content').empty();
        });
    },

    dynamic(url, type, name) {
        Modal.simple();
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
                $('.modal').removeClass('hidden');
                $("body").css({"overflow" : "none"});
                if (type === "json") {
                    Modal.appendJson(modalData);
                }
            }
        });
    },

    appendJson(modalData) {
        modalData.forEach(element => {
            if (!element.buttonFloatRight) {
                $(".modal__content").append(`<${element.tag}/>`);
            } else {
                $(".modal__content").append(`<div class="modal__button_right"><${element.tag}/></div>`);
            }
            
            if (element.attributes !== undefined) {
                for (const [name, value] of Object.entries(element.attributes)) {
                    $(element.tag).last().attr(name, value);
                }
            }
        });
    }
}
