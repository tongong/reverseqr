const createStore = require("zustand/vanilla").default;
const { subscribeWithSelector } = require("zustand/middleware");

const navigation = require("./navigation.js");

/* makes the store a function object from getState */
function bindGetFn(store) {
    let n = store.getState;
    n.setState = store.setState;
    n.getState = store.getState;
    n.subscribe = store.subscribe;
    n.destroy = store.destroy;
    return n;
}

module.exports = bindGetFn(createStore(subscribeWithSelector(
    set => ({
        qr: true,
        qrClose: () => set(() => ({ qr: false })),
        id: "",
        idSet: (n) => {
            if (!navigation.isIdValid(n)) n = navigation.generateId();
            set(() => ({id: n}))
        },
        ydoc: null,
        ydocSet: (n) => set(() => ({ ydoc: n })),
        users: 0,
    })
)));
