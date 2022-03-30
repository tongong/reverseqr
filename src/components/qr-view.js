const m = require("mithril");
const store = require("../modules/store.js");
const qr = require("../modules/qrcode.js");

module.exports = () => {
    return {
        view: () => m(".page.qrwrap", {
            oncreate: (v) => {
                let qrcode = new qr(v.dom, {
                    text: window.location.href,
                    colorDark: "#212121",
                    colorLight: "#dcdcdc",
                    width: 512,
                    height: 512,
                });
                store.subscribe(s => s.id,
                    () => qrcode.makeCode(window.location.href)
                );
            }
        })
    }
};
