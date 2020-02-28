import axios from 'axios';
export const updateDiagramType = 'updateDiagram';

const updateMap = (id,map)=>{
	return dispatch =>{
		axios.put("http://localhost:3001/diagrams/"+id)
		.then(response=>{
			dispatch({
				type: updateDiagramType,
				diagram: response.data
			});
		});
	};
};

export default updateMap;