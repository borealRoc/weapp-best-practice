// app.js
import { add } from 'lodash'

App({
    onLaunch() {
        console.log('lodash', add(10, 20))
        console.log(`运行时环境：开发模式 ${process.env.NODE_ENV} 构建类型：${process.env.BUILD_TYPE}`)
    },
    globalData: {
    }
})
