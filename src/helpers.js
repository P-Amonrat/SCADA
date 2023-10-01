export var token = document.cookie.replace(/(?:(?:^|.*;\s*)__AntiXsrfUerkey_ManageUser\s*\=\s*([^;]*).*$)|^.*$/, "$1");
export function set_cookie(value) {
    document.cookie = value;
    token = document.cookie.replace(/(?:(?:^|.*;\s*)__AntiXsrfUerkey_ManageUser\s*\=\s*([^;]*).*$)|^.*$/, "$1");
};

export function CheckToken() {
    var tokenJwt = document.cookie.replace(/(?:(?:^|.*;\s*)__AntiXsrfUerkey_ManageUser\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (tokenJwt === "") {
        return true;
    } else {
        return false;
    }
};

export function formatNumber(num) {
    return num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0;
};
