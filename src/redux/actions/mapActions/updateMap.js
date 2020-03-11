import axios from 'axios';
export const updateMapType = 'updateMap';

const updateMap = (map)=>{
	return dispatch =>{
		axios.put("http://localhost:3001/maps/"+map.id,map)
		.then(response=>{
			dispatch({
				type: updateMapType,
				map: response.data
			});
		});
	};
};

export default updateMap;