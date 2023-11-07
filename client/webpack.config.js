const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
    return {
        mode: "development",
        entry: {
            main: "./src/js/index.js",
            install: "./src/js/install.js",
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./index.html",
                title: "JATE",
                chunks: ["main"],
            }),
            new InjectManifest({
                swSrc: "./src-sw.js",
                swDest: "src-sw.js",
            }),
            new WebpackPwaManifest({
                fingerprints: false,
                name: "Just Another Text Editor",
                short_name: "JATE",
                description:
                    "A simple text editor for the web that works offline.",
                background_color: "#ffffff",
                theme_color: "#ffffff",
                start_url: "/",
                publicPath: "/",
                icons: [
                    {
                        src: path.resolve("src/images/logo.png"),
                        sizes: [96, 128, 192, 256, 384, 512],
                        destination: path.join("assets", "icons"),
                    },
                ],
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: [
                                "@babel/plugin-proposal-object-rest-spread",
                                "@babel/transform-runtime",
                            ],
                        },
                    },
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: ["file-loader"],
                },
            ],
        },
    };
};
