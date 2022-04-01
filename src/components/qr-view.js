const m = require("mithril");
const store = require("../modules/store.js");
const qr = require("qr-creator").default;

module.exports = () => {
    return {
        view: () => m(".page.qrwrap", {
            oncreate: (v) => {
                store.subscribe(s => s.id,
                    () => {
                        v.dom.innerHTML = "";
                        qr.render({
                            text: window.location.href,
                            radius: 0,
                            fill: "#212121",
                            background: null,
                            size: 512,
                        }, v.dom);
                    },
                    { fireImmediately: true }
                );
            }
        })
    }
};
