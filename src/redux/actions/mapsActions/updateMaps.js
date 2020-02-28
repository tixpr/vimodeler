import axios from 'axios';

export const updateMapsType = 'updateMaps'; 

const updateMaps = ()=>{
	return dispatch =>{
		axios.put("http://localhost:3001/maps")
		.then(response=>{
			dispatch({
				type: updateMapsType,
				maps: response.data
			});
		});
	};
};

export default updateMaps;