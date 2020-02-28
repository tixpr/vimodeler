import axios from 'axios';

export const loadMapType= 'loadMap';

const loadMap = (id)=>{
	return dispatch =>{
		axios.get("http://localhost:3001/maps/"+id)
		.then(response=>{
			dispatch({
				type: loadMapType,
				map: response.data
			});
		});
	};
};

export default loadMap;