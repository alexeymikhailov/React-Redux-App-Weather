import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './containers/App';
import '../css/bootstrap.css';
import '../css/weather-app.css';

const store=configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);