const util = require('utils/util.js')


Page({
    data: {
    },
    onLoad() {
        console.log('引入utils', util.formatTime(new Date()))
        // console.log('一个错误', e)
    },
    $goLogin() {
        wx.redirectTo({
            url: "/subpackages/login/index",
        });
    }
})
