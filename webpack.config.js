const { resolve } = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const AutoEntryWebpackPlunin = require('./plugins/AutoEntryWebpackPlunin')
const ImportRuntimePlugin = require("./plugins/ImportRuntimePlugin")
const LodashWebpackPlugin = require('lodash-webpack-plugin')
const webpack = require('webpack')

const debuggable = process.env.BUILD_TYPE !== 'release'
console.log(`编译时环境：开发模式 ${process.env.NODE_ENV} 构建类型：${process.env.BUILD_TYPE}`)


module.exports = {
    context: resolve('src'),
    entry: { main: './app.js' },
    output: {
        path: resolve(__dirname, './dist'),
        filename: "[name].js",
        // 4.1 小程序中并没有 window 对象，只有 wx
        globalObject: 'wx',
        // 9.5 如果不加这个，小程序会报 app.js错误: TypeError: e.getElementsByTagName is not a function
        // publicPath: resolve('dist'),
        publicPath: resolve('/'),
        assetModuleFilename: '[path][name][ext]'
    },
    // 7.2 webpack mode 有三个可能的值，分别是 production, development, none
    // 小程序不能用 development，所以只有 production 和 none 这两个值
    mode: debuggable ? 'none' : 'production',
    // 8. 开启 source-map
    devtool: debuggable ? 'inline-source-map' : 'source-map',
    module: {
        rules: [
            // 2. 使用 webpack 处理 npm（JS），免去使用小程序开发工具构建npm的过程
            {
                test: /\.js$/,
                use: "babel-loader",
            },
            // 9. 支持 sass
            {
                test: /\.(scss)$/,
                include: /src/,
                use: [
                    // 9.2 把编译好的 css 文件移动到dist，并把后缀名改成.wxss
                    {
                        loader: 'file-loader',
                        options: {
                            useRelativePath: true,
                            name: '[path][name].wxss',
                            context: resolve('src'),
                        },
                    },
                    // 10. 借助 postcss 实现 px自动转rpx
                    {
                        loader: 'postcss-loader',
                    },
                    // 9.1 把 scss 文件编译成 css 文件
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: { includePaths: [resolve('src', 'styles'), resolve('src')] },
                        },
                    },
                ],
            },
            // {
            //     test: /\.(jpe?g|png|gif)$/i,
            //     include: /src/,
            //     use: {
            //         loader: "url-loader",
            //         options: {
            //             useRelativePath: true,
            //             context: resolve('src'),
            //             name: "[path][name].[ext]",
            //             limit: 1 * 1024,
            //         },
            //     },
            // },
            {
                test: /\.(jpe?g|png|gif)$/i,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        // 6kb以下的图片被转换成base64
                        maxSize: 5 * 1024, // 10kb
                    },
                }
            }
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
                    // 1.1 从 src 复制文件到 dist 时，排除 js 文件，因为它们要让 babel-loader 去处理
                    // 9.3 从 src 复制文件到 dist 时, 排除 scss 文件，因为它们要让 sass-loader 去处理
                    globOptions: {
                        ignore: ['**/*.js', '**/*.scss', '**/static/image/**'],
                    },
                },
            ]
        }),
        // 3. 自动配置多入口：将 app.json 的 pages 和 subpackages 字段，以及每一个页面 *.json 的 usingComponents 字段涉及到的每一个文件设置为一个入口
        new AutoEntryWebpackPlunin({
            scriptExtensions: ['.ts', '.js'],
            // 9.4 添加 .scss 文件作为 entry
            assetExtensions: ['.scss'],
        }),
        // 4.2 web 应用可以通过 <script> 标签引用 runtime.js，然而小程序却不能这样。
        // 我们必须让其它模块感知到 runtime.js 的存在，因为 runtime.js 里面是个立即调用函数表达式，所以只要导入 runtime.js 即可
        new ImportRuntimePlugin(),
        // 6. 优化 lodash tree-shaking 效果
        new LodashWebpackPlugin(),

        // 7. 设置环境变量
        // 7.1 将环境变量注入运行时环境
        // 运行环境：webpack入口引入的文件（如./src/index.js）
        // 编译环境：其他所有文件（如./webpack.config.js）
        // - cross-env设置的值只能在编译环境读取，运行环境无法读取：
        // - EnvironmentPlugin 基于 DefinePlugin，其设置的环境变量可以在编译环境和运行环境同时取到：
        new webpack.EnvironmentPlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'development',
            BUILD_TYPE: JSON.stringify(process.env.BUILD_TYPE) || 'debug',
        }),
    ],
    resolve: {
        alias: {
            '@': resolve('src'),
            'utils': resolve('src/utils'),
            'static': resolve('src/static'),
            'vant': resolve('src/components/vant'),
        },
        extensions: [".js", ".json", ".ts"]
    },
    optimization: {
        // 4. 不希望每个入口文件都生成 runtime 代码，而是希望将其抽离到一个单独的文件中, 以减少 app 的体积。我们通过配置 runtimeChunk 来达到这一目的
        runtimeChunk: {
            name: 'runtime',
        },
        // 5. 抽离公共代码，将其打包成单独的 common.js 文件
        splitChunks: {
            chunks: 'all',
            name: 'common',
            minChunks: 2,
            minSize: 0,
        },
        // 7.3 让webpack不会自动读取配置文件中的mode给process.env.NODE_ENV赋值, 这样process.env.NODE_ENV就只是被我们自定义的参数赋值
        nodeEnv: false
    },
}