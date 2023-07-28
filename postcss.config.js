module.exports = {
    plugins: [
        require("postcss-pxtorpx")({
            // 设置1px=2rpx
            multiplier: 2,
            propList: ['*'],
        }),
    ],
};