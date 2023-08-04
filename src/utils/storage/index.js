const TOKEN = 'token'

export default {
    setTokenToStorage(token) {
        wx.setStorageSync(TOKEN, token || "");
    },
    getTokenFromStorage() {
        return wx.getStorageSync(TOKEN) || "";
    }
}