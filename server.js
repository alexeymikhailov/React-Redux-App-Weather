const express=require('express');
const webpack=require('webpack');
const fs=require('fs');
const path=require('path');
const webpackDevMiddleware=require('webpack-dev-middleware');
const webpackHotMiddleware=require('webpack-hot-middleware');
const webpackConfig=require('./webpack.config.js');

const app=express();
const isProd=process.env.NODE_ENV === 'production';
const port=3000;

if (isProd) {
	app.use(express.static(path.join(__dirname, '/src/index.html')));
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, '/src/index.html'));
	});	
} else {
	const compiler=webpack(webpackConfig);
	app.use(webpackDevMiddleware(compiler, { 
		noInfo: true, 
		publicPath: webpackConfig.output.publicPath
	}));
	app.use(webpackHotMiddleware(compiler));

	app.get('*', function(req, res) {
		res.write(fs.readFileSync(path.join(__dirname, '/src/index.html')));
		res.end();
	});
}

app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} 
	console.info(`Listening on port ${port}`);
});