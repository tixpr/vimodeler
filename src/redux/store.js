import {
	createStore,
	applyMiddleware,
	compose,
	combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import maps from './reducers/maps';
import diagrams from './reducers/diagrams';
import map from './reducers/map';
import diagram from './reducers/diagram';


const logger = store => next => action => {
	//console.log('disparando', action)
	let result = next(action)
	//console.log('siguiente estado', store.getState())
	return result;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	combineReducers({
		maps,
		diagrams,
		map,
		diagram
	}),
	composeEnhancers(
		applyMiddleware(
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
