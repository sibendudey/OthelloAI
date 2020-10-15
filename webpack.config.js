var webpack = require("webpack");

module.exports = {
    entry: './src/main/js/app.js',
    output: {
        path: __dirname,
        filename: './target/classes/resources/static/built/bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts']
    },
    module: {
        rules:[
            {
                test:/\.(s*)css$/,
                use:['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: "babel-loader",
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};