//basic vars
const path = require('path')
const webpack = require('webpack')

//additional plugins
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin');

//module settings
module.exports = {
    //бызовый путь к проекту
    context: path.resolve(__dirname, 'src'),

    mode: 'development',

    //точки входа js
    entry: {
        app: [
            './js/app.js'
        ]
    },

    //путь для собранных файлов
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js',
        publicPath: "/"
    },

    //devServer configuration
    devServer: {
        contentBase: './app',
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 8080
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html")
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    }
}
