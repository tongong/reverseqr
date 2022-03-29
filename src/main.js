const m = require("mithril");
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

m.route(document.body, "/", {
    "/": editView,
    "/qr": qrView,
});
