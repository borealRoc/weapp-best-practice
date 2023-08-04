const key = process.env.NODE_ENV
function initEnv() {
    return {
        ...require('./' + key)
    }
}
const config = initEnv()
export default config