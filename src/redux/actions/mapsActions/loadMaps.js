import axios from 'axios';

export const loadMapsType = 'loadMaps'; 

const loadMaps = ()=>{
	return dispatch =>{
		axios.get("http://localhost:3001/maps")
		.then(response=>{
			dispatch({
				type: loadMapsType,
				maps: response.data
			});
		});
	};
};

export default loadMaps;