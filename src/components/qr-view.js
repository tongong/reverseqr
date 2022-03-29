const m = require("mithril");
const qr = require("../modules/qrcode.js");

module.exports = () => {
    return {
        view: () => m(".page.qrwrap", {
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
    }
};
