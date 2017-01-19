import config from 'config';
import { DefinePlugin, LoaderOptionsPlugin, SourceMapDevToolPlugin, HotModuleReplacementPlugin, NamedModulesPlugin, NoErrorsPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';

export default {
    devServer : {
        historyApiFallback: true,
        hot: true,
    },
    devtool: 'cheap-eval-source-map',
    entry : {
        index: [].concat(process.env.NODE_ENV === 'development' ? [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
        ] : []).concat([
            resolve(__dirname, './js/index.js'),
        ]),
    },
    module : {
        rules: [
            {
                test: /\.js$/,
                include: [
                    resolve(__dirname, './js'),
                    resolve(__dirname, '../common')
                ],
                loader: 'babel-loader',
                // Options to configure babel with
                options: {
                    babelrc: false,
                    cacheDirectory: true,
                    presets: [
                        ["env", {
                            targets: {
                                browsers: ['last 2 versions']
                            },
                            modules: false,
                            useBuiltIns: true,
                        }],
                        'react' // Transpile React components to JavaScript
                    ],
                }
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.jpe?g$|\.gif$|\.png$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[hash].[ext]'
                }
            }, {
                test: /\.(otf|svg)(\?.+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }, {
                test: /\.eot(\?\S*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/vnd.ms-fontobject'
                }
            }, {
                test: /\.woff2(\?\S*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff2'
                }
            }, {
                test: /\.woff(\?\S*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            }, {
                test: /\.ttf(\?\S*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-ttf'
                }
            }
        ]
    },
    output : {
        filename: '[name].js',
        path: resolve(__dirname, '../build')
    },
    plugins : [
        // prints more readable module names in the browser console on HMR updates
        new NamedModulesPlugin(),

        new DefinePlugin({
            API_URL: JSON.stringify(config.api_url),
            'process.env': {
                NODE_ENV: process.env.NODE_ENV === 'development'
                    ? JSON.stringify(process.env.NODE_ENV)
                    : JSON.stringify('production'), // eslint-disable-line max-len
            }
        }),
        new LoaderOptionsPlugin({
            options: {
                context: __dirname,
                minimize: process.env.NODE_ENV !== 'development'
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve(__dirname, './index.html'),
        }),
    ].concat(process.env.NODE_ENV === 'development'
        ? [
            new HotModuleReplacementPlugin(),
            new SourceMapDevToolPlugin({filename: '[file].map'}),
        ]
        : []),
    resolve: {
        extensions: ['.js', '.jsx'],
    }
}
