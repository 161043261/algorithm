// @ts-check

import webpackConfig from "./webpack.config.js";

// import { name as packageName } from "../../package.json" with { type: "json" };
import packageJson from "../package.json" with { type: "json" };
const { name: packageName } = packageJson;

/** @type {import('webpack').Configuration & import('webpack-dev-server').Configuration} */
const devConfig = {
  ...webpackConfig,
  mode: "development",
  devtool: "source-map",
  output: {
    publicPath: "/webpack/",
    filename: "[name].js",
    library: `${packageName}-[name]`,
    libraryTarget: "umd",
  },
  devServer: {
    client: {
      progress: true,
    },
    port: 8080,
    allowedHosts: "all",
    historyApiFallback: {
      rewrites: [{ from: /^\/webpack/, to: "/webpack/" }],
    },
    // proxy: [{
    //   path: '/webpack/*',
    //   target: 'http://127.0.0.1:8080',
    //   changeOrigin: true,
    // }]
  },
};

export default devConfig;
