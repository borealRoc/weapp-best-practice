const { resolve } = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    context: resolve('src'),
    entry: "./app.js",
    output: {
        path: resolve(__dirname, './dist'),
        filename: "[name][chunkhash:6].js"
    },
    mode: 'none',
    plugins: [
        new CleanWebpackPlugin({}),
        // 1. 将 src 中的文件原封不动地复制到 dist 中
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "**/*",
                    to: "./",
                    // 1.1 从 src 复制文件到 dist 时，排除 js 和 scss 文件
                    globOptions: {
                        ignore: ['**/*.js', '**/*.scss'],
                    }
                },
            ]
        }),
    ]
}