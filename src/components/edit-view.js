const m = require("mithril");

const Y = require("yjs");
const { WebrtcProvider } = require("y-webrtc");
const { TextAreaBinding } = require("y-textarea");

const ydoc = new Y.Doc();
const textelem = ydoc.getText("shared-buffer");
new WebrtcProvider("jaskdfasdfasdf", ydoc, { });


module.exports = () => {
    return {
        view: () => m(".main.absolute-center", m("textarea.maxsize", {
            oncreate: (v) => {
                new TextAreaBinding(textelem, v.dom);
                v.dom.focus();
            },
        })),
    }
};
