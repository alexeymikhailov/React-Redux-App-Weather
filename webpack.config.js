const webpack=require('webpack');
const path=require('path');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const cssOutputName=process.env.NODE_ENV === 'production' ? 'styles.[hash].css' : 'styles.css';
const vendorsOutputName=process.env.NODE_ENV === 'production' ? 'vendors.[hash].js' : 'vendors.js';
const nodeEnv=process.env.NODE_ENV || 'development';
const isProduction=nodeEnv === 'production';

const config={
    devtool: isProduction ? 'hidden-source-map' : 'cheap-module-source-map',

    entry: {
        bundle: [
            'babel-polyfill',
            './src/js/index.js'
        ],
        vendor: [
            'react',
            'react-dom'
        ]
    },

    output: {
        path: path.join(__dirname, '/static'),
        filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
        chunkFilename: isProduction ? '[name].[chunkhash].js' : '[name].js',
        publicPath: '/'
    },
  
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ],

        loaders: [ 
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            },

            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader'
                }),
                exclude: /node_modules/
            },

            {
                test: /\.(jpe?g|png)$/i,
                loaders: 'url?name=[name].[hash].[ext]&limit=8192',
                exclude: /node_modules/
            },

            { 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "url?limit=10000&mimetype=application/font-woff",
                exclude: /node_modules/
            },

            {   test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "url",
                exclude: /node_modules/ 
            }
        ]
    },

    resolve: {
        modules: [
            path.resolve(__dirname, 'src'), 
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.css', '.json']
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(nodeEnv)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', 
            filename: vendorsOutputName
        }),
        new ExtractTextPlugin({
            filename: cssOutputName,
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'React-Redux Application Weather',
            filename: 'index.html',
            favicon: './src/img/icons/icon.svg',
            template: './src/index.html',
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,            
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        })
    ],

    eslint: {
        configFile: './.eslintrc'
    }
};

if (isProduction) {
    config.plugins=config.plugins.concat([
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true
            },
            output: {
                comments: false  
            },
            sourceMap: false
        }),
        new CleanWebpackPlugin(['./static'], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]);
} else {
  config.entry.bundle=config.entry.bundle.concat([
    'webpack-hot-middleware/client'
  ]);
  config.plugins=config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]);
}

module.exports=config;