export let Modal = {
    init(list, userset = {}) {
        let dataSet = Modal.getDataSet(userset);
        
        if (!$("body").find(".modalWindow__background").length) {
            $("body").append(`<div class="modalWindow__background hidden"></div>`);
        }

        let thisModal = Modal.appendModal(list);        
        
        $(list).on('click', function () {
            $(".modalWindow__background").removeClass('hidden');
            $(thisModal).removeClass('hidden');
            $("body").css({"overflow" : "hidden"});
        });
        Modal.cssModalWindow(thisModal, dataSet.options.modalWindow);
        Modal.cssHeader(thisModal, dataSet.options);
        Modal.cssTitle(thisModal, dataSet.options.title);
        Modal.cssClose(thisModal);
        Modal.cssBackground(dataSet.options.background);
        Modal.cssContent(thisModal);
    },

    getDataSet(userset) {
        let dataSet = { options: {} };
        if (userset.options !== undefined) {
            dataSet.options.modalWindow = userset.options.modalWindow !== undefined 
            ? Modal.getDataModalWindowSetOnUser(userset.options.modalWindow) 
            : dataSet.options.modalWindow = Modal.getDataModalWindowDefualt();

            dataSet.options.header = userset.options.header !== undefined
            ? Modal.getDataHeaderSetOnUser(userset.options.header)
            : dataSet.options.header = Modal.getDataHeaderDefualt();

            dataSet.options.background = userset.options.background !== undefined
            ? Modal.getDataBackgroundSetOnUser(userset.options.background)
            : dataSet.options.background = Modal.getDataBackgroundDefualt();
        } else {
            dataSet.options.modalWindow = Modal.getDataModalWindowDefualt();
            dataSet.options.header = Modal.getDataHeaderDefualt();
            dataSet.options.background = Modal.getDataBackgroundDefualt();
        }

        return dataSet;
    },

    getDataModalWindowSetOnUser(setting) {
        return  {
            minWidth: setting.minWidth !== undefined ? setting.minWidth : 400,
            minHeight: setting.minHeight !== undefined ? setting.minHeight : 300,
            width: setting.width !== undefined ? setting.width : "unset",
            height: setting.height !== undefined ? setting.height : "unset",
            top: setting.top !== undefined ? setting.top : "50%",
            left: setting.left !== undefined ? setting.left : "50%",
            backgroundColor: setting.backgroundColor !== undefined ? setting.backgroundColor : "white",
            borderRadius: setting.borderRadius !== undefined ? setting.borderRadius : 7,
        }
    },

    getDataModalWindowDefualt() {
        return {
            minWidth: 400,
            minHeight: 300,
            width: "unset",
            height: "unset",
            top: "50%",
            left: "50%",
            backgroundColor: "white",
            borderRadius: 7,
        }
    },

    getDataBackgroundSetOnUser(setting) {
        return {
            backgroundColor : setting.backgroundColor !== undefined ? setting.backgroundColor : "black",
            opacity: setting.opacity !== undefined ? setting.opacity : "0.6",
        }
    },

    getDataBackgroundDefualt() {
        return {
            backgroundColor : "black",
            opacity: "0.6",
        }
    },

    getDataHeaderSetOnUser(setting) {
        return {
            backgroundColor: setting.backgroundColor !== undefined ? setting.header.backgroundColor : "#595959",
        }
    },

    getDataHeaderDefualt() {
        return {
            backgroundColor: "#595959",
        }
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
    
    cssModalWindow(thisModal, settings) {
        $(thisModal).css({
            "position": "fixed",
            "zIndex": 100,
            "width" : settings.width,
            "height" : settings.height,
            "min-width": settings.minWidth,
            "min-height" : settings.minHeight,
            "top" : settings.top,
            "left" : settings.left,
            "background-color" : settings.backgroundColor,
            "transform": "translate(-50%, -50%)",
            "border-radius" : settings.borderRadius,
            "border-top-left-radius" : settings.borderRadius + 2,
            "border-top-right-radius" : settings.borderRadius + 2,
        });
    }, 

    cssHeader(thisModal, settings) {
        $(thisModal).find(".modalWindow__header").css({
            "display" : "flex",
            "justify-content": "space-between",
            "background-color" : settings.header.backgroundColor,
            "border-top-left-radius" : settings.modalWindow.borderRadius,
            "border-top-right-radius" : settings.modalWindow.borderRadius,
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

    cssClose(thisModal) {
        $(thisModal).find(".modalWindow__header__close-button").css({
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

    cssBackground(settings) {
        $(".modalWindow__background").css({
            "position" : "fixed",
            "zIndex": 99,
            "top" : 0,
            "bottom" : 0,
            "right" : 0,
            "left" : 0,
            "background-color" : settings.backgroundColor,
            "opacity" : settings.opacity,
        }).on('click', function () {
            $(this).addClass('hidden');
            $('.modalWindow').addClass('hidden');
            $("body").css({"overflow" : "auto"});
        });
    },

    cssContent(thisModal) {
        $(thisModal).find(".modalWindow__content").css({
            "margin" : 15,
        });
    },
}