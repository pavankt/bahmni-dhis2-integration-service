module.exports = {
    entry: './src/main/server/index.js',
    cache: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/bundle.js'
    },
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
            }
        ]
    }
};
