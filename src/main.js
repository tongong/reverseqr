const m = require("mithril");
const store = require("./modules/store.js");
const editView = require("./components/edit-view.js");
const qrView = require("./components/qr-view.js");

store.subscribe(s => s, () => m.redraw());

const main = () => {
    let qrDelay = store().qr;
    store.subscribe(s => s.qr, qrn => window.setTimeout(
        () => { qrDelay = qrn; m.redraw(); }, 1000
    ));
    return {
        view: () => m(".pagewrap", {
            class: [
                store().qr? "" : "scroll-down",
                qrDelay? "" : "scroll-down-finished",
            ].join(" "),
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
