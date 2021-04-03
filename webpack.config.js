const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const path = require("path")

module.exports = (env, argv) => {
  const entryPath = argv.mode === "development" ? "./src/js/index_dev.js" : "./src/js/index.js"
  return {
    entry: {
      main: path.resolve(__dirname, entryPath),
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "build")
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        }
      ]
    },
    devServer: {
      contentBase: "./build",
      open: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Pollution Check",
        template: path.resolve(__dirname, "./src/index.html"),
        favicon: "src/img/icon/pollution.png",
      }),
      new Dotenv()
    ]
  }
}
