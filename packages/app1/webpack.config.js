const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const shared = { react: { singleton: true }, "react-dom": { singleton: true } };

const clientConfig = {
  optimization: { minimize: false },
  module: {
    rules: [
      {
        test: /\.jsx?/,
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
        app2: "app2@http://localhost:3001/r/app2/remoteEntry.js",
        app3: "app3@http://localhost:3001/r/app3/remoteEntry.js",
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
