const m = require("mithril");
const store = require("./modules/store.js");
const editView = require("./components/edit-view.js");
const qrView = require("./components/qr-view.js");

store.subscribe(s => s, () => m.redraw());

const main = () => {
    return {
        view: () => m(".pagewrap", {
            class: store().qr? "" : "scroll-down",
        },
            m(qrView),
            m(editView),
        ),
    }
}

document.body.onclick = store().qrClose;

store.subscribe(s => s.id, id => m.route.set(id));
m.route(document.body, "/-", {
    "/:id": { onmatch: (args) => {
        store().idSet(args.id);
        return main;
    }},
});
