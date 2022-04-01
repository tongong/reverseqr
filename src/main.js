const m = require("mithril");
const y = require("yjs");
const { WebrtcProvider } = require("y-webrtc");

const store = require("./modules/store.js");
const editView = require("./components/edit-view.js");
const qrView = require("./components/qr-view.js");
const navigation = require("./modules/navigation.js");

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

if (!window.crypto.subtle) {
    console.log("no crypto :(");
}

store.subscribe(s => s.id, (id) => {
    store().ydocSet(new y.Doc());
    let sp = navigation.splitId(id);
    let provider = new WebrtcProvider(sp[0], store().ydoc, {password: sp[1]});
    provider.awareness.on("change", () => {
        store.setState({users: provider.awareness.getStates().size });
    });
    /* useless edit. only important to propagate the info that a user joined */
    provider.awareness.setLocalStateField("user", { "update": 1 });
});

store.subscribe(s => s.users, (unew, uold) => {
    if (unew == 2 && uold == 1) {
        store().qrClose();
    }
});

store.subscribe(s => s.id, id => m.route.set("/" + id));
m.route(document.body, "/-", {
    "/:id": { onmatch: (args) => {
        store().idSet(args.id);
        return main;
    }},
});
