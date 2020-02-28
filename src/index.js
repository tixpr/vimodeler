import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
/*
import './index.scss';
*/
import './styles.scss';
import 'primereact/resources/themes/nova-light/theme.css';
//import 'primereact/resources/themes/luna-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import {Provider} from 'react-redux';
//import {loadMaps} from './redux/actions/mapsActions';
import { ConnectedRouter } from 'connected-react-router';
import store, {history} from './redux/store';

import MyApp from './MyApp';
import * as serviceWorker from './serviceWorker';

//store.dispatch(loadMaps());

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<MyApp />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
