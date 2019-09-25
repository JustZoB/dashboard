export let Modal = {
    init(list) {
        if (!$("body").find(".modalWindow__background").length) {
            $("body").append(`<div class="modalWindow__background hidden"></div>`);
        }

        let thisModal = Modal.appendModal(list);        
        
        $(list).on('click', function () {
            $(".modalWindow__background").removeClass('hidden');
            $(thisModal).removeClass('hidden');
            $("body").css({"overflow" : "hidden"});
        });
        Modal.cssModalWindow();
        Modal.cssHeader();
        Modal.cssTitle();
        Modal.cssClose();
        Modal.cssBackground();
        Modal.cssContent();
    },

    appendModal(list) {
        if ((list[0]) === '.') {
            list = 'C' + list.slice(1);
        } else if ((list[0]) === '#') {
            list = 'I' + list.slice(1);
        }
        $("body").append(`
            <div class="modalWindow modal__${list} hidden">
                <div class="modalWindow__header">
                    <div class="modalWindow__header__title"><h2>${list}</h2></div>
                    <div class="modalWindow__header__close-button">
                        <i class="fas fa-times fa-lg"></i>
                    </div>
                </div>
                <div class="modalWindow__content">Nu privet</div>
            </div>
        `);

        return `.modal__${list}`;
    },

    cssModalWindow() {
        $(".modalWindow").css({
            "position": "fixed",
            "zIndex": 20,
            "min-width": 400,
            "min-height" : 300,
            "top" : "50%",
            "left" : "50%",
            "background-color" : "white",
            "transform": "translate(-50%, -50%)",
            "border-radius" : 7,
            "border-top-left-radius" : 9,
            "border-top-right-radius" : 9,
        });
    }, 

    cssHeader() {
        $(".modalWindow__header").css({
            "display" : "flex",
            "justify-content": "space-between",
            "heigth" : 40,
            "background-color" : "#595959",
            "border-top-left-radius" : 7,
            "border-top-right-radius" : 7,
        });
    },

    cssTitle() {
        $(".modalWindow__header__title").css({
            "margin" : 15
        });
        $(".modalWindow__header__title").find("h2").css({
            "margin" : 0,
            "color" : "white",
        });
    },

    cssClose() {
        $(".modalWindow__header__close-button").css({
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "marginRight" : 15,
            "marginLeft" : 15,
            "marginTop" : 10,
            "marginBottom" : 10,
            "padding" : 10,
            "cursor" : "pointer",
            "color" : "white",
        }).on('click', function () {
            $(".modalWindow__background").addClass('hidden');
            $('.modalWindow').addClass('hidden');
            $("body").css({"overflow" : "auto"});
        }).hover(function() {
            $(this).find("i").css("color", "gray");
        }, function() {
            $(this).find("i").css("color", "white");
        });
    },

    cssBackground() {
        $(".modalWindow__background").css({
            "position" : "fixed",
            "zIndex": 19,
            "width": "100%",
            "height" : "100%",
            "top" : 0,
            "left" : 0,
            "background-color" : "black",
            "opacity" : "0.6",
        }).on('click', function () {
            $(this).addClass('hidden');
            $('.modalWindow').addClass('hidden');
            $("body").css({"overflow" : "auto"});
        });
    },

    cssContent() {
        $(".modalWindow__content").css({
            "margin" : 15,
        });
    },
}