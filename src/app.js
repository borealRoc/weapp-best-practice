// app.js
import { add } from 'lodash'

App({
    onLaunch() {
        console.log('lodash', add(10, 20))
    },
    globalData: {
    }
})
