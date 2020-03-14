import {loadMapType} from '../actions/mapActions/loadMap';
import {newMapType} from '../actions/mapActions/newMap';
import {updateMapType} from '../actions/mapActions/updateMap';

const map = (state=[], {type,map}) => {
	switch(type){
		case loadMapType:
		case newMapType:
			console.info(map);
			console.info(state);
			return state; 
		case updateMapType:
		default: return state;
	}
};
export default map;