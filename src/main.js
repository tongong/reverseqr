const m = require("mithril");
const state = require("./modules/state.js");
const editView = require("./components/edit-view.js");
const qrView = require("./components/qr-view.js");

// ugly workaround to fix scrolling on route change
// https://github.com/MithrilJS/mithril.js/issues/1655
m.mount(
    // Don't attach to the document
    document.createDocumentFragment(),
    {
        // We need a valid view for Mithril to behave
        view : () => '',
        // Will execute on the DOM ready phase of every draw
        onupdate(){
            const route = m.route.get();
            if (route != this.route) scrollTo(0, 0);
            this.route = route;
        }
    }
)


const main = () => {
    return {
        view: () => m(".pagewrap", {
            class: state.qr? "": "scroll-down",
        },
            m(qrView),
            m(editView),
        ),
    }
}

document.body.onclick = state.closeQr;

m.route(document.body, "/", {
    "/": main,
});
