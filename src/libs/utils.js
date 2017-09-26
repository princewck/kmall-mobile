export const isWechat = () => {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
};

export const thumb = (url) => {
    if (!url) return url;
    if (url.indexOf('alicdn') >= 0 || url.indexOf('tbcdn.cn') >= 0) {
        return url + '_200x200.jpg';
    }
    return url;
}