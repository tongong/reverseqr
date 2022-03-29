const m = require("mithril");

const state = {
    qr: true,
    closeQr: function() {
        state.qr = false;
        m.redraw();
    }
}

module.exports = state;
