const m = require("mithril");
const qr = require("../modules/qrcode.js");

module.exports = () => {
    let circleClosed = false;
    let closefn = () => {
        circleClosed = true;
        m.redraw();
    }
    // TODO remove
    document.body.onclick = closefn;
    return {
        view: () => m(".main.absolute-center",
            m(".circle.absolute-center", {
                class: circleClosed? "circle-closed" : "",
                oncreate: (v) => {
                    new qr(v.dom, {
                        text: "https://wikipedia.org",
                        colorDark: "#212121",
                        colorLight: "#dcdcdc",
                        width: 512,
                        height: 512,
                    });
                }
            })
        ),
    }
};
