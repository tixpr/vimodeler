import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import './normalize.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Provider} from 'react-redux';
import store from './redux/store';

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Provider store={store}>
			<App />
		</Provider>
	</ThemeProvider>,
	document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
