import axios from 'axios';
export const newMapType = 'newMap';

const newMap = (map)=>{
	return dispatch =>{
		axios.post("http://localhost:3001/maps/",{map})
		.then(response=>{
			dispatch({
				type: newMapType,
				map: response.data
			});
		});
	};
};

export default newMap;