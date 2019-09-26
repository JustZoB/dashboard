export let Modal = {
    init(list, userOptionsSet = {}, userDataSet = {}) {
        const defualtSet = {
            modalWindow: {
                minWidth: 400,
                minHeight: 300,
                width: "unset",
                height: "unset",
                top: "50%",
                left: "50%",
                backgroundColor: "white",
                borderRadius: 7,
            },
            background: {
                backgroundColor : "black",
                opacity: "0.6",
            },
            header: {
                backgroundColor: "#595959",
            },
            input: {
                border: "1px solid",
                borderColor: "gray",
                width: 200,
                padding: 10,
                margin: 10,
            },
        }
        let dataSet = Modal.getDataSet(userOptionsSet, defualtSet);
        
        if (!$("body").find(".modalWindow__background").length) {
            $("body").append(`<div class="modalWindow__background hidden"></div>`);
        }
        let title = (userDataSet.title !== undefined) ? userDataSet.title : "",
            thisModal = Modal.appendModal(list, userDataSet.objects, title, defualtSet);        
        
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

    getDataSet(userset, defualtSet) {
        let dataSet = { options: {} };
        if (userset.options !== undefined) {
            dataSet.options.modalWindow = userset.options.modalWindow !== undefined 
            ? Modal.getDataModalWindowSetOnUser(userset.options.modalWindow, defualtSet.modalWindow) 
            : dataSet.options.modalWindow = Modal.getDataModalWindowDefualt(defualtSet.modalWindow);

            dataSet.options.header = userset.options.header !== undefined
            ? Modal.getDataHeaderSetOnUser(userset.options.header, defualtSet.header)
            : dataSet.options.header = Modal.getDataHeaderDefualt(defualtSet.header);

            dataSet.options.background = userset.options.background !== undefined
            ? Modal.getDataBackgroundSetOnUser(userset.options.background, defualtSet.background)
            : dataSet.options.background = Modal.getDataBackgroundDefualt(defualtSet.background);
        } else {
            dataSet.options.modalWindow = Modal.getDataModalWindowDefualt(defualtSet.modalWindow);
            dataSet.options.header = Modal.getDataHeaderDefualt(defualtSet.header);
            dataSet.options.background = Modal.getDataBackgroundDefualt(defualtSet.background);
        }

        return dataSet;
    },

    getDataModalWindowSetOnUser(setting, defualtSet) {
        return  {
            minWidth: setting.minWidth !== undefined ? setting.minWidth : defualtSet.minWidth,
            minHeight: setting.minHeight !== undefined ? setting.minHeight : defualtSet.minHeight,
            width: setting.width !== undefined ? setting.width : defualtSet.width,
            height: setting.height !== undefined ? setting.height : defualtSet.height,
            top: setting.top !== undefined ? setting.top : defualtSet.top,
            left: setting.left !== undefined ? setting.left : defualtSet.left,
            backgroundColor: setting.backgroundColor !== undefined ? setting.backgroundColor : defualtSet.backgroundColor,
            borderRadius: setting.borderRadius !== undefined ? setting.borderRadius : defualtSet.borderRadius,
        }
    },

    getDataModalWindowDefualt(defualtSet) {
        return {
            minWidth: defualtSet.minWidth,
            minHeight: defualtSet.minHeight,
            width: defualtSet.width,
            height: defualtSet.height,
            top: defualtSet.top,
            left: defualtSet.left,
            backgroundColor: defualtSet.backgroundColor,
            borderRadius: defualtSet.borderRadius,
        }
    },

    getDataBackgroundSetOnUser(setting, defualtSet) {
        return {
            backgroundColor : setting.backgroundColor !== undefined ? setting.backgroundColor : defualtSet.backgroundColor,
            opacity: setting.opacity !== undefined ? setting.opacity : defualtSet.opacity,
        }
    },

    getDataBackgroundDefualt(defualtSet) {
        return {
            backgroundColor : defualtSet.backgroundColor,
            opacity: defualtSet.opacity,
        }
    },

    getDataHeaderSetOnUser(setting, defualtSet) {
        return {
            backgroundColor: setting.backgroundColor !== undefined ? setting.header.backgroundColor : defualtSet.backgroundColor,
        }
    },

    getDataHeaderDefualt(defualtSet) {
        return {
            backgroundColor: defualtSet.backgroundColor,
        }
    },

    appendModal(list, userDataSet, title, defualtSet) {
        if ((list[0]) === '.') {
            list = 'C' + list.slice(1);
        } else if ((list[0]) === '#') {
            list = 'I' + list.slice(1);
        }

        $("body").append(`
            <div class="modalWindow modal__${list} hidden">
                <div class="modalWindow__header">
                    <div class="modalWindow__header__title"><h2>${title}</h2></div>
                    <div class="modalWindow__header__close-button">
                        <i class="fas fa-times fa-lg"></i>
                    </div>
                </div>
                <div class="modalWindow__content"></div>
            </div>
        `);

        if (userDataSet !== undefined) {
            userDataSet.forEach(element => {
                let thisModal = $(`.modal__${list}`),
                    oneTag = [
                        "area", 
                        "base", 
                        "br", 
                        "col", 
                        "command", 
                        "embed", 
                        "hr", 
                        "img", 
                        "input", 
                        "keygen", 
                        "link", 
                        "meta", 
                        "param", 
                        "source", 
                        "track", 
                        "wbr"
                    ];

                if (oneTag.some(elem => elem === element.tag)) {
                    thisModal.find(".modalWindow__content").append(`
                        <${element.tag}>
                    `);
                    if (element.text !== undefined) {
                        $(`<p>${element.text}</p>`).insertBefore( $(element.tag).last() );
                    }
                } else {
                    thisModal.find(".modalWindow__content").append(`
                        <${element.tag}></${element.tag}>
                    `);
                    if (element.text !== undefined) {
                        $(element.tag).last().append(element.text);
                    }
                }

                if (element.attributes !== undefined) {
                    for (const [name, value] of Object.entries(element.attributes)) {
                        $(element.tag).last().attr(name, value);
                    }
                }

                if (element.styles !== undefined) {
                    Modal.cssTag($(element.tag).last(), element.styles, defualtSet[element.tag]);
                } else {
                    Modal.cssTagDefault($(element.tag).last(), defualtSet[element.tag]);
                }
            });
        }

        return `.modal__${list}`;
    },
    
    cssModalWindow(thisModal, settings) {
        $(thisModal).css({
            "position": "fixed",
            "zIndex": 100,
            "transform": "translate(-50%, -50%)",
            "width" : settings.width,
            "height" : settings.height,
            "min-width": settings.minWidth,
            "min-height" : settings.minHeight,
            "top" : settings.top,
            "left" : settings.left,
            "background-color" : settings.backgroundColor,
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

    cssTag(thisTag, userStyleSet, defualtSet = undefined) {
        if (defualtSet !== undefined) {
            thisTag.css({
                "margin" : userStyleSet.margin !== undefined ? userStyleSet.margin : defualtSet.margin !== undefined ? defualtSet.margin : 0,
                "padding" : userStyleSet.padding !== undefined ? userStyleSet.padding : defualtSet.padding !== undefined ? defualtSet.padding : 0,
                "border" : userStyleSet.border !== undefined ? userStyleSet.border : defualtSet.border !== undefined ? defualtSet.border : 0,
                "border-color" : userStyleSet.borderColor !== undefined ? userStyleSet.borderColor : defualtSet.borderColor !== undefined ? defualtSet.borderColor : "unset",
                "font-size" : userStyleSet.fontSize !== undefined ? userStyleSet.fontSize : defualtSet.fontSize !== undefined ? defualtSet.fontSize : 14,
                "font-family" : userStyleSet.fontFamaly !== undefined ? userStyleSet.fontFamaly : defualtSet.fontFamaly !== undefined ? defualtSet.fontFamaly : 0,
                "font-weight" : userStyleSet.fontWeight !== undefined ? userStyleSet.fontWeight : defualtSet.fontWeight !== undefined ? defualtSet.fontWeight : 400,
                "width" : userStyleSet.width !== undefined ? userStyleSet.width : defualtSet.width !== undefined ? defualtSet.width : "unset",
                "heigth" : userStyleSet.heigth !== undefined ? userStyleSet.heigth : defualtSet.heigth !== undefined ? defualtSet.heigth : "unset",
                "color" : userStyleSet.color !== undefined ? userStyleSet.color : defualtSet.color !== undefined ? defualtSet.color : "unset",
                "background-color" : userStyleSet.backgroundColor !== undefined ? userStyleSet.backgroundColor : defualtSet.backgroundColor !== undefined ? defualtSet.backgroundColor : "unset",
            });
        } else {
            thisTag.css({
                "margin" : userStyleSet.margin !== undefined ? userStyleSet.margin : 0,
                "padding" : userStyleSet.padding !== undefined ? userStyleSet.padding : 0,
                "border" : userStyleSet.border !== undefined ? userStyleSet.border : 0,
                "border-color" : userStyleSet.borderColor !== undefined ? userStyleSet.borderColor : "unset",
                "font-size" : userStyleSet.fontSize !== undefined ? userStyleSet.fontSize : 14,
                "font-family" : userStyleSet.fontFamaly !== undefined ? userStyleSet.fontFamaly : 0,
                "font-weight" : userStyleSet.fontWeight !== undefined ? userStyleSet.fontWeight : 400,
                "width" : userStyleSet.width !== undefined ? userStyleSet.width : "unset",
                "heigth" : userStyleSet.heigth !== undefined ? userStyleSet.heigth : "unset",
                "color" : userStyleSet.color !== undefined ? userStyleSet.color : "unset",
                "background-color" : userStyleSet.backgroundColor !== undefined ? userStyleSet.backgroundColor : "unset",
            });
        }
    },

    cssTagDefault(thisTag, defualtSet = undefined) {
        if (defualtSet !== undefined) {
            thisTag.css({
                "margin" : defualtSet.margin !== undefined ? defualtSet.margin : 0,
                "padding" : defualtSet.padding !== undefined ? defualtSet.padding : 0,
                "border" : defualtSet.border !== undefined ? defualtSet.border : 0,
                "border-color" : defualtSet.borderColor !== undefined ? defualtSet.borderColor : "unset",
                "font-size" : defualtSet.fontSize !== undefined ? defualtSet.fontSize : 14,
                "font-family" : defualtSet.fontFamaly !== undefined ? defualtSet.fontFamaly : 0,
                "font-weight" : defualtSet.fontWeight !== undefined ? defualtSet.fontWeight : 400,
                "width" : defualtSet.width !== undefined ? defualtSet.width : "unset",
                "heigth" : defualtSet.heigth !== undefined ? defualtSet.heigth : "unset",
                "color" : defualtSet.color !== undefined ? defualtSet.color : "unset",
                "background-color" : defualtSet.backgroundColor !== undefined ? defualtSet.backgroundColor : "unset",
            });
        } else {
            thisTag.css({
                "margin" : 0,
                "padding" : 0,
                "border" : 0,
                "border-color" : "unset",
                "font-size" : 14,
                "font-family" : "unset",
                "font-weight" : 400,
                "width" : "unset",
                "heigth" : "unset",
                "color" : "unset",
                "background-color" : "unset",
            });
        }
    },
}
