const path = require('path');
const webpack = require('webpack');

var loaders = [{
	"test": /\.js?$/,
	"exclude": [
		path.resolve(__dirname, "node_modules"),
		path.resolve(__dirname, "src/libCustom")
	],
	"loader": "babel-loader",
	"query": {
		"presets": [
			"es2015"
		],
		"plugins": []
	}
}, {
	test: /\.(css)$/,
	use: [{
		loader: 'style-loader', // inject CSS to page
	}, {
		loader: 'css-loader', // translates CSS into CommonJS modules
	}]
}, {
	test: /\.html$/,
	use: [{
		loader: 'html-loader',
		options: {
			minimize: true
		}
	}],
}, {
	test: /\.(jpg|png|svg)$/,
	loader: 'file-loader',
	options: {
		outputPath: 'images/'
	}
}];

module.exports = {
	entry: './src/saiv.js',
	output: {
		filename: './bundle.js',
		path: path.resolve(__dirname, 'www')
	},
	module: {
		loaders: loaders
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: ['popper.js', 'default']
		})
	]
};
