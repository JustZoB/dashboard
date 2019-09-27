export let Modal = {
    init(list, userDataSet = {}) {
        const defualtSet = {
            modal: {
                position: "fixed",
                zIndex: 100,
                transform: "translate(-50%, -50%)",
                minWidth: 400,
                minHeight: 300,
                top: "50%",
                left: "50%",
                backgroundColor: "white",
                borderRadius: 7,
                borderTopLeftRadius : 9,
                borderTopRightRadius : 9,
            },
            background: {
                backgroundColor : "black",
                opacity: "0.6",
            },
            header: {
                display : "flex",
                justifyContent: "space-between",
                backgroundColor: "#595959",
                borderTopLeftRadius : 7,
                borderTopRightRadius : 7,
            },
            input: {
                border: "1px solid",
                borderColor: "gray",
                width: 200,
                padding: 10,
                margin: 10,
            },
        }
        let properties = {
            backgroundColor : "background-color",
            bottom: "bottom",
            border : "border",
            borderRadius : "border-radius",
            borderTopLeftRadius : "border-top-left-radius",
            borderTopRightRadius : "border-top-right-radius",
            borderBottomLeftRadius : "border-bottom-left-radius",
            borderBottomRightRadius : "border-bottom-right-radius",
            borderColor : "border-color",
            color : "color",
            cursor : "cursor",
            display : "display",
            flexDirection : "flex-direction",
            float : "float",
            fontSize : "font-size",
            fontStyle : "font-style",
            fontFamaly : "font-family",
            fontWeight : "font-weight",
            justifyContent : "justify-content",
            heigth : "heigth",
            left: "left",
            lineHeight : "line-height",
            listStyleType : "list-style-type",
            margin : "margin",
            marginBottom : "margin-bottom",
            marginTop : "margin-top",
            marginLeft : "margin-left",
            marginRight : "margin-right",
            maxHeight : "max-height",
            maxWidth : "max-width",
            minHeight : "min-height",
            minWidth : "min-width",
            opacity : "opacity",
            overflow : "overflow",
            padding : "padding",
            paddingBottom : "padding-bottom",
            paddingTop : "padding-top",
            paddingLeft : "padding-left",
            paddingRight : "padding-right",
            position : "position",
            right: "right",
            top: "top",
            transform : "transform",
            transition : "transition",
            textAlign : "text-align",
            verticalAlign : "vertical-align",
            width : "width",
            whiteSpace : "white-space",
            zIndex : "z-index",
        } 
        
        if (!$("body").find(".modalWindow__background").length) {
            $("body").append(`<div class="modalWindow__background hidden"></div>`);
        }
        let title = (userDataSet.title !== undefined) ? userDataSet.title : "",
            thisModal = Modal.appendModal(list, properties, userDataSet, title, defualtSet);        
        
        $(list).on('click', function () {
            $(".modalWindow__background").removeClass('hidden');
            $(thisModal).removeClass('hidden');
            $("body").css({"overflow" : "hidden"});
        });
    },

    appendModal(list, properties, userDataSet, title = undefined, defualtSet) {
        let oneTag = [
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
        Modal.setCssForModal($(`.modal__${list}`), properties, userDataSet, defualtSet);
        Modal.cssTitle();
        Modal.cssContent($(`.modal__${list}`));
        Modal.cssClose($(`.modal__${list}`));
        Modal.cssBackground();
        if (userDataSet !== undefined) {
            if (userDataSet.objects !== undefined) {
                Modal.appendUserData(oneTag, properties, $(`.modal__${list}`).find(".modalWindow__content"), defualtSet, userDataSet.objects);
            }
        }

        return `.modal__${list}`;
    },

    setCssForModal(thisModal, properties, userDataSet, defualtSet) {
        let objects = [
            {
                name: "modal",
                object: $(thisModal),
            },
            {
                name: "background",
                object: $(".modalWindow__background"),
            },
            {
                name: "header",
                object: $(thisModal).find(".modalWindow__header"),
            },
        ]
        objects.forEach(item => {
            if (userDataSet.styles !== undefined) {
                if (userDataSet.styles[item.name] !== undefined) {
                    Modal.cssTag(properties, item.object, userDataSet.styles[item.name], defualtSet[item.name]);
                } else {
                    Modal.cssTagDefault(properties, item.object, defualtSet[item.name]);
                }
            } else {
                Modal.cssTagDefault(properties, item.object, defualtSet[item.name]);
            }
        });
    },

    appendUserData(oneTag, properties, appendTo, defualtSet, userDataSet) {
        if (userDataSet !== undefined) {
            userDataSet.forEach(element => {
                if (oneTag.some(elem => elem === element.tag)) {
                    appendTo.append(`
                        <${element.tag}>
                    `);
                    if (element.text !== undefined) {
                        $(`<p>${element.text}</p>`).insertBefore( $(element.tag).last() );
                    }
                } else {
                    appendTo.append(`
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
                    Modal.cssTag(properties, $(element.tag).last(), element.styles, defualtSet[element.tag]);
                } else {
                    Modal.cssTagDefault(properties, $(element.tag).last(), defualtSet[element.tag]);
                }
    
                if (element.objects !== undefined) {
                    Modal.appendUserData(oneTag, properties, $(element.tag).last(), defualtSet, element.objects);
                }
            });
        }
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

    cssContent(thisModal) {
        $(thisModal).find(".modalWindow__content").css({
            "margin" : 15
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

    cssBackground() {
        $(".modalWindow__background").css({
            "position" : "fixed",
            "zIndex": 99,
            "top" : 0,
            "bottom" : 0,
            "right" : 0,
            "left" : 0,
        }).on('click', function () {
            $(this).addClass('hidden');
            $('.modalWindow').addClass('hidden');
            $("body").css({"overflow" : "auto"});
        });
    },

    cssTag(properties, thisTag, userStyleSet, defualtSet = undefined) {
        if (defualtSet !== undefined) {
            for (let [key, value] of Object.entries(properties)) {
                if (userStyleSet[key] !== undefined) {
                    thisTag.css(value, userStyleSet[key]);
                } else if (defualtSet[key] !== undefined) {
                    thisTag.css(value, defualtSet[key]);
                }
            }
        } else {
            for (let [key, value] of Object.entries(properties)) {
                if (userStyleSet[key] !== undefined) {
                    thisTag.css(value, userStyleSet[key]);
                }
            }
        }
    },
    
    cssTagDefault(properties, thisTag, defualtSet = undefined) {
        if (defualtSet !== undefined) {
            for (let [key, value] of Object.entries(properties)) {
                if (defualtSet[key] !== undefined) {
                    thisTag.css(value, defualtSet[key]);
                }
            }
        }
    },
}
