const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const AngularWebpackPlugin = require('@ngtools/webpack').AngularWebpackPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    devtool: false,
    context: path.resolve(__dirname),
    entry: {
        index: ["./src/main.ts", "./src/index.css"]
    },
    stats: 'normal',
    output: {
        clean: true,
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                exclude: /\/node_modules\//,
                oneOf: [
                    {
                        resourceQuery: {
                            not: [/\?ngResource/]
                        },
                        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
                    },
                    {
                        type: "asset/source",
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.?(svg|html)$/,
                resourceQuery: /\?ngResource/,
                type: "asset/source"
            },
            {
                test: /\.[cm]?[tj]sx?$/,
                exclude: /\/node_modules\//,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            compact: true,
                            plugins: ["@angular/compiler-cli/linker/babel"],
                        },
                    },
                    {
                        loader: "@angular-devkit/build-angular/src/tools/babel/webpack-loader",
                        options: {
                            aot: true,
                            optimize: true,
                            // scriptTarget: 7
                        }
                    },
                    {
                        loader: '@ngtools/webpack',
                    },
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new AngularWebpackPlugin({
            tsconfig: path.resolve(__dirname, "tsconfig.json"),
            jitMode: false,
            directTemplateLoading: true
        }),
      new HtmlWebpackPlugin({
          filename: path.resolve(__dirname, "dist", "index.html"),
          template: path.resolve(__dirname, "src/index.html")
      }),
      // new CopyPlugin({
      //   patterns: [
      //       {
      //           from: "**/*.html",
      //           to: path.resolve(__dirname, "dist", "[name].html"),
      //           context: "src/app/"
      //       }
      //   ]
      // })
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
    devServer: {
      static: {
          directory: path.resolve(__dirname, "dist")
      },
      port: 4200,
      hot: true,
      open: false
  }
}
