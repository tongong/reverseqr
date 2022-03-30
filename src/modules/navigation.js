function generateId() {
    let arr = new Uint8Array(32);
    window.crypto.getRandomValues(arr);
    return Array.from(arr)
        .flatMap(e => [e % 16, e >> 4])
        .map(e => "0123456789abcdef"[e])
        .join("");
}

function isIdValid(id) {
    if (id.length != 64) return false;
    return id.split("").every(e => "0123456789abcdef".includes(e));
}

function splitId(id) {
    return [id.substring(0,32), id.substring(32,64)];
}

module.exports = {
    generateId,
    isIdValid,
    splitId,
}
