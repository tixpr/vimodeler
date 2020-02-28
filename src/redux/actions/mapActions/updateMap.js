import axios from 'axios';
export const updateMapType = 'updateMap';

const updateMap = (id,map)=>{
	return dispatch =>{
		axios.put("http://localhost:3001/maps/"+id)
		.then(response=>{
			dispatch({
				type: updateMapType,
				map: response.data
			});
		});
	};
};

export default updateMap;