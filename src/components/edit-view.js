const m = require("mithril");

const Y = require("yjs");
const { WebrtcProvider } = require("y-webrtc");
const { TextAreaBinding } = require("y-textarea");

const ydoc = new Y.Doc();
const textelem = ydoc.getText("shared-buffer");
new WebrtcProvider("jaskdfasdfasdf", ydoc, { });


module.exports = () => {
    let textarea;
    return {
        view: () => m(".main", {
            onclick: () => textarea.focus(),
        }, m("textarea.maxsize", {
            oncreate: (v) => {
                textarea = v.dom;
                new TextAreaBinding(textelem, textarea);
            },
        })),
    }
};
