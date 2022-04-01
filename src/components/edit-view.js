const m = require("mithril");
const { TextAreaBinding } = require("y-textarea");

const store = require("../modules/store.js");

module.exports = () => {
    return {
        view: () => m(".page",
            m(".main.absolute-center", m("textarea.maxsize", {
                oncreate: (v) => {
                    let binding = null;
                    store.subscribe(s => s.ydoc, ydoc => {
                        if (binding) binding.destroy();
                        binding = new TextAreaBinding(
                            ydoc.getText("shared-buffer"), v.dom);
                    }, { fireImmediately: true });
                    store.subscribe(s => s.qr, (qrn, qro) => {
                        if (!qrn && qro) {
                            v.dom.focus();
                        }
                    });
                },
            })),
        )
    }
};
