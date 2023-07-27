const { resolve } = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const AutoEntryWebpackPlunin = require('./plugins/AutoEntryWebpackPlunin')
const ImportRuntimePlugin = require("./plugins/ImportRuntimePlugin")

module.exports = {
    context: resolve('src'),
    entry: { main: './app.js' },
    output: {
        path: resolve(__dirname, './dist'),
        filename: "[name].js",
        // 4.1 小程序中并没有 window 对象，只有 wx
        globalObject: 'wx',
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
        // 4.2 web 应用可以通过 <script> 标签引用 runtime.js，然而小程序却不能这样。
        // 我们必须让其它模块感知到 runtime.js 的存在，因为 runtime.js 里面是个立即调用函数表达式，所以只要导入 runtime.js 即可
        new ImportRuntimePlugin()
    ],
    resolve: {
        extensions: [".js", ".json", ".ts"]
    },
    optimization: {
        // 4. 不希望每个入口文件都生成 runtime 代码，而是希望将其抽离到一个单独的文件中, 以减少 app 的体积。我们通过配置 runtimeChunk 来达到这一目的
        runtimeChunk: {
            name: 'runtime',
        },
    },
}