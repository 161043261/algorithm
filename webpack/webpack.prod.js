// @ts-check

import webpackConfig from "./webpack.config.js";

import CssMinimizerWebpackPlugin from "css-minimizer-webpack-plugin";
import CompressionWebpackPlugin from "compression-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const {
  default: { name: packageName },
} = await import("../package.json", {
  with: { type: "json" },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cssMinimizerWebpackPlugin = new CssMinimizerWebpackPlugin();
const compressionWebpackPlugin = new CompressionWebpackPlugin();
const cleanWebpackPlugin = new CleanWebpackPlugin();

/** @type {import('webpack').Configuration} */
const prodConfig = {
  ...webpackConfig,
  mode: "production",
  devtool: "source-map",
  output: {
    path: resolve(__dirname, "./dist"),
    publicPath: "/webpack/",
    filename: "[name].[hash].js",
    library: `${packageName}-[name]`,
    libraryTarget: "umd",
  },
  optimization: {
    minimize: true,
    minimizer: [cssMinimizerWebpackPlugin, compressionWebpackPlugin],
  },
  plugins: [
    ...(Array.isArray(webpackConfig.plugins) ? webpackConfig.plugins : []),
    cleanWebpackPlugin,
  ],
};

export default prodConfig;
