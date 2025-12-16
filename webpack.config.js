const path = require('path');
module.exports = {

    resolve: {
        alias: {
            '@': path.resolve('resources/js'),
            'stream': require.resolve("stream-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "path": require.resolve("path-browserify")
        },
    },
    output: {
        chunkFilename: 'js/[name].js?id=[chunkhash]',
    }

};