const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { remoteExternal } = require("manifest-service-client/webpack");

const shared = { react: { singleton: true }, "react-dom": { singleton: true } };

const clientConfig = {
  optimization: { minimize: false },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"], "@babel/preset-react"],
          },
        },
      },
    ],
  },
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist/client"),
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: "app1",
      remotes: {
        app2: remoteExternal("app2"),
        app3: remoteExternal("app3"),
      },
      shared,
    }),
    new HtmlWebpackPlugin({
      template: "index.ejs",
    }),
  ],
  stats: { errorDetails: true },
  devServer: {
    port: 3000,
    writeToDisk: true,
  },
};

module.exports = [clientConfig];
