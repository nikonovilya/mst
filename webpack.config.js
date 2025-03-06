const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { EsbuildPlugin } = require('esbuild-loader');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    stats: 'errors-only',
    output: {
      path: path.resolve(__dirname, 'build'),
    },
    resolve: {
      alias: {
        Blocks: path.join(__dirname, 'src/pug/blocks/'),
        Pages: path.join(__dirname, 'src/pug/pages/'),
        Fonts: path.join(__dirname, 'src/assets/fonts/'),
        Images: path.join(__dirname, 'src/assets/img/'),
        Locales: path.join(__dirname, 'src/assets/locales/'),
        Pug: path.join(__dirname, 'src/pug/'),
        Styles: path.join(__dirname, 'src/scss/'),
        Scripts: path.join(__dirname, 'src/scripts/'),
      },
    },
    plugins: [
      new HtmlBundlerPlugin({
        entry: {
          index: {
            import: 'src/pug/pages/index.pug?lang=default',
            data: 'src/assets/locales/en.json'
          },
          demo: {
            import: 'src/pug/pages/demo.pug?lang=default',
            data: 'src/assets/locales/en.json'
          },
          '404': {
            import: 'src/pug/pages/404.pug?lang=default',
            data: 'src/assets/locales/en.json'
          },
          'assets/css/404': 'src/scss/404.scss',
        },
        css: {
          inline: false,
          filename: (pathData) => {
            if (pathData.chunk.name === 'assets/css/404') {
              return 'assets/css/404.css';
            }
            return 'assets/css/[name].[contenthash:8].css';
          },
        },
        js: {
          filename: 'assets/scripts/[name].[contenthash:8].scripts',
        },
        hotUpdate: true,
        preprocessor: 'pug',
        preprocessorOptions: {
          pretty: !isProd,
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/root'),
            to: path.resolve(__dirname, 'build/'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: HtmlBundlerPlugin.loader,
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            'css-loader',
            isProd
              ? {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: [require('autoprefixer')],
                    },
                  },
                }
              : null,
            'sass-loader',
          ],
        },
        {
          test: /\.js$/,
          loader: 'esbuild-loader',
          options: {
            target: 'es2015',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name][ext][query]',
          },
        },
        {
          test: /\.(png|svg|jpe?g|webp|ico)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/img/[name].[hash:8][ext]',
          },
        },
        isProd
          ? {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loader: ImageMinimizerPlugin.loader,
              enforce: 'pre',
              options: {
                generator: [
                  {
                    preset: 'avif',
                    implementation: ImageMinimizerPlugin.imageminGenerate,
                    options: {
                      plugins: ['imagemin-avif'],
                    },
                  },
                ],
              },
            }
          : {},
      ],
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new EsbuildPlugin({
          target: 'es2015',
          css: true,
        }),
        isProd
          ? new ImageMinimizerPlugin({
              minimizer: {
                implementation: ImageMinimizerPlugin.sharpMinify,
              },
              generator: [
                {
                  preset: 'avif',
                  implementation: ImageMinimizerPlugin.sharpGenerate,
                  options: {
                    encodeOptions: {
                      avif: {
                        cqLevel: 33,
                      },
                    },
                  },
                },
              ],
            })
          : '...',
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'build'),
      },
      hot: true,
      compress: true,
      open: true,
      watchFiles: {
        paths: ['src/**/*.*'],
        options: {
          usePolling: true,
        },
      },
      port: 4200,
      client: {
        overlay: false,
      },
    },
  };
};
