const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const config = {
    entry: {
        app: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            'react-dom': '@hot-loader/react-dom',
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.join(__dirname, 'src'),
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    stats: {
        warningsFilter: /export .* was not found in/
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
    ].filter(Boolean),
};

module.exports = (env, argv) => {
    config.mode = argv.mode;

    if (config.mode === 'production') {
        config.devtool = false;

        config.optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
            ],
        };
    }

    if (config.mode === 'development') {
        config.devtool = 'eval-source-map';
        config.plugins.push(new HtmlWebpackPlugin({ template: 'index.html' }));
        config.devServer = {
            hot: true,
            compress: true,
            historyApiFallback: true,
            client: {
                overlay: true,
            },
            static: {
                publicPath: '/',
                directory: path.resolve(__dirname, './dist'),
            }
        };
    }

    return config;
};
