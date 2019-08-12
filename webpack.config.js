const path = require("path");

const autoprefixer = require("autoprefixer");
const miniCSSExtractPlugin = require("mini-css-extract-plugin");
const optimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const uglifyJSPlugin = require("uglifyjs-webpack-plugin");

const assetsDir = path.resolve(__dirname, "static/assets");

module.exports = {
    context: path.resolve(__dirname, "src"),
    devServer: {
        historyApiFallback: true,
        port: 9000,
    },
    devtool: "source-map",
    entry: {
        app: "./app",
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "all",
                    name: "vendor",
                    test: /node_modules/,
                },
            },
        },
    },
    output: {
        filename: "[name].js",
        path: assetsDir,
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: path.resolve(__dirname, "node_modules"),
            },
            {
                test: /\.s?css$/,
                use: [
                    miniCSSExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer(),
                            ],
                            sourceMap: true,
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(eot|jpg|png|ttf|woff2?)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                    },
                },
            },
        ],
    },
    plugins: [
        new miniCSSExtractPlugin({
            filename: "style.css",
        }),
        new optimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                map: {
                    inline: false,
                },
            },
            cssProcessorPluginOptions: {
                preset: [
                    "default",
                    {
                        discardComments: {
                            removeAll: true,
                        },
                    },
                ],
            },
        }),
        new uglifyJSPlugin({
            sourceMap: true,
        }),
    ],
    stats: "errors-only",
};
