import { combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';
import maps from './reducers/maps';
import diagrams from './reducers/diagrams';
import map from './reducers/map';
import diagram from './reducers/diagram';

const createRootReducer = (history) => combineReducers({
	router: connectRouter(history),
	maps,
	diagrams,
	map,
	diagram
})
export default createRootReducer;