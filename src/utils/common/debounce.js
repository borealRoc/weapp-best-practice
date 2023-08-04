export default function debounce(fn, wait) {
    let timer = null
    return function () {
        const context = this
        const args = arguments
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, wait)
    }
}