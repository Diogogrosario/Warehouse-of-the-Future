const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    performance: {
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000
    },
    devServer: {
        publicPath: '/public/',
        compress: true,
        host: '0.0.0.0',
        port: 9000,
        hot: true,
    },
    watchOptions: {
        poll: true
    },
}