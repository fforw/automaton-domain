const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const shellJs = require("shelljs");

const STATS = (!!process.env.STATS);

const JS_OUTPUT_DIRECTORY = path.join(__dirname, "docs/");

if (!fs.existsSync(JS_OUTPUT_DIRECTORY))
{
    shellJs.mkdir("-p", JS_OUTPUT_DIRECTORY);
}

module.exports = (env,argv) => {
    const PRODUCTION = (argv.mode === "production");
    return (
        {

            mode: process.env.NODE_ENV,
            entry: {
                "main": "./src/index.js",
                "test": "./src/test.js"
            },

            devtool: "source-map",

            output: {
                path: JS_OUTPUT_DIRECTORY,
                filename: "bundle-[name]-[chunkhash].js",
                chunkFilename: "bundle-[name]-[chunkhash].js",

                library: "App",
                libraryTarget: "var"
            },

            // aliases to be able to use "yarn link automaton-js"
            resolve: {
                alias: {
                    "react": path.resolve("./node_modules/react"),
                    "react-dom": path.resolve("./node_modules/react-dom"),
                    "create-react-class": path.resolve("./node_modules/create-react-class"),
                    "mobx": path.resolve("./node_modules/mobx"),
                    "domainql-form": path.resolve("./node_modules/domainql-form"),
                    "reactstrap": path.resolve("./node_modules/reactstrap"),
                    "mobx-react": path.resolve("./node_modules/mobx-react"),
                    "mobx-react-lite": path.resolve("./node_modules/mobx-react-lite"),
                    "mobx-react-devtools": path.resolve("./node_modules/mobx-react-devtools"),
                    "mobx-utils": path.resolve("./node_modules/mobx-utils"),
                    "history": path.resolve("./node_modules/history"),
                    "bignumber.js": path.resolve("./node_modules/bignumber.js"),
                    "react-calendar": path.resolve("./node_modules/react-calendar"),
                    "luxon": path.resolve("./node_modules/luxon")
                }
            },



            plugins: [
                new HtmlWebpackPlugin({
                    inject: "body",
                    chunks: ["vendors", "main"],
                    template: "src/template.html",
                    filename: "index.html"
                }),

                new HtmlWebpackPlugin({
                    inject: "body",
                    chunks: ["vendors", "test"],
                    template: "src/template.html",
                    filename: "test.html"
                }),

                new MiniCssExtractPlugin({
                    filename: "bundle-[name]-[chunkhash].css",
                    chunkFilename: "bundle-[id]-[chunkhash].css"
                }),

                new webpack.DefinePlugin({
                    "__PROD": PRODUCTION,
                    "__DEV": !PRODUCTION,
                    "__STATS": STATS
                }),

                new CopyPlugin({
                        patterns: [
                            {
                                from: "media/**/*"
                            },
                            {
                                from: "css/**/*"
                            },
                            {
                                from: "webfonts/**/*"
                            }
                        ]
                    }
                ),

                new CleanObsoleteChunks()
            ],

            module: {
                rules: [
                    // babel transpilation ( see .babelrc for babel config)
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "babel-loader"
                        }
                    },

                    // this is just concatenating the .css modules in components to one bundle.
                    // No postprocessing of that.
                    {
                        test: /\.css$/,
                        //                exclude: /node_modules/,
                        use: [MiniCssExtractPlugin.loader, "css-loader"]
                    },

                    {
                        test: /\.(png|jpg|gif)$/,
                        use: [
                            {
                                loader: "file-loader",
                                options: {}
                            }
                        ]
                    },

                    {
                        test: /\.(glsl|frag|vert)$/,
                        exclude: /node_modules/,
                        use: [
                            "raw-loader",
                            {
                                loader: "glslify-loader",
                                options: {
                                    transform: [
                                        "glslify-hex"
                                    ]
                                }
                            }
                        ]
                    }

                ]
            },

            optimization: {
                splitChunks: {
                    cacheGroups: {
                        commons: {
                            test: /[\\/]node_modules[\\/]/,
                            name: "vendors",
                            chunks: "all"
                        }
                    }
                }
            }
        }
    )
};
