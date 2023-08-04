import { promisifyAll } from "../libs/miniprogram-api-promise/index";
import storage from '../storage/index'

const wxp = {};
promisifyAll(wx, wxp);

export function wxRequest(method, apiUrl, params, isUrlencoded) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: apiUrl,
            data: params,
            header: {
                'content-type': isUrlencoded ? 'application/x-www-form-urlencoded' : 'application/json',
                'loginToken': storage.getTokenFromStorage()
            },
            method: method,
            success: function (res) {
                if (res.data.code === '200' || res.data.code === 200) {
                    resolve(res.data)
                } else {
                    reject(res.data)
                }
            }
        })
    })
}

export function wxRequestGenerator(option, isIgnoreLoginToken) {
    if (typeof option !== 'object' || option === null) option = {}

    if (typeof option.header !== 'object' || option.header === null) option.header = {}
    option.header['content-type'] = option.header['content-type'] || 'application/json'

    if (!option.timeout && option.timeout !== 0) option.timeout = 30 * 1000

    if (!option.method) option.method = 'GET'

    const updateLoginToken = () => option.header.loginToken = storage.getTokenFromStorage()

    return function (url, data) {
        if (!isIgnoreLoginToken) updateLoginToken()
        return wxp.request({
            url,
            data,
            header: option.header,
            method: option.method,
            timeout: option.timeout
        }).then(res => {
            if (res.data.code === '200' || res.data.code === 200) {
                return res.data
            } else {
                return Promise.reject(res.data)
            }
        })
    }
}

export const wxRequestGet = wxRequestGenerator()
export const wxRequestPost = wxRequestGenerator({ method: 'POST' })