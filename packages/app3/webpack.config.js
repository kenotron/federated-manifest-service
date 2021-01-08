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
  entry: {},
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: "app3",
      exposes,
      filename: "remoteEntry.js",
      remotes: {
        app2: externalizeRemote("app2"),
      },
      shared,
    }),
  ],
  output: {
    path: path.join(__dirname, "../cdn/app3/v1.0.0"),
  },
  stats: {
    errorDetails: true,
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
