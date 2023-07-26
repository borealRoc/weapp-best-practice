const { resolve } = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const AutoEntryWebpackPlunin = require('./plugins/AutoEntryWebpackPlunin')

module.exports = {
    context: resolve('src'),
    entry: { main: './app.js' },
    output: {
        path: resolve(__dirname, './dist'),
        filename: "[name].js"
    },
    mode: 'none',
    module: {
        rules: [
            // 2. 使用 webpack 处理 npm（JS），免去使用小程序开发工具构建npm的过程
            {
                test: /\.js$/,
                use: "babel-loader",
            },
        ]
    },
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
        // 3. 自动配置多入口：将 app.json 的 pages 和 subpackages 字段，以及每一个页面 *.json 的 usingComponents 字段涉及到的每一个文件设置为一个入口
        new AutoEntryWebpackPlunin({
            scriptExtensions: ['.ts', '.js'],
            assetExtensions: ['.scss'],
        }),
    ],
    resolve: {
        extensions: [".js", ".json", ".ts"]
    }
}