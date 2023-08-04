const util = require('utils/util.js')
import { areaList } from '@vant/area-data'
import { wxRequestGet } from 'utils/server/index'
import apiUrl from 'utils/server/apiUrl'

Page({
    data: {
        areaList,
        area: '请选择您的地区',
        areaPopupShow: false,

    },
    onLoad() {
        console.log('引入utils', util.formatTime(new Date()))
        // console.log('一个错误', e)
    },
    $goLogin() {
        wx.redirectTo({
            url: "/subpackages/login/index",
        });
    },
    onAreaPopupOpen() {
        this.setData({
            areaPopupShow: true
        })
    },
    onAreaPopupClose() {
        this.setData({
            areaPopupShow: false
        })
    },
    onAreaPopupConfirm(e) {
        const { values } = e.detail
        this.setData({
            area: `${values[0].name}, ${values[1].name}, ${values[2].name}`
        })
        this.onAreaPopupClose()
    },
    async _getBanner() {
        const res = await wxRequestGet(apiUrl.apiGetBannerUrl)
        console.log('apiGetBannerUrl', res)
    }
})
