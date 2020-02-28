import {createBrowserHistory} from 'history';
import {createStore, applyMiddleware, compose} from 'redux';
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

const logger = store => next => action => {
	console.log('disparando', action)
	let result = next(action)
	console.log('siguiente estado', store.getState())
	return result;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	createRootReducer(history)
	,
	composeEnhancers(
		applyMiddleware(
			routerMiddleware(history), // for dispatching history actions
			logger,
			thunk
		)
	)
);

export default store; 
/*
//sin el redux-tools
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import maps from './reducers/maps';
import diagrams from './reducers/diagrams';
import projects from './reducers/projects';

const logger = store => next => action => {
	console.log('dispatching', action)
	let result = next(action)
	console.log('next state', store.getState())
	return result;
}

export default createStore(
	combineReducers({
		maps,
		diagrams,
		projects
	}),
	applyMiddleware(
		logger,
		thunk
	)
	);


*/
