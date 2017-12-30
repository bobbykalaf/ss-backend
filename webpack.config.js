const path = require('path');
module.exports = {
	entry: path.join(__dirname, 'src', 'index'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	module: {
		rules: [
			{
				test: /.jsx?$/,
				include: [ path.resolve(__dirname, 'src') ],
				exclude: [ path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'bower_components') ],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [ 'babel-preset-env', 'babel-preset-flow' ]
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: [ '.json', '.js', '.jsx', '.css' ]
	},
	devtool: 'source-map',
	devServer: {
		publicPath: path.join('/public/')
	},
	target: 'node'
};
