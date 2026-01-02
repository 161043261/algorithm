// @ts-check

import { resolve, dirname } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("[webpack.config.js] __dirname:", __dirname);

const vueLoaderPlugin = new VueLoaderPlugin();

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  filename: "index.html",
  template: resolve(__dirname, "../src/index.html"),
});

const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
  analyzerMode: "static",
  analyzerPort: 4000,
  openAnalyzer: false,
});

const cleanWebpackPlugin = new CleanWebpackPlugin();

/**
 * @typedef {import('webpack').Configuration} Configuration
 * @type {(type: "react" | "vue") => Configuration}
 */
const getConfig = (type) => ({
  entry: type === "react" ? "./src/index.tsx" : "./src/main.ts",
  output: {
    path: resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  plugins: [
    vueLoaderPlugin,
    htmlWebpackPlugin,
    bundleAnalyzerPlugin,
    cleanWebpackPlugin,
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js(x)?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.css$/,
        // use 数组中, loader 执行顺序从右到左
        // 执行顺序 postcss-loader -> css-loader -> style-loader | vue-style-loader
        use: [
          type === "react" ? "style-loader" : "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          type === "react" ? "style-loader" : "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          "postcss-loader",
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.scss$/,
        // 执行顺序 sass-loader -> css-loader -> style-loader | vue-style-loader
        use: [
          type === "react" ? "style-loader" : "vue-style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(avif|gif|ico|jpe?g|png|svg|webp)$/,
        type: "asset", // Automatic `asset/resource` or `asset/inline`
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
      },
    ],
  },
  // devServer: {
  //   'static': {
  //     directory: './dist'
  //   }
  // },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});

export default getConfig("react");
// export default getConfig("vue");
