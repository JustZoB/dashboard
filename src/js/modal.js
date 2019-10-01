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
        }).hover(function() {
            $(this).find("i").css("color", "gray");
        }, function() {
            $(this).find("i").css("color", "white");
        });
    },

    dynamic(url, type, name) {
        Modal.simple();
        $(name).on('click', function () {
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
                    console.error("Can't get url");
                    errors = true;
                },
            });
            if (typeof modalData !== type) {
                console.error(`Data is not an ${type}`);
                errors = true;
            }
            if (!errors) {
                $(".modal__background").removeClass('hidden');
                $('.modal').removeClass('hidden');
                $("body").css({"overflow" : "none"});
                Modal.append(modalData);
            }
        });
    },

    append(modalData) {
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
