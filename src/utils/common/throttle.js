export default function throttle(fn, gapTime) {
    let _lastTime = null;

    return function () {
        const context = this
        const args = arguments
        let _nowTime = + new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(context, args)
            _lastTime = _nowTime
        }
    }
}