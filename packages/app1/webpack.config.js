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
        app2: externalizeRemote("app2"),
        app3: externalizeRemote("app3"),
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

function externalizeRemote(remoteName) {
  return {
    external: `promise new Promise((resolve)=>{
    const element = document.createElement("script");
    element.src = __manifest__.${remoteName};
    element.type = "text/javascript";
    element.async = true;
    element.onload = () => {
      resolve(window.${remoteName});
    };
    document.head.appendChild(element);
  })`,
  };
}
