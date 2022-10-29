const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackBundleAnalyzer = require("webpack-bundle-analyzer");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, "src");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.jsx?$/,
        use: [{ loader: "babel-loader" }],
        include: defaultInclude,
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: "file-loader?name=img/[name]__[hash:base64:5].[ext]" }],
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/i,
        type: "asset/resource",
        generator: {
          //filename: 'fonts/[name]-[hash][ext][query]'
          filename: "fonts/[name][ext][query]",
        },
      },
    ],
  },
  externals: {
    archiver: "require('archiver')",
  },
  target: "electron-renderer",
  plugins: [
    // Display bundle stats
    // new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: "static" }),

    new HtmlWebpackPlugin({
      title: "Clinic360-Online",
      minify: {
        // see https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyCSS: true,
      },
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "bundle.css",
      chunkFilename: "[id].css",
    }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://64.225.88.42:8000/api/v1"),
      "process.env.API_URL_V": JSON.stringify("http://64.225.88.42:8000"),
      "process.env.HEALTH360_GATEWAY_V": JSON.stringify(
        "https://whale-app-lw8na.ondigitalocean.app/api/v1"
      ),
      "process.env.HEALTH360_GATEWAY": JSON.stringify(
        "https://whale-app-lw8na.ondigitalocean.app"
      ),
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.Domain": JSON.stringify("iclinic.eu.auth0.com"),
      "process.env.ClientId": JSON.stringify(
        "Fc79jCI3sivRekiqzTM3MflpWI1eYcnN"
      ),
      "process.env.API_Audience": JSON.stringify("iClinic"),
      "process.env.REACT_APP_VERSION": JSON.stringify(
        process.env.npm_package_version
      ),
    }),
    // new MinifyPlugin()
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false,
  },
  optimization: {
    minimize: true,
  },
};
