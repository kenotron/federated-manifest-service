const webpack = require("webpack");
const path = require("path");

const exposes = {
  "./Shared": "./src/Shared",
};

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
  output: {
    // path: path.join(__dirname, "../cdn/app2/v1.2.3"),
  },
  entry: {},
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      exposes,
      shared,
    }),
  ],
  devServer: {
    port: 8080,
    contentBase: "dist",
  },
};

module.exports = [clientConfig];
