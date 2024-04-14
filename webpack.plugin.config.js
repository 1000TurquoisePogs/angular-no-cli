const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { experiments } = require('webpack');

module.exports = {
    mode: 'development',
    devtool: false,
    context: path.resolve(__dirname),
    entry: {
        app: path.resolve(__dirname, 'plugin/src/main.ts'),
    },
    stats: 'normal',
    output: {
        clean: true,
        path: path.resolve(__dirname, 'dist'),
        filename: 'plugin/[name].js',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
      new CopyPlugin({
        patterns: [
            {
                from: "**/*.html",
                to: path.resolve(__dirname, "dist", "plugin", "[name].html"),
                context: "plugin/src/app/"
            }
        ]
      })
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
          chunks: "all",
          maxAsyncRequests: Infinity,
          minSize: 0,
          name: "vendor"
      }
    },
    externals: {
        '@angular/core': 'externals.ng.core',
        '@angular/common': 'externals.ng.common',
    },
    externalsType: 'window',
    experiments: {
        outputModule: true
    }
}
