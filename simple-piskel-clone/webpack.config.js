const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/components/landing/app.js",
        main: "./src/app.js"
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            chunks: ["index"],
            template: "./src/components/landing/main.html"
        }),
        new HtmlWebpackPlugin({
            filename: "main.html",
            chunks: ["main"],
            template: "./src/index.html"
        })
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: ["babel-loader", "eslint-loader"] 
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name][hash].[ext]"
                        }
                    }
                ]
            }
        ]
    }
};