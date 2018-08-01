const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    entry: [
        './src/main/client/index.js',
        './src/main/client/styles/styles.scss'
    ],
    cache: true,
    output: {
        path: path.resolve(__dirname, './src/main/resources/static/'),
        filename: 'bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('styles.css', {allChunks: true})
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[hash].[ext]',
                            emitFile: false
                        }
                    }
                ]
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract([
                    {loader: 'css-loader'},
                    {loader: 'resolve-url-loader'},
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [
                                './node_modules',
                                './src/main/client'
                            ]
                        }
                    }
                ])
            }

        ]
    }
};
