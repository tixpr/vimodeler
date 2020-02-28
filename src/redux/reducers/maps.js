import {loadMapsType} from '../actions/mapsActions/loadMaps';
import {updateMapsType} from '../actions/mapsActions/updateMaps';

const maps = (state=[], {type,maps}) => {
	switch(type){
		case loadMapsType:
		case updateMapsType: return maps;
		default: return state;
	}
};
export default maps;