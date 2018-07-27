const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/main/client/index.js',
    cache: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/bundle.js'
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
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => ([
                                autoprefixer({
                                    browsers: [
                                        'last 2 versions',
                                        'Safari >= 7',
                                        'ie >= 10',
                                        'iOS >= 8'
                                    ]
                                })
                            ])
                        }
                    },
                    {loader: 'resolve-url-loader'},
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [
                                './node_modules',
                                './src/client'
                            ]
                        }
                    }
                ])
            }

        ]
    }
};
