'use strict';

const NODE_ENV = process.env.NODE_ENV;
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SpritesmithPlugin = require('webpack-spritesmith');


module.exports = {

	entry: {
		main: NODE_ENV == 'development' ?
			['webpack-dev-server/client?http://localhost:8080/',
			 'webpack/hot/dev-server',
			 './frontend/main'] :
			'./frontend/main'
	},

	output: {
		path: NODE_ENV == 'development' ? __dirname + '/js' : './js',
		publicPath: NODE_ENV == 'development' ? '/js/' : './js/',
		filename: "[name].js?"
	},

	watch: NODE_ENV == 'development',

	devtool: NODE_ENV == 'development' ? "eval" : "source-map",

	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new webpack.ProvidePlugin({
			$: 'jquery/dist/jquery.min'
		}),
		new SpritesmithPlugin({
			src: {
				cwd: path.resolve(__dirname, 'images/src'),
				glob: '*.png'
			},
			target: {
				image: path.resolve(__dirname, 'images/sprite.png'),
				css: path.resolve(__dirname, 'sass/tools/_sprite.scss')
			},
			apiOptions: {
				cssImageRef: '/images//sprite.png'
			}
		}),
		new ExtractTextPlugin("../[name].css", {
			allChunks: true
		})
	],

	module: {

		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react'],
					plugins: ['transform-runtime']
				}
			},
			{
				test: /\.png$/,
				loader:'file-loader?name=[name].[ext]&publicPath=images/&outputPath=./images/'
			},{
				test: /\.scss$/,
				loader: NODE_ENV == 'development' ?
				'style-loader!css-loader!sass-loader' :
				ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!resolve-url-loader?sourceMap!sass-loader?sourceMap')
			},
			{
				test: /\.(gif|jpg|png|jpeg\ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: "file-loader?name=[name].[ext]&publicPath=images/&outputPath=./images/"
			}
		]
	},

	resolve: {
		modulesDirectories: ["web_modules", "node_modules", "spritesmith-generated"]
	},

	devServer: NODE_ENV == 'development' ? {
		hot: true
	} : {}

};
if ( NODE_ENV == 'development' ){
	module.exports.plugins.push(
		new webpack.HotModuleReplacementPlugin()
	);
}
if ( NODE_ENV == 'production' ) {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	);
}
