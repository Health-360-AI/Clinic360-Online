const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const middleware = require("webpack-dev-middleware");
const { spawn } = require("child_process");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, "src");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
        include: defaultInclude,
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: "file-loader?name=img/[name]__[hash:base64:5].[ext]",
          },
        ],
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/i,
        type: "asset/resource",
        generator: {
          //filename: 'fonts/[name]-[hash][ext][query]'
          filename: "fonts/[name][ext][query]",
        },
      },
      // {
      //   test: /logo\.ico$/,
      //   loader: "url",
      //   query: {
      //     limit: 1,
      //     name: "[name].[ext]",
      //   },
      // },
    ],
  },
  externals: {
    archiver: "require('archiver')",
  },
  target: "electron-renderer",
  plugins: [
    new HtmlWebpackPlugin({ title: "Clinic-360" }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://64.225.88.42:8000/api/v1"),
      "process.env.API_URL_V": JSON.stringify("http://64.225.88.42:8000"),
      "process.env.HEALTH360_GATEWAY_V": JSON.stringify(
        "https://whale-app-lw8na.ondigitalocean.app/api/v1"
      ),
      "process.env.HEALTH360_GATEWAY": JSON.stringify(
        "https://whale-app-lw8na.ondigitalocean.app"
      ),
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.Domain": JSON.stringify("iclinic.eu.auth0.com"),
      "process.env.ClientId": JSON.stringify(
        "Fc79jCI3sivRekiqzTM3MflpWI1eYcnN"
      ),
      "process.env.API_Audience": JSON.stringify("iClinic"),
      "process.env.REACT_APP_VERSION": JSON.stringify(
        process.env.npm_package_version
      ),
    }),
  ],
  devtool: "cheap-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    devMiddleware: {
      stats: {
        colors: true,
        chunks: false,
        children: false,
      },
    },
    onBeforeSetupMiddleware() {
      spawn("electron", ["."], {
        shell: true,
        env: process.env,
        stdio: "inherit",
      })
        .on("close", (code) => process.exit(0))
        .on("error", (spawnError) => console.error(spawnError));
    },
  },
};
